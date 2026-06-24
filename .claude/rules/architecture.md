# Rule: Architecture — Separation of Concerns, Boundaries, DRY

## Layer boundaries (each layer depends only on the one below it)

```
pages  →  components  →  hooks / store  →  lib  →  data / types
```

- **`data/` & `types/`** — pure data and type definitions. No logic, no React.
- **`lib/`** — framework-agnostic helpers (`loadProducts`, `formatPrice`, `cn`). No React, no JSX.
- **`store/`** — Zustand state and actions. No JSX, no DOM access.
- **`hooks/`** — reusable stateful logic (`useProducts`, `useDebounce`). May use store + lib.
- **`components/`** — presentation. Receive data via props or read from store/hooks. No data fetching inline.
- **`pages/`** — compose components, own route-level concerns (filtering, layout).

A file must not reach "upward" (e.g. `lib/` importing from `components/`). If you need that, the logic is in the wrong layer.

## Separation of concerns

- **Data fetching** belongs in `hooks/`, never inside a presentational component.
- **Business logic** (cart math, quantity rules) belongs in `store/` or `lib/`, never duplicated in JSX.
- **Formatting** (NT$ price, etc.) goes through `lib/format.ts` — never inline `'NT$ ' + price` in components.
- A component renders; it does not also fetch, compute totals, or persist.

## DRY

- The prototype duplicated `renderProducts` / `renderFilteredProducts` and repeated cart-item
  markup. **Do not reintroduce duplication.** One `ProductCard`, one `CartItemRow`, one
  `QuantityStepper` — reused everywhere they apply.
- Derived cart values are computed **once** as selectors in the store, consumed everywhere.
- Shared placeholder/image logic lives in one place.
- If you copy-paste more than a few lines, extract a component, hook, or helper instead.

## File size & focus

- One component per file; one clear responsibility per file.
- If a component grows past ~150 lines or starts doing two jobs, split it.
- Co-locate only what belongs together; keep `ui/` (shadcn primitives) separate from app components.
