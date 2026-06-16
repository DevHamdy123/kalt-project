import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  // 1. فعلنا المقاس هنا
  size?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  // 2. خلينا دوال الحذف والتعديل تستقبل المقاس كمان
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const currentItems = get().items;
        // 3. بنطابق بالـ ID والمقاس مع بعض
        const existingItem = currentItems.find(
          (i) => i.id === item.id && i.size === item.size,
        );

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...currentItems, item] });
        }
      },

      removeItem: (id, size) => {
        set({
          // 4. بنحذف بناءً على الـ ID والمقاس مع بعض
          items: get().items.filter((i) => !(i.id === id && i.size === size)),
        });
      },

      updateQuantity: (id, quantity, size) => {
        set({
          // 5. بنعدل الكمية بناءً على الـ ID والمقاس مع بعض
          items: get().items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "kalt-cart-storage",
    },
  ),
);
