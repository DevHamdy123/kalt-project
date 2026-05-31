import { create } from "zustand";
import { persist } from "zustand/middleware";

// تعريف شكل المنتج داخل السلة
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  // يمكنك لاحقاً إضافة المقاس أو اللون هنا
  // size?: string;
}

// تعريف كل الوظائف والبيانات اللي السلة هتحتاجها
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // حالة السلة المبدئية (فارغة)
      items: [],

      // 1. إضافة منتج للسلة
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          // لو المنتج موجود أصلاً، زود الكمية بتاعته بس
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          });
        } else {
          // لو منتج جديد، ضيفه للقائمة
          set({ items: [...currentItems, item] });
        }
      },

      // 2. حذف منتج من السلة
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      // 3. تحديث كمية منتج معين (من أزرار + و -)
      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      // 4. تفريغ السلة بالكامل (بعد الدفع مثلاً)
      clearCart: () => set({ items: [] }),

      // 5. حساب إجمالي السعر
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      // 6. حساب إجمالي عدد القطع (لعرضه في الـ Badge فوق أيقونة السلة)
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      // اسم المفتاح اللي هيتحفظ بيه في الـ Local Storage
      name: "kalt-cart-storage",
    },
  ),
);
