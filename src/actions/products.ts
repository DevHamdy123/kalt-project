"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // تأكد إن المسار ده متوافق مع مشروعك
import { revalidatePath } from "next/cache";

// استدعاء النوع من ملف الـ Schema مباشرة
import { ProductFormValues } from "@/lib/validations/product";

export async function createProduct(data: ProductFormValues) {
  // 1. التأكد من الصلاحيات
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // 2. عمل Slug بسيط للاسم (مع معالجة المسافات المتعددة)
  const slug = data.name.trim().toLowerCase().replace(/\s+/g, "-");

  // 3. إضافة المنتج بالصور في عملية واحدة
  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      price: data.price,
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
  return product;
}
