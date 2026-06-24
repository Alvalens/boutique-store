import { create } from 'zustand'

interface UIState {
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  setCartOpen: (open: boolean) => void
}

/** Ephemeral UI state (not persisted) — keeps view concerns out of the cart data store. */
export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  setCartOpen: (open) => set({ cartOpen: open }),
}))
