import ProductsList from "@/components/admin/products/ProductsList";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  // جلب المنتجات من الداتا بيز مع الأقسام والصور
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

  // تنسيق البيانات (تحويل Decimal لـ Number والتاريخ لـ String)
  const formattedProducts = products.map((product) => ({
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

  // الخطوة الأمنية الأخيرة لمنع تداخل كائنات الـ Decimal المعقدة
  const safeProducts = JSON.parse(JSON.stringify(formattedProducts));

  return (
    <div className="w-full">
      <ProductsList products={safeProducts} />
    </div>
  );
}
