import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

// ==========================================
// 1. Query Key Factory
// ==========================================
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (categorySlug: string | undefined, page: number) =>
    [...productKeys.lists(), { categorySlug, page }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// ==========================================
// 2. Hooks
// ==========================================
export const useProducts = (categorySlug: string | undefined, page: number) => {
  return useQuery({
    queryKey: productKeys.list(categorySlug, page),
    queryFn: async () => {
      const url = categorySlug
        ? `/api/products?category=${categorySlug}&page=${page}`
        : `/api/products?page=${page}`;

      const response = await axios.get(url);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    },
    enabled: !!productId,
  });
};
