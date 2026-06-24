# 精品商店 (Boutique Store) — E-Commerce React Rebuild (plan.md)

> Rebuild the existing single-file `index.html` prototype into a structured, type-safe React shopping-cart app.
> Date: 2026-06-24

---

## 1. Goals

Re-implement the `index.html` prototype (Boutique Store / 8 electronics products / slide-out cart / simulated checkout) as a modern React SPA, fixing the problems flagged in the prototype while delivering these required features:

| # | Requirement | Implementation |
|---|-------------|----------------|
| 1 | Confirmation dialog when checking out / removing a cart item | shadcn `Dialog` / `AlertDialog` |
| 2 | Notification when adding an item to the cart | shadcn `Sonner` (toast) |
| 3 | Count total quantity of items in the cart | Zustand selector |
| 4 | Search box to find products more easily | Debounced client-side filter |
| 5 | Fix quantity that couldn't update by multiples | Quantity stepper on product cards + editable quantity input in cart |

---

## 2. Stack (Confirmed)

| Category | Choice |
|----------|--------|
| Framework | **React** (latest stable, React 19) |
| Language | **TypeScript** |
| Build tool | **Vite** |
| Styling | **Tailwind CSS** |
| Component library | **shadcn/ui** (Radix-based) |
| State management | **Zustand** + `persist` middleware |
| Routing | **React Router** (product list page + product detail page) |
| Notifications | **Sonner** (shadcn-integrated toast) |

---

## 3. Confirmed Design Decisions

- **Data source**: Local JSON file (`src/data/products.json`), loaded at runtime via a simulated async fetch (preserves the prototype's "loading…" experience).
- **Cart persistence**: Zustand `persist` middleware to `localStorage`, so the cart survives a page refresh.
- **Language**: Keep **Traditional Chinese** UI (Boutique Store, NT$ pricing).
- **Checkout depth**: **Confirmation dialog only** → success state → clear cart (no payment form).
- **Quantity fix (#5)**: Quantity stepper on product cards (add N at once) **and** editable exact-quantity input on cart items.
- **App structure**: Product list page + **product detail page** (`/product/:id`) via React Router.

---

## 4. Architecture

### 4.1 Folder Structure

```
e-commerce/
├─ index.html                 # Vite entry
├─ package.json
├─ vite.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ components.json            # shadcn config
├─ src/
│  ├─ main.tsx                # React entry + Router
│  ├─ App.tsx                 # Layout (Header + Routes + CartDrawer + Toaster)
│  ├─ index.css               # Tailwind directives
│  │
│  ├─ types/
│  │  └─ product.ts           # Product, CartItem types
│  │
│  ├─ data/
│  │  └─ products.json        # 8 products
│  │
│  ├─ lib/
│  │  ├─ utils.ts             # shadcn cn() helper
│  │  ├─ format.ts            # formatPrice (NT$)
│  │  └─ products.ts          # loadProducts(): simulated async fetch
│  │
│  ├─ store/
│  │  └─ cartStore.ts         # Zustand store (persist)
│  │
│  ├─ hooks/
│  │  ├─ useDebounce.ts       # search debounce
│  │  └─ useProducts.ts       # load + loading/error state
│  │
│  ├─ components/
│  │  ├─ ui/                  # shadcn-generated components (button, dialog, input, sonner...)
│  │  ├─ Header.tsx           # title + search box + cart button (with count badge)
│  │  ├─ SearchBox.tsx        # search input (#4)
│  │  ├─ ProductGrid.tsx      # responsive grid + loading skeleton
│  │  ├─ ProductCard.tsx      # card + quantity stepper + add to cart (#5, #2)
│  │  ├─ QuantityStepper.tsx  # reusable +/- and input (#5)
│  │  ├─ CartDrawer.tsx       # slide-out cart (shadcn Sheet)
│  │  ├─ CartItemRow.tsx      # single cart item + remove confirmation (#1)
│  │  └─ CheckoutDialog.tsx   # checkout confirmation + success state (#1)
│  │
│  └─ pages/
│     ├─ ProductListPage.tsx  # home: SearchBox + ProductGrid
│     └─ ProductDetailPage.tsx# /product/:id detail page
```

### 4.2 Component Responsibilities (Single Responsibility)

- **`cartStore.ts`** — Single source of truth for cart state. Public interface:
  - state: `items: CartItem[]`
  - actions: `addItem(product, qty)`, `removeItem(id)`, `setQuantity(id, qty)`, `increment(id)`, `decrement(id)`, `clear()`
  - selectors: `totalQuantity`, `totalPrice` (computed via selectors, no duplicated state)
- **`useProducts`** — Encapsulates the load flow, returns `{ products, isLoading, error }`, fixing the prototype's "no error handling" problem.
- **`QuantityStepper`** — Controlled component: `value` + `onChange`, with `-` / `+` and a typed number input; enforces min 1 and supports multi-quantity updates (#5). Shared by ProductCard, CartItemRow, ProductDetailPage.
- **`SearchBox` + `useDebounce`** — Input updates the query string after 250ms debounce; filtering computed in `ProductListPage` via `useMemo` (#4), fixing the prototype's "unthrottled search" problem.

### 4.3 Data Flow

```
products.json ──loadProducts()──► useProducts ──► ProductListPage
                                                      │ (filter by debounced query)
                                                      ▼
                                                  ProductGrid ──► ProductCard
                                                                     │ addItem(product, qty)
                                                                     ▼
                                                  ┌──────────► cartStore (Zustand + persist)
                                                  │                  │
                            toast notify (#2) ◄───┘                  │ totalQuantity (#3)
                                                                     ▼
                                          Header badge ◄──── CartDrawer ──► CartItemRow
                                                                     │            │ remove confirm (#1)
                                                                     ▼            ▼
                                                          CheckoutDialog (#1) ──► clear()
```

---

## 5. Prototype Issues → Fixes

| Prototype problem | Fix |
|-------------------|-----|
| 1–5 CSS responsiveness / fixed width / over-nesting | Tailwind responsive utilities, grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` |
| 6 Global variable pollution | Zustand store + modularization |
| 7, 12, 15 No error handling | `useProducts` and checkout flow with loading/error states |
| 8, 11 Inefficient DOM operations | React declarative rendering + selectors |
| 9 Unthrottled search | `useDebounce` |
| 10 No feedback on add-to-cart | Sonner toast (#2) |
| 13 No event delegation / inline handlers | React event handlers |
| 14 No debounce on resize | Tailwind media queries replace the JS resize listener (removed) |
| 16 No event-listener cleanup | Handled by React lifecycle; outside-click close uses Sheet's built-in behavior |
| dead code: `searchProducts` | Replaced by a real SearchBox |

---

## 6. Product Data

Reuse the prototype's 8 products, migrated to `products.json`, extended with a `description` field for the detail page:

```ts
// types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;        // placeholder (emoji / svg)
  description: string;  // used by detail page
}
export interface CartItem {
  product: Product;
  quantity: number;
}
```

Products: 無線藍牙耳機 / 智慧手錶 / 便攜式充電器 / 無線滑鼠 / 機械鍵盤 / 網路攝影機 / USB隨身碟 / 桌面擴音器.

---

## 7. Implementation Milestones

1. **Scaffold** — Vite + React + TS; install Tailwind, shadcn init, Zustand, React Router, Sonner.
2. **Data layer** — `types`, `products.json`, `loadProducts`, `useProducts`, `formatPrice`.
3. **State layer** — `cartStore` (with persist and selectors).
4. **Product list** — `Header`, `SearchBox` (#4), `ProductGrid`, `ProductCard`, `QuantityStepper` (#5).
5. **Cart** — `CartDrawer`, `CartItemRow`, quantity editing (#5), remove confirmation (#1), total-quantity badge (#3).
6. **Notifications + checkout** — Sonner toast (#2), `CheckoutDialog` (#1), success and clear flow.
7. **Detail page** — `ProductDetailPage` (`/product/:id`).
8. **Polish** — responsiveness pass, loading/error states, empty-cart state, final cleanup.

---

## 8. Out of Scope (YAGNI)

- Real backend / payment gateway
- User login / accounts
- Multi-language i18n
- Product categories / filtering / sorting (beyond search)
- Checkout form (name / address / credit card)
- Tests (unless requested later)

---

## 9. Open Questions (not yet decided; confirm before implementation)

- Notification copy and duration (default: "已加入購物車", 3s).
- Product images: keep the prototype's emoji / SVG placeholders, or swap in real images later.
- Quantity upper limit (whether to cap by stock; default: no cap).
```
