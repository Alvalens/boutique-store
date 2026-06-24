# Rule: TypeScript

- **`strict` mode on.** No `any` (use `unknown` + narrowing if a type is truly unknown).
- Domain types (`Product`, `CartItem`) live in `src/types/` and are the single definition —
  import them, never redeclare inline shapes.
- Type all function signatures and component props explicitly. Let inference handle local
  variables.
- Use `interface` for object/props shapes, `type` for unions and aliases.
- No non-null assertions (`!`) to silence the compiler — handle the absent case.
- Keep `products.json` typed: import it as `Product[]` so data and types can't drift.
- Prefer discriminated unions for state (e.g. loading/error/success) over loose boolean flags
  where it improves clarity.
- Code, identifiers, and comments in **English**; only user-facing string literals are in
  Traditional Chinese.
