export type Role = "ADMIN" | "USER";

export interface ProductImage {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  isFeatured: boolean;
  category?: Category;
  images: ProductImage[];
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}
