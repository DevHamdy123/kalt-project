"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type CheckoutData = {
  items: {
    id: string;
    quantity: number;
    price: number;
    size?: string;
  }[];
  totalPrice: number;
  phone: string;
  address: string;
};

// التعديل: حددنا الـ Return Type عشان الـ UI يعرف يتعامل معاه
export async function createCheckoutOrder(
  data: CheckoutData,
): Promise<{ success: boolean; orderId?: string; message?: string }> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) return { success: false, message: "Unauthorized" };

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    // الـ transaction هيفضل يرمي خطأ لو المخزون ناقص (عشان يعمل Rollback)
    // بس الكود اللي تحت (الـ catch) هيلقطه ويحوله لرد نظيف
    const result = await prisma.$transaction(async (tx) => {
      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.id },
          select: { stock: true },
        });

        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ID: ${item.id}`);
        }

        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      const order = await tx.order.create({
        data: {
          totalPrice: data.totalPrice,
          phone: data.phone,
          address: data.address,
          userId: userId,
          orderItems: {
            create: data.items.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              size: item.size,
            })),
          },
        },
      });

      if (cart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }

      return order;
    });

    return { success: true, orderId: result.id };
  } catch (error) {
    console.error("Checkout Error:", error);
    // بدل الـ throw، بنرجع Object فيه رسالة الخطأ
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create order",
    };
  }
}
