import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ==========================================
// 1. Fetch Cart Hook
// ==========================================
export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) {
        // Return null if user is unauthorized
        if (res.status === 401) return null;
        throw new Error("Failed to fetch cart");
      }
      return res.json();
    },
  });
};

// ==========================================
// 2. Add To Cart Mutation Hook
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
      // Invalidate cart query to trigger a refetch of fresh cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
