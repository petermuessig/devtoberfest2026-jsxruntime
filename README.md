# UI5 Views, Reimagined: Type-Safe TSX for a Modern Dev Experience

> **Devtoberfest 2026** session by SAP TechEd  
> 📹 [Watch on YouTube](https://www.youtube.com/watch?v=B4BRUJPwVzo)  
> 🔗 [github.com/petermuessig/devtoberfest2026-jsxruntime](https://github.com/petermuessig/devtoberfest2026-jsxruntime)  
> 🖥️ [Slides](https://petermuessig.github.io/devtoberfest2026-jsxruntime/)

This repository contains all materials for the Devtoberfest 2026 session on the community
**JSX/TSX runtime for UI5** ([`@ui5-community/jsx-runtime`](https://github.com/ui5-community/jsx-runtime)).

## What's in this repo

```
devtoberfest-2026-jsxruntime/
  README.md                 ← you are here
  package.json              ← workspace root with single npm start script
  presentation/
    WALKTHROUGH.md          ← presenter walkthrough with slide cues and snippet hints
    SNIPPETS.md             ← VS Code snippet reference (prefixes + usage guide)
    handout.pdf             ← one-page printed cheat sheet (A4 landscape)
    slides/
      index.html            ← self-contained reveal.js slide deck (open in browser)
  cap/
    bookshop/               ← given CAP bookshop backend (cds watch → :4004)
  apps/
    bookshop-tsx/           ← finished UI5 TS app, 100% TSX views
```

## Quick start

### 1. Install and start

```sh
npm install
npm start      # runs cds watch; cds-plugin-ui5 auto-mounts the UI5 app
```

→ OData V4 at `http://localhost:4004/browse`  
→ Bookshop UI5 app at `http://localhost:4004/bookshop-tsx/index.html`

### 2. Open the slides

Open `presentation/slides/index.html` in your browser.  
Press `s` for speaker notes, `f` for fullscreen.

---

## About the JSX/TSX runtime for UI5

The [`@ui5-community/jsx-runtime`](https://github.com/ui5-community/jsx-runtime) is a community
project that lets you write UI5 views using TypeScript JSX (TSX) syntax instead of XML.
**Ready to use today** — an official release will be mostly API-compatible (only runtime internals
may change, not the view code you write):

```tsx
// App.tsx — a full type-safe UI5 view
import View from "sap/ui/core/mvc/View";
import Page from "sap/m/Page";
import Button from "sap/m/Button";

/** @alias sap.codejam.view.App */
export default class App extends View {
  getAutoPrefixId(): boolean { return true; }

  createContent() {
    return (
      <Page title="Bookshop">
        <Button text="Order" press=".onOrder" />
      </Page>
    );
  }
}
```

**No React. No VDOM. No reconciler.** JSX compiles directly to `new Control(settings)` via a tiny
Babel transform + runtime shim. Reactivity stays 100% UI5 bindings.

### What you get
- ✅ Per-control TypeScript prop checking (against `$XSettings` from `@openui5/types`)
- ✅ IDE autocomplete, refactoring, go-to-definition on view code
- ✅ Native JS loops and conditionals in views (`<For>` / `<If>` directives)
- ✅ All UI5 concepts unchanged — bindings, aggregations, controllers, i18n, routing
- ✅ Full coexistence with existing XMLViews

### What's still coming
- 🔜 HTML intrinsics rendering (typed, not yet rendered at runtime)
- 🔜 Flex/control-tree extensibility via pre-render hooks (same hooks XML uses)

---

## About the CAP backend

The `cap/bookshop/` server is the standard
[capire bookshop](https://cap.cloud.sap/docs/get-started/bookshop) sample, bootstrapped with the
latest `@sap/cds-dk`. See the [CAP Bootstrap Appendix in WALKTHROUGH.md](./presentation/WALKTHROUGH.md#appendix--cap-server-bootstrap-reference) for the full origin story.

---

## Links

- **This session's repo:** https://github.com/petermuessig/devtoberfest2026-jsxruntime
- **Slides (GitHub Pages):** https://petermuessig.github.io/devtoberfest2026-jsxruntime/
- JSX runtime repo: https://github.com/ui5-community/jsx-runtime
- Docs & showcase: https://github.com/ui5-community/jsx-runtime/tree/main/docs
- SAP CodeJam (original XMLView app): https://github.com/SAP-samples/ui5-exercises-codejam
- CAP bookshop get-started: https://cap.cloud.sap/docs/get-started/bookshop
