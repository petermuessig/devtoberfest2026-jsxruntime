# CAP Bookshop

This is the standard [capire bookshop](https://cap.cloud.sap/docs/get-started/bookshop) backend,
bootstrapped with the latest `@sap/cds-dk`.

## Run

```sh
npm install
npx cds watch
```

→ OData V4 at http://localhost:4004/browse/Books  
→ OData V2 at http://localhost:4004/v2/browse/Books (consumed by the UI5 app)  
→ Fiori launchpad at http://localhost:4004/

## Services

- `CatalogService` at `/browse` — read Books (denormalized with author + genre), `submitOrder` action
