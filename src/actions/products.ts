"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ProductFormValues } from "@/lib/validations/product";
import { randomBytes } from "crypto";

export async function createProduct(data: ProductFormValues) {
  // 1. التأكد من الصلاحيات
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // 2. عمل Slug فريد تماماً (استخدام randomBytes لضمان عدم التكرار نهائياً)
  const baseSlug = data.name.trim().toLowerCase().replace(/\s+/g, "-");
  const uniqueSuffix = randomBytes(4).toString("hex"); // كود عشوائي قصير جداً
  const slug = `${baseSlug}-${uniqueSuffix}`;

  // 3. إضافة المنتج بالصور في عملية واحدة
  try {
    await prisma.product.create({
      data: {
        name: data.name,
        slug,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        sizes: data.sizes,
        colors: data.colors,
        images: {
          createMany: {
            data: data.images.map((img) => ({ url: img.url })),
          },
        },
      },
    });

    // 4. تحديث الصفحة عشان تظهر البيانات الجديدة
    revalidatePath("/admin/products");

    // الحل النهائي: إرجاع كائن بسيط ومباشر قابل للقراءة في جانب العميل
    return { success: true };
  } catch (error) {
    console.error("Prisma Create Error:", error);
    throw new Error(
      "Failed to create product. Check unique constraints or database connection.",
    );
  }
}
