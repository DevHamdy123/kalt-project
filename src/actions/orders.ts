"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
// استيراد النوع الخاص بحالة الطلب من بريزما
import { OrderStatus } from "@prisma/client";

// دالة لجلب كل الطلبات للوحة التحكم
export async function getAdminOrders() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// دالة لتحديث حالة الطلب مع استخدام الـ Type الصحيح
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    // التحديث بدون استخدام any وبشكل آمن تماماً
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
      },
    });

    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw new Error("Failed to update order status");
  }
}
