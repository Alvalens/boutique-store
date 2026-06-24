# CLAUDE.md — 精品商店 (Boutique Store) E-Commerce

Migration of a single-file `index.html` prototype into a structured React SPA.
Full design lives in [`plan.md`](./plan.md). Read it before making changes.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Zustand (`persist`) · React Router · Sonner.

## Prime Directives

1. **Retain the original style — extend, don't rewrite.** The prototype's visual design,
   layout, color palette (dark header `#333`, accent `#ff6b6b`, success green `#4CAF50`),
   Traditional-Chinese UI copy, and NT$ pricing are the source of truth. We modernize the
   *implementation*, not the look. When in doubt, match `index.html`.
2. **This is a migration, not a redesign.** Every feature in the prototype must survive the
   port. New behavior is limited to the 5 required features in `plan.md` §1.
3. **Best practice over cleverness.** Separation of concerns, clean code, and DRY are
   non-negotiable. See the rules below.

## Rules

Detailed, enforceable rules live in `.claude/rules/`. Read the relevant file before working
in that area:

- [`.claude/rules/architecture.md`](./.claude/rules/architecture.md) — separation of concerns, folder boundaries, DRY
- [`.claude/rules/react.md`](./.claude/rules/react.md) — component & hook conventions
- [`.claude/rules/typescript.md`](./.claude/rules/typescript.md) — typing rules
- [`.claude/rules/styling.md`](./.claude/rules/styling.md) — Tailwind + shadcn + preserving original look
- [`.claude/rules/state-management.md`](./.claude/rules/state-management.md) — Zustand store conventions

## Quick Reference

- Product data: `src/data/products.json` → `loadProducts()` → `useProducts()`.
- Cart is the single source of truth in `src/store/cartStore.ts` (persisted to localStorage).
- Derived values (`totalQuantity`, `totalPrice`) are **selectors**, never stored state.
- UI strings stay in Traditional Chinese; code, comments, and identifiers stay in English.
