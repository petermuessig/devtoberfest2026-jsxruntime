# VS Code Snippets — UI5 TSX Runtime

These snippets are already in `.vscode/ui5-tsx.code-snippets` and activate automatically when you open this repo in VS Code.

## Import the snippets

Snippets in `.vscode/*.code-snippets` are **workspace-level** — VS Code picks them up automatically when you open the folder. No import step needed.

To verify: `Cmd+Shift+P` → *Insert Snippet* → you should see the snippets listed.

---

## Available snippets

| Prefix | Scope | What it inserts |
|---|---|---|
| `ui5-view` | `.tsx` | Full TSX view skeleton (View subclass + all required methods) |
| `ui5-controller` | `.ts` | Controller skeleton with `@alias` JSDoc |
| `ui5-for` | `.tsx` | `<For>` directive with factory child function |
| `ui5-table` | `.tsx` | Full `<Table>` with named columns + `<For>` binding |
| `ui5-objectstatus` | `.tsx` | `<ObjectStatus>` with `state` bound via formatter |
| `ui5-parts` | `.tsx` | Composite parts binding with inline formatter |
| `ui5-v4-action` | `.ts` | V4 action binding: `bindContext` + `setParameter` + `execute` |
| `ui5-bindelement` | `.ts` | `onSelect` pattern: context → `bindElement` |
| `ui5-search-filter` | `.ts` | `onSearch` handler with `Filter` + `ListBinding.filter()` |
| `ui5-if` | `.tsx` | `<If>` directive with bound condition |
| `ui5-formatter` | `.ts` | Formatter module skeleton |

---

## Walkthrough usage guide

| Demo step | Snippet to use |
|---|---|
| Part 4 — First TSX view | `ui5-view` |
| Part 6 — Composite binding | `ui5-parts` |
| Part 7 — Table + For | `ui5-table` |
| Part 7 — For directive alone | `ui5-for` |
| Part 7 — ObjectStatus coloring | `ui5-objectstatus` |
| Part 7 — Formatter module | `ui5-formatter` |
| Part 8 — Controller skeleton | `ui5-controller` |
| Part 8 — onSelect / bindElement | `ui5-bindelement` |
| Part 8 — onSearch | `ui5-search-filter` |
| Part 9 — submitOrder V4 action | `ui5-v4-action` |
| Phase A / S9 — `<If>` concept | `ui5-if` |

---

*For the full step-by-step demo script, see `WALKTHROUGH.md`.*
