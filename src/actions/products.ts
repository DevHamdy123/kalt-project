"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ProductFormValues } from "@/lib/validations/product";
import { randomBytes } from "crypto";

const DEMO_EMAIL = "demo@kalt.com";

export async function createProduct(data: ProductFormValues) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user?.email === DEMO_EMAIL) {
    throw new Error("Modifications are not allowed during the demo stage.");
  }

  const baseSlug = data.name.trim().toLowerCase().replace(/\s+/g, "-");
  const uniqueSuffix = randomBytes(4).toString("hex");
  const slug = `${baseSlug}-${uniqueSuffix}`;

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

    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Prisma Create Error:", error);
    throw new Error(
      "Failed to create product. Check unique constraints or database connection.",
    );
  }
}

export async function deleteProduct(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user?.email === DEMO_EMAIL) {
    throw new Error("Deletion is not allowed during the demo stage.");
  }

  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete product.");
  }
}

export async function updateProduct(id: string, data: ProductFormValues) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user?.email === DEMO_EMAIL) {
    throw new Error("Modifications are not allowed during the demo stage.");
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        sizes: data.sizes,
        colors: data.colors,
        images: {
          deleteMany: {},
          createMany: {
            data: data.images.map((img) => ({ url: img.url })),
          },
        },
      },
    });

    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Prisma Update Error:", error);
    throw new Error("Failed to update product.");
  }
}
