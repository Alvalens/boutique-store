# Rule: Styling — Tailwind + shadcn, Preserve the Original Look

## Preserve the prototype's visual identity

We are extending the design, not replacing it. Match `index.html`:

| Token | Value | Used for |
|-------|-------|----------|
| Header bg | `#333` | top header |
| Accent | `#ff6b6b` | prices, cart icon, checkout button, badge text |
| Success | `#4CAF50` (hover `#45a049`) | add-to-cart button |
| Page bg | `#f5f5f5` | body background |
| Surface | `#ffffff` | cards, cart panel |
| Border | `#ddd` / `#eee` | dividers, card borders |

- Expose these as Tailwind theme colors / CSS variables so they're used by name, not hard-coded
  hex repeated across files (DRY).
- Card style stays the same: rounded corners, subtle shadow, hover lift (`translateY(-2px)`).
- The cart stays a right-side slide-out panel (now a shadcn `Sheet`), same direction and feel.

## Tailwind usage

- Style with Tailwind utilities; **no plain hand-written CSS files** except `index.css`
  (Tailwind directives + theme variables).
- **Fix the prototype's responsiveness problems:** never use fixed `width: 1200px`; use a
  responsive container. Product grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.
- No over-nested selectors (the prototype's problem #5) — Tailwind is flat by nature; keep it that way.
- Use `cn()` from `lib/utils.ts` to merge conditional classes; don't concatenate class strings manually.

## shadcn/ui

- Use shadcn components for Dialog, AlertDialog, Sheet, Input, Button, Sonner, etc. — don't
  rebuild primitives.
- Generated primitives live in `src/components/ui/`; do not edit them for app-specific styling —
  wrap or compose instead.
- Customize the shadcn theme to the palette above rather than overriding per-instance.
