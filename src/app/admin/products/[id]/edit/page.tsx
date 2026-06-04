import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/products/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. استخراج الـ id الخاص بالمنتج من الرابط
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // 2. جلب بيانات المنتج والأقسام مع بعض في نفس الوقت لتسريع الأداء
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    }),
    prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  // لو المنتج مش موجود، هنوجه المستخدم لصفحة 404
  if (!product) {
    notFound();
  }

  // 3. تنسيق البيانات عشان تناسب الفورم ونتجنب إيرور الـ Decimal
  const formattedProduct = {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    price: Number(product.price),
    stock: product.stock,
    sizes: product.sizes,
    colors: product.colors,
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

      {/* بنمرر الأقسام (categories) والبيانات المنسقة للفورم كـ initialData */}
      <ProductForm categories={categories} initialData={formattedProduct} />
    </div>
  );
}
