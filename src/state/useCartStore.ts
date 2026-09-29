import { create } from 'zustand'

export interface CartLine {
  productId: string
  qty: number
}

interface CartState {
  lines: CartLine[]
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  count: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  add: (productId, qty = 1) =>
    set((s) => {
      const existing = s.lines.find((l) => l.productId === productId)
      if (existing) {
        return {
          lines: s.lines.map((l) =>
            l.productId === productId ? { ...l, qty: l.qty + qty } : l,
          ),
          isOpen: true,
        }
      }
      return { lines: [...s.lines, { productId, qty }], isOpen: true }
    }),
  setQty: (productId, qty) =>
    set((s) => ({
      lines:
        qty <= 0
          ? s.lines.filter((l) => l.productId !== productId)
          : s.lines.map((l) => (l.productId === productId ? { ...l, qty } : l)),
    })),
  remove: (productId) =>
    set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),
  count: () => get().lines.reduce((n, l) => n + l.qty, 0),
}))
