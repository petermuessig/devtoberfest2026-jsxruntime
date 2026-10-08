# UI5 Views, Reimagined — Live Walkthrough
## Devtoberfest 2026 · TSX Runtime Session

---

> **Before you go on stage — must be running**
>
> 1. From the repo root: `npm install` (once), then `npm start`
>    → single `cds watch` starts; `cds-plugin-ui5` auto-mounts the UI5 app
> 2. Verify finished reference app: **http://localhost:4004/bookshop-tsx/index.html** (table + search + order working)
> 3. VS Code open on the repo root — workspace snippets activate automatically.
>    Confirm: `Cmd+Shift+P` → *Insert Snippet* → you should see all `ui5-*` entries.
>    Keep **`SNIPPETS.md`** open as a second reference tab.
> 4. Slides open in a second window/display at **S1**; press `s` for speaker notes, `f` for fullscreen.
> 5. `apps/bookshop-tsx/webapp/view/App.tsx` open in a VS Code background tab (used in Parts 1 & 10).
> 6. **Three-phase overview:**
>    - 🎞 **Phase A — Slides** (S1–S10, ~8–10 min) — stay on slides until S10
>    - 💻 **Phase B — Live coding** (Parts 1–10, ~50 min) — VS Code + browser
>    - 🎞 **Phase C — Slides** (S13–S18, ~5 min) — close with Q&A

---

## 🎞 Phase A — Opening Slides (S1–S10)

> Stay on slides until **S10**. Do not open VS Code yet.

### S1–S2 — Title + intro
*"UI5 views, reimagined — and this is live, not a mockup. By the end of today you'll have built a real bookshop app using TypeScript and JSX, with zero XML views."*

### S3 — Two worlds, neither complete
*"XML views are readable but untyped. TypeScript controllers are typed but we stop at the view boundary. That's the gap we're closing today."*

### S4 — What is JSX / TSX?
*"JSX is just syntax sugar — it compiles to constructor calls. `<Page title="…" />` becomes `new Page({ title: "…" })`. No React, no virtual DOM, no reconciler. Reactivity stays 100% UI5 bindings."*

### S5 — We've done this before
*"TypeScript already won in controllers — nobody writes plain JS controllers anymore. TSX extends that same win to views. Same language, same toolchain, one coherent codebase."*

### S6 — How it works in UI5
*"A tiny Babel transform converts JSX syntax to runtime calls, and a runtime shim maps them to `new Control(settings)`. That's the whole thing. No magic, no framework, no extra runtime overhead."*

### S7 — What you get
*"Per-control TypeScript prop checking against `$XSettings` from `@openui5/types`. IDE autocomplete, go-to-definition, and safe refactoring — on view code, not just controller code."*

### S8 — What you can do
*"Controls, named aggregations, all binding syntaxes, event handlers — everything XML does, TSX does. You'll see all of this live in a moment."*

> ⚠️ Keep S8 to ~15 seconds — don't walk the code. Bindings and aggregations are built live in Parts 6–7.

### S9 — Structural directives: `<For>` & `<If>`
*"Two new directives from the runtime. `<For>` is a data-bound list — the child is a factory function that UI5 clones per bound entry, exactly like an XML aggregation template. `<If>` is conditional: a literal `condition` includes or drops the child at construction time; a bound `condition` adds a `visible` binding."*

> `<If>` has a snippet (`ui5-if`) but no dedicated live Part. This slide IS the `<If>` explanation — mention it here and move on.

### S10 — Time to build ← TRANSITION
*"Enough slides. Let's build the CodeJam bookshop with zero XML views."*

> **▶ Switch displays to VS Code + browser now.**

---

## 💻 Phase B — Live Coding

> Build `my-tsx-app` (namespace `sap.demo`) live, with `apps/bookshop-tsx` open as the finished reference.

---

### Part 1 — Show the finished bookshop app (3 min, SHOW)

Open **http://localhost:4004/bookshop-tsx/index.html**.

Walk through the UI:
- Search *"Poe"* → table filters live. Clear → all books back.
- Click a book row → detail pane opens with title, description, Order + quantity.
- Change quantity, click **Order** → toast appears, stock value updates.

Open `apps/bookshop-tsx/webapp/view/App.tsx` in VS Code.

**Key message:** *"This is a fully functional UI5 app — identical UX to anything you'd build with XML views. The only thing different is how the view is written. No XML. No strings. TypeScript, JSX, and full IDE support."*

---

### Part 2 — Scaffold a fresh app (5 min, LIVE)

> The bookshop-tsx stays open as the finished reference. Build the fresh app alongside it.

```sh
# from apps/
yo easy-ui5 ts-app
```

| Prompt | Value |
|---|---|
| Namespace | `sap.demo` |
| App name | `my-tsx-app` |
| Framework | `OpenUI5` |
| Version | `1.153.0` |
| Theme | `sap_horizon` |
| OPA5 tests | No |

```sh
cd apps/my-tsx-app
```

Point out the generated `webapp/view/App.view.xml` — *"this is what we'll replace."*

**Wire into the CAP server** — add the fresh app as a local devDependency in `cap/bookshop/package.json`:

```json
"devDependencies": {
  "@sap/cds-dk": "^10",
  "bookshop-tsx": "file:../../apps/bookshop-tsx",
  "my-tsx-app": "file:../../apps/my-tsx-app",
  "cds-plugin-ui5": "^0"
}
```

```sh
# from cap/bookshop/
npm install
```

**Explain:** *"`cds-plugin-ui5` auto-discovers any devDependency that has a `ui5.yaml` and mounts it under `cds watch`. One `cds watch` command, any number of apps."*

Open **http://localhost:4004/my-tsx-app/index.html** — Hello World from the scaffolded XML app.

---

### Part 3 — Wire the JSX/TSX runtime (10 min, LIVE)

*"Four config touch points. I'll show each one and explain why it's needed."*

#### 3a · Install packages

```sh
# from apps/my-tsx-app/
npm add @ui5-community/jsx-runtime
npm add -D @babel/plugin-transform-react-jsx@^7 ui5-tooling-transpile
```

> **Why `@babel/plugin-transform-react-jsx@^7`?** v8 changed the transform API and breaks the integration — pin to v7.

> **Why `@ui5-community/jsx-runtime` in `dependencies` (not `devDependencies`)?** It's loaded at runtime by the browser, not just during the build.

#### 3b · `tsconfig.json` — three new fields

```jsonc
"jsx": "react-jsx",
"jsxImportSource": "ui5/community/jsx/runtime",
"types": ["@openui5/types", "@ui5-community/jsx-runtime"]
```

> **Why `ui5/community/jsx/runtime` and not `@ui5-community/jsx-runtime`?** `jsxImportSource` is resolved as an **AMD module path**, not an npm package name. The runtime registers under the UI5 namespace `ui5/community/jsx/runtime`. Using the npm name here gives a 404 at runtime.

#### 3c · `ui5.yaml` — spec 4.0 + transpile config

Replace the generated `ui5.yaml`. Use the YAML anchor trick so the transpile config is written once and referenced twice:

```yaml
specVersion: '4.0'
metadata:
  name: my-tsx-app
type: application

customConfiguration:
  config: &transpile-config
    transformTypeScript: true
    transformJSX:
      runtime: automatic
      importSource: "ui5/community/jsx/runtime"
    transpileDependencies: true

builder:
  settings:
    includeDependency:
      - ui5.community.jsx.runtime
  customTasks:
    - name: ui5-tooling-transpile-task
      afterTask: replaceVersion
      configuration:
        <<: *transpile-config

server:
  customMiddleware:
    - name: ui5-tooling-transpile-middleware
      afterMiddleware: compression
      configuration:
        <<: *transpile-config

framework:
  name: OpenUI5
  version: "1.153.0"
  libraries:
    - name: sap.m
    - name: sap.ui.core
    - name: themelib_sap_horizon
```

> **`transpileDependencies: true`** — tells the middleware to transpile files inside `node_modules` too, so the runtime package itself is included in what the browser receives.

> **`includeDependency`** — ensures the runtime is bundled into production builds.

#### 3d · `index.html` — resource-root mapping

Add the runtime entry to `data-sap-ui-resource-roots` (and update the attribute names to current kebab-case, deprecated in 1.120+):

```html
data-sap-ui-resource-roots='{
  "sap.demo": "./",
  "ui5.community.jsx.runtime": "./resources/ui5/community/jsx/runtime/"
}'
data-sap-ui-on-init="module:sap/ui/core/ComponentSupport"
```

> **`data-sap-ui-resourceroots` → `data-sap-ui-resource-roots`** and **`data-sap-ui-oninit` → `data-sap-ui-on-init`** — these are the current names; the old spellings still work but generate deprecation warnings.

> Without the `ui5.community.jsx.runtime` resource-root entry the browser can't find the runtime module — 404.

#### Verify

```sh
npm run ts-typecheck   # should be clean
```

---

### Part 4 — First TSX view (10 min, LIVE)

Delete (or rename) `App.view.xml`. Create `webapp/view/App.tsx`.

> **Snippet:** type `ui5-view` + Tab — fills in the full skeleton.

```
Snippet: ui5-view
```

**Explain while it fills in:**

- **`/** @namespace sap.demo.view */`** — required on every class so `ui5-tooling-transpile` registers it under the correct AMD module name (`sap/demo/view/App`). Without it the module can't be found.
- **`getAutoPrefixId(): true`** — scopes all control IDs to this view instance (e.g. `"myBtn"` → `"app--myBtn"`). XMLViews do this automatically; TSX views need it explicit. `byId()` still works — it searches with the prefix.
- **`getControllerName()`** — returns the dotted class name, exactly like `controllerName=` in XML. **Not** `getControllerModuleName()` — that method doesn't exist on `View` and would silently do nothing.
- **`createContent()`** — returns the root control. All JSX lives here.

After the snippet fills in, update `manifest.json` rootView:

```json
"rootView": {
  "viewName": "module:sap/demo/view/App",
  "id": "app"
}
```

> **`module:` prefix + slash path** — tells UI5 to load by AMD module path. Without it UI5 looks for an XMLView named `sap.demo.view.App` and fails.

**Live typo demo:**

```tsx
<Page ttle="Oops" />   // red squiggle — 'ttle' is not a prop of Page$Settings
```

*"This is the main reason to switch: prop-name typos are caught at compile time, not discovered at runtime."*

---

### Part 5 — Connect the OData V4 model (5 min, LIVE)

Add the OData data source to `manifest.json`:

```json
"sap.app": {
  "dataSources": {
    "bookshop": {
      "uri": "/browse/",
      "type": "OData",
      "settings": { "odataVersion": "4.0" }
    }
  }
},
"sap.ui5": {
  "dependencies": {
    "libs": {
      "sap.m": {},
      "sap.ui.core": {},
      "ui5.community.jsx.runtime": {}
    }
  },
  "models": {
    "": {
      "dataSource": "bookshop",
      "settings": { "synchronizationMode": "None", "operationMode": "Server" }
    },
    "i18n": {
      "type": "sap.ui.model.resource.ResourceModel",
      "settings": { "bundleName": "sap.demo.i18n.i18n" }
    }
  }
}
```

**Explain:** *"The model is now available to the whole app. Same CAP service (`/browse/`), two different UI5 apps — one backend shared."*

---

### Part 6 — Bindings (5 min, LIVE)

Show the three binding syntaxes side by side in `App.tsx`:

```tsx
// 1. String binding — identical to XMLView syntax
<Text text="{/Books(1)/title}" />
<Text text="{i18n>someKey}" />

// 2. Object binding — for complex cases (parts, formatter, type)
<Text text={{ path: "price", type: "sap.ui.model.type.Currency" } as never} />

// 3. Expression binding — ternary and simple logic inline
<ObjectStatus state="{= ${stock} >= 20 ? 'Success' : 'Warning' }" />
```

> **`as never`** — needed wherever TypeScript expects a `string` prop but you're passing a binding info object. It's a known limitation of the current type definitions; the runtime handles it correctly at runtime.

**Composite binding** (two fields, one formatter):

> **Snippet:** type `ui5-parts` + Tab

```
Snippet: ui5-parts
```

**Explain while it fills in:** *"`parts` is an array of paths; the inline `formatter` function receives each value in order and returns the combined display string. Here: price + currency_code → '19.99 EUR'."*

---

### Part 7 — Aggregation bindings + `<For>` (10 min, LIVE)

**Named vs default aggregations:**

```tsx
// Named aggregation → JSX array passed as a prop
<Table
  columns={[
    <Column><Text text="Title" /></Column>,
    <Column><Text text="Author" /></Column>,
  ]}
>
  {/* children go into the default aggregation (items) */}
</Table>
```

**The `<For>` directive + full Table:**

> **Snippet:** type `ui5-table` + Tab — inserts Table, named columns, and `<For>` together.

```
Snippet: ui5-table
```

**Explain while it fills in:**
- *"Named aggregation `columns` = JSX array passed as a prop — directly analogous to `<columns>` in XML."*
- *"Children go into the default aggregation (`items`). The `<For>` child is a **factory function** `() => JSX`. UI5 calls it once to get the template, then clones it for each bound entry — exactly like an XML template inside `<items>`."*
- *"The `each=` binding and the `items=` binding should match — both describe the same path."*

Then add the full column set and row template to match the bookshop-tsx reference (show it side by side).

**ObjectStatus for stock coloring:**

> **Snippet:** type `ui5-objectstatus` + Tab

```
Snippet: ui5-objectstatus
```

**Explain:** *"The `state` is bound via a formatter function — not a static value, not an expression binding. The formatter receives the live `stock` value and returns a `ValueState` string."*

**Create the formatter — `webapp/model/formatter.ts`:**

> **Snippet:** type `ui5-formatter` + Tab

```
Snippet: ui5-formatter
```

**Explain while it fills in:**
- *"`@namespace sap.demo.model` — required so the transpiler registers it at the right AMD path."*
- *"Three thresholds: ≥20 → Success (green), >0 → Warning (yellow), 0 → Error (red)."*
- *"Import it at the top of `App.tsx`: `import formatter from '../model/formatter';` then reference as `formatter.stockState`."*

> If you want to add `<For>` to an existing container rather than using `ui5-table`, type `ui5-for` + Tab for just the directive with factory child.

> **Three equivalent spellings** for `<For>` — show briefly for context:
> ```tsx
> // 1. Explicit <For> with factory child (used above — clearest for complex templates)
> <For each={{ path: "/Books" } as never}>{() => <StandardListItem />}</For>
>
> // 2. Implicit — items prop + plain child (runtime infers the factory)
> <List items={{ path: "/Books" } as never}><StandardListItem title="{title}" /></List>
>
> // 3. String binding (shortest)
> <List items="{/Books}"><StandardListItem title="{title}" /></List>
> ```

---

### Part 8 — Events + detail pane (8 min, LIVE)

**Create the controller — `webapp/controller/App.controller.ts`:**

> **Snippet:** type `ui5-controller` + Tab

```
Snippet: ui5-controller
```

**Explain while it fills in:**
- *"`@namespace sap.demo.controller` must match the dotted name returned by `getControllerName()` in the view."*
- *"The controller is identical to what you'd write for an XMLView. Model, bindings, `byId()` — nothing changed."*

**Add the detail pane** below the Table in `App.tsx` (paste or hand-type):

```tsx
<VBox id="bookDetails" visible={false} class="sapUiMediumMargin">
  <Title text="{title}" titleStyle="H2" class="sapUiSmallMarginBottom" />
  <Text text="{descr}" wrapping={true} class="sapUiSmallMarginBottom" />
  <HBox justifyContent="End" alignItems="Center">
    <Button
      text="Order"
      press=".onSubmitOrder"
      class="sapUiSmallMarginEnd"
    />
    <StepInput id="stepInput" min={1} max="{stock}" value={1} width="10rem" />
  </HBox>
</VBox>
```

**Wire row selection in the controller:**

> **Snippet:** type `ui5-bindelement` + Tab

```
Snippet: ui5-bindelement
```

**Explain while it fills in:**
- *"Read the OData context off the pressed item via `getBindingContext()`. The `as unknown as { getBindingContext() }` cast is needed because UI5's event types don't know which control raised the event."*
- *"`bindElement(context.getPath())` binds the `VBox` to that specific book's path — all `{title}`, `{descr}`, `{stock}` bindings inside it resolve against that book's context."*
- *"`setVisible(true)` shows the pane."*

**Add a SearchField above the table, wire search in the controller:**

```tsx
<SearchField placeholder="Search books..." liveChange=".onSearch" width="100%" />
```

> **Snippet:** type `ui5-search-filter` + Tab

```
Snippet: ui5-search-filter
```

**Explain while it fills in:**
- *"Read `newValue` from the event — that's the current text as the user types."*
- *"`getBinding('items')` returns the `ListBinding` on the Table."*
- *"`oBinding.filter([new Filter('title', Contains, query)])` sends the filter server-side — no local filtering."*
- *"Empty query → `filter([])` clears all filters."*

---

### Part 9 — OData V4 action (5 min, LIVE)

> **Snippet:** type `ui5-v4-action` + Tab

```
Snippet: ui5-v4-action
```

**Explain while it fills in:**
- *"`bindContext('/submitOrder(...)')` — the `(...)` suffix is the V4 convention for unbound actions. It tells the model this is an action call, not a navigation."*
- *"`setParameter` + `await execute()` — proper async/await. No `callFunction`, no `success` callback. That's the V2 way, which is gone."*
- *"`oModel.refresh()` causes the Table to re-fetch stock values — you'll see the number update live after ordering."*

Full handler in the controller (fill in the snippet, then extend with book/quantity extraction):

```ts
async onSubmitOrder(): Promise<void> {
  const oModel = this.getView()!.getModel() as ODataModel;
  const bookDetails = this.byId("bookDetails") as VBox;
  const stepInput = this.byId("stepInput") as StepInput;
  const oBinding = bookDetails.getElementBinding()!;
  const sPath = oBinding.getPath()!;
  const oContext = oBinding.getBoundContext() as Context;
  const bookID = parseInt(sPath.replace(/.*\((\d+)\)/, "$1"), 10);
  const quantity = stepInput.getValue();
  const title = (oContext.getObject() as { title: string }).title;

  const oOperation = oModel.bindContext("/submitOrder(...)");
  oOperation.setParameter("book", bookID);
  oOperation.setParameter("quantity", quantity);
  try {
    await oOperation.execute();
    MessageToast.show(`Order successful (${title}, ${quantity} pcs.)`);
    oModel.refresh();
  } catch (oError) {
    console.error("submitOrder failed", oError);
  }
}
```

---

### Part 10 — Tour of the finished bookshop (5 min, SHOW)

*"Here's everything we just built, polished and complete."*

Open `apps/bookshop-tsx/webapp/view/App.tsx` and `controller/App.controller.ts` side by side.

**View highlights:**

| Concept | Location |
|---|---|
| `@namespace` + `getControllerName()` | top of file |
| Full column set with `<For>` factory child | `<Table>` block |
| `ObjectNumber` for price (not composite parts) | 4th cell in row |
| `ObjectStatus` with `formatter.stockState` | 5th cell in row |
| Detail `VBox` with `HBox` Order row | bottom of `createContent()` |

**Controller highlights:**

| Concept | Location |
|---|---|
| `onSelect` → `bindElement` | reads context from pressed row |
| `onSubmitOrder` V4 action + toast | async/await, no callbacks |
| `onSearch` Filter + ListBinding | server-side filter by title |

**Key message:** *"The controller is identical to what you'd write for an XMLView app. The model, formatter, i18n, manifest — all unchanged. Only the view syntax is new."*

> **Bridge:** *"You now have a working TSX bookshop. Let's go back to the slides for the honest status report — what's there, what's coming, and how to get involved."*

> ▶ Switch displays back to slides. Resume at **S13**.

---

## 🎞 Phase C — Closing Slides (S13–S18)

> Note: **S11 "Zero XMLViews"** and **S12 "TSX view anatomy"** are already covered live
> (Parts 1/10 and Part 4 respectively). Skip or use as backup if the live demo failed.

### S13 — What's not there yet
*"Honest status: HTML intrinsics are typed but not yet rendered. Flex/control-tree extensibility via pre-render hooks is coming. For views — aggregations, bindings, events, both directives — it's ready today."*

### S14 — This is your project too
*"This is a community project. Issues, PRs, feature ideas — all welcome. Link is on the next slide."*

### S15 — Setup in 4 steps
*"Four touch points: install packages, three tsconfig fields, ui5.yaml spec 4.0 + transpile block, one resource-root in index.html. That's it."*

### S16 — Things to watch out for
*"The gotchas you hit live, collected: pin babel to v7, use the AMD namespace in jsxImportSource, `as never` for object bindings. Worth bookmarking."*

### S17 — Links & docs
*"Runtime repo, docs and showcase app, the original CodeJam XMLView app this is based on, and this demo repo."*

### S18 — Thank you ✨
*"Thanks for coding along. Questions?"*

---

---

## Appendix — CAP Server Bootstrap Reference

> **These steps are not run during the demo** — the backend is given. This appendix explains
> how `cap/bookshop/` was originally created, so you can reproduce it from scratch if needed.

### Prerequisites

```sh
npm install -g @sap/cds-dk   # latest CAP DK
```

### Bootstrap

```sh
# from the repo root
cds init cap/bookshop
cd cap/bookshop
npm install
```

### `db/schema.cds`

```cds
namespace sap.capire.bookshop;

entity Books : managed {
  key ID       : Integer;
      title    : localized String(111);
      descr    : localized String(1111);
      author   : Association to Authors;
      genre    : Association to Genres;
      stock    : Integer;
      price    : Decimal(9,2);
      currency : Currency;
}

entity Authors {
  key ID   : Integer;
      name : String(111);
      books : Association to many Books on books.author = $self;
}

entity Genres : CodeList {
  key ID       : Integer;
      parent   : Association to Genres;
      children : Composition of many Genres on children.parent = $self;
}
```

### `srv/cat-service.cds`

```cds
using { sap.capire.bookshop as bookshop } from '../db/schema';

service CatalogService @(path:'/browse') {

  @readonly entity Books as SELECT from bookshop.Books {*,
    author.name as author,
    genre.name  as genre
  } excluding { createdBy, modifiedBy };

  action submitOrder (book : Books:ID, quantity : Integer);
}
```

### `srv/cat-service.js`

```js
const cds = require('@sap/cds')

module.exports = class CatalogService extends cds.ApplicationService {
  init() {
    const { Books } = this.entities

    this.on('submitOrder', async (req) => {
      const { book, quantity } = req.data
      let { stock } = await SELECT.one`stock`.from(Books, book)
      if (stock < quantity) return req.reject(409, `${quantity} exceeds stock`)
      await UPDATE(Books, book).with({ stock: stock -= quantity })
      return { ID: book, stock }
    })

    return super.init()
  }
}
```

### Sample data

Add CSVs for `sap.capire.bookshop-Authors.csv`, `sap.capire.bookshop-Books.csv`, and
`sap.capire.bookshop-Genres.csv` (see the files in `db/data/` in this repo).

### Run

```sh
# from cap/bookshop/
npx cds watch
```

The V4 protocol is configured in `package.json` under `"cds": { "protocols": { "odata-v4": { "path": "/browse" } } }`.
In-memory SQLite is auto-deployed on each start (no persistent database needed).

---

*Snippet reference: see [`SNIPPETS.md`](./SNIPPETS.md).*
