import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/products/ProductForm";

// ==========================================
// Types
// ==========================================

interface Category {
  id: string;
  name: string;
}

interface FormattedProduct {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  stock: number;
  sizes: string[];
  colors: string[];
  images: { url: string }[];
}

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  // Fetch product and categories concurrently
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
      },
    }),
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }) as Promise<Category[]>,
  ]);

  if (!product) {
    notFound();
  }

  // Formatting product data for the form
  const formattedProduct: FormattedProduct = {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    price: Number(product.price),
    stock: product.stock,
    sizes: product.sizes as string[],
    colors: product.colors as string[],
    images: product.images.map((img) => ({ url: img.url })),
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#363949] dark:text-[#edeffd] transition-colors">
          Edit Product
        </h1>
        <p className="text-sm text-[#7d8da1] dark:text-zinc-400 transition-colors mt-1">
          Update your product details and inventory.
        </p>
      </div>

      <ProductForm categories={categories} initialData={formattedProduct} />
    </div>
  );
}
