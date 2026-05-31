import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = (categorySlug: string | undefined, page: number) => {
  return useQuery({
    queryKey: ["products", categorySlug, page],
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
