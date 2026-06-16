import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ==========================================
// 1. هوك جلب بيانات السلة
// ==========================================
export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) {
        if (res.status === 401) return null; // لو العميل مش مسجل دخول
        throw new Error("Failed to fetch cart");
      }
      return res.json();
    },
  });
};

// ==========================================
// 2. هوك إضافة المنتجات للسلة
// ==========================================
export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      productId: string;
      quantity: number;
      size?: string;
    }) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    onSuccess: () => {
      // إجبار المتجر على إعادة جلب بيانات السلة فوراً بعد الإضافة
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("ADDED TO ARCHIVE", {
        style: { background: "black", color: "white", border: "none" },
      });
    },
    onError: () => {
      toast.error("FAILED TO ADD ITEM. PLEASE TRY AGAIN.");
    },
  });
};
