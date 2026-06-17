import { prisma } from "@/lib/prisma";
import ProductsList from "@/components/admin/products/ProductsList";

// ==========================================
// Types
// ==========================================

interface FormattedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default async function AdminProductsPage() {
  // Fetch products with category and first image
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Format data for Client Component
  const formattedProducts: FormattedProduct[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category.name,
    price: Number(product.price),
    stock: product.stock,
    image:
      product.images[0]?.url ||
      "https://api.dicebear.com/7.x/shapes/svg?seed=placeholder",
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return (
    <div className="w-full">
      <ProductsList products={formattedProducts} />
    </div>
  );
}
