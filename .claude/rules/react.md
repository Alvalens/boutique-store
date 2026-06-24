# Rule: React Conventions

## Components

- **Function components only**, named exports, `PascalCase` filename matching the component.
- Props are explicitly typed via an `interface` (e.g. `ProductCardProps`). No `any`, no implicit props.
- Keep components **presentational where possible**: pass data and callbacks via props; lift
  shared state to the store or a hook.
- Prefer **composition over configuration** — small components combined, not one big component
  with many boolean flags.
- Use semantic, accessible markup (buttons are `<button>`, labels tied to inputs). shadcn/Radix
  primitives already handle most a11y — use them rather than hand-rolling.

## Hooks

- Reusable stateful logic goes in `src/hooks/` with a `use` prefix.
- Respect the rules of hooks (top level, no conditionals).
- Always clean up side effects in `useEffect` return. The prototype's "no listener cleanup"
  problem must not recur.
- Derive, don't duplicate: compute from existing state with `useMemo` instead of mirroring it
  into new state.

## Events & rendering

- Use React event handlers; **never** inline `onclick=""` strings or manual `innerHTML`
  (both were prototype anti-patterns).
- Provide stable, meaningful `key`s in lists (use `product.id`, not array index).
- No direct DOM queries (`document.getElementById`) — React owns the DOM.

## Performance

- Debounce user-driven filtering (search) — see `useDebounce`.
- Memoize expensive derived lists with `useMemo`; wrap callbacks passed deep with `useCallback`
  only when it prevents real re-renders — don't over-memoize.
