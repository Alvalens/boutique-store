import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product } from '@/types/product'

interface CartState {
  items: CartItem[]
  /** Add `qty` of a product, merging with an existing line if present. */
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: number) => void
  /** Set an exact quantity; removing the line if it drops below 1. */
  setQuantity: (productId: number, qty: number) => void
  increment: (productId: number) => void
  decrement: (productId: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, qty = 1) =>
        set((state) => {
          const amount = Math.max(1, Math.floor(qty))
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + amount }
                  : i,
              ),
            }
          }
          return { items: [...state.items, { product, quantity: amount }] }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      setQuantity: (productId, qty) =>
        set((state) => {
          const next = Math.floor(qty)
          if (next < 1) {
            return { items: state.items.filter((i) => i.product.id !== productId) }
          }
          return {
            items: state.items.map((i) =>
              i.product.id === productId ? { ...i, quantity: next } : i,
            ),
          }
        }),

      increment: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),

      decrement: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'boutique-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

/** Total number of units across all cart lines (requirement #3). */
export const selectTotalQuantity = (state: CartState): number =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

/** Total cart price in NT$. */
export const selectTotalPrice = (state: CartState): number =>
  state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
