// ─────────────────────────────────────────────────────
// lib/store.ts — Zustand cart store
//
// Menggantikan cartLoad/cartSave localStorage manual.
// Zustand handle persist otomatis & lebih mudah di-test.
// ─────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (name: string, price: number) => void;
  removeItem: (name: string) => void;
  changeQty: (name: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Selectors
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (name, price) => {
        set((state) => {
          const existing = state.items.find((i) => i.name === name);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.name === name ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { name, price, qty: 1 }] };
        });
      },

      removeItem: (name) => {
        set((state) => ({
          items: state.items.filter((i) => i.name !== name),
        }));
      },

      changeQty: (name, delta) => {
        set((state) => {
          const updated = state.items
            .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
            .filter((i) => i.qty > 0);
          return { items: updated };
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

      count: () =>
        get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    {
      name: "karasa_cart", // key di localStorage, sama seperti sebelumnya
    }
  )
);
