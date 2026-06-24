# Rule: State Management — Zustand

## Single source of truth

- The cart lives **only** in `src/store/cartStore.ts`. No component holds its own copy of
  cart data. This replaces the prototype's global `var cart = []` pollution.
- Persist with the `persist` middleware to `localStorage` so the cart survives refresh.

## Store shape

- **State:** `items: CartItem[]` (and nothing that can be derived).
- **Actions:** `addItem(product, qty)`, `removeItem(id)`, `setQuantity(id, qty)`,
  `increment(id)`, `decrement(id)`, `clear()`.
- All cart mutation logic (merge existing item, enforce min quantity 1, multi-quantity add)
  lives in actions — **not** in components.

## Derived values are selectors, never state

- `totalQuantity` (#3) and `totalPrice` are computed via selectors / `useMemo`, never stored.
  Storing them would risk drift — the prototype's recompute-everywhere bug class.
- Components subscribe to the **narrowest slice** they need (e.g. select `totalQuantity`
  alone) to avoid unnecessary re-renders.

## Discipline

- Keep the store free of JSX and DOM access — it's pure state + logic.
- Side effects that belong to UI (toasts on add, dialogs on remove/checkout) live in the
  component/hook layer, not in the store.
- Quantity rules are defined once in the store and reused by every entry point
  (`QuantityStepper` on cards, in cart, and detail page) — DRY.
