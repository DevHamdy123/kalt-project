"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

const DEMO_EMAIL = "demo@kalt.com";

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

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user?.email === DEMO_EMAIL) {
    throw new Error("Modifications are not allowed during the demo stage.");
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
      },
    });

    revalidatePath("/admin", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw new Error("Failed to update order status");
  }
}

// ==========================================
// Delete Order Action
// ==========================================
export async function deleteOrder(orderId: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user?.email === DEMO_EMAIL) {
    throw new Error("Deletion is not allowed during the demo stage.");
  }

  try {
    await prisma.order.delete({
      where: { id: orderId },
    });

    // مسح الكاش الجذري لكي تنقص العدادات في الصفحة الرئيسية فوراً بعد الحذف
    revalidatePath("/admin", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete order:", error);
    throw new Error("Failed to delete order");
  }
}
