"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import * as z from "zod";

// Runtime validation of what the browser sends. The client-side price and
// total are accepted by the type but never trusted: the total is recalculated
// on the server from the product prices stored in the database.
const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        quantity: z.number().int().positive(),
        size: z.string().optional(),
      }),
    )
    .min(1),
  phone: z.string().max(100),
  address: z.string().max(1000),
});

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

    const parsed = checkoutSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, message: "Invalid checkout data" };
    }
    const { items, phone, address } = parsed.data;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    // الـ transaction هيفضل يرمي خطأ لو المخزون ناقص (عشان يعمل Rollback)
    // بس الكود اللي تحت (الـ catch) هيلقطه ويحوله لرد نظيف
    const result = await prisma.$transaction(async (tx) => {
      // The real total, calculated from the database prices
      let serverTotal = new Prisma.Decimal(0);

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.id },
          select: { stock: true, price: true },
        });

        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ID: ${item.id}`);
        }

        serverTotal = serverTotal.add(product.price.mul(item.quantity));

        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      const order = await tx.order.create({
        data: {
          totalPrice: serverTotal,
          phone,
          address,
          userId: userId,
          orderItems: {
            create: items.map((item) => ({
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
