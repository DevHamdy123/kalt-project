"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// تعريف شكل البيانات اللي جاية من السلة
type CheckoutData = {
  items: {
    id: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  phone: string;
  address: string;
};

export async function createCheckoutOrder(data: CheckoutData) {
  try {
    // 1. التحقق من وجود مستخدم مسجل الدخول (اختياري)
    const session = await getServerSession(authOptions);

    // 2. استخراج كود المستخدم لو موجود
    // لو مش موجود، هيكون null وده مسموح بيه في الـ Schema بتاعتك للزوار
    const userId = session?.user?.id || null;

    // 3. إنشاء الطلب في قاعدة البيانات مع المنتجات الخاصة بيه
    const order = await prisma.order.create({
      data: {
        totalPrice: data.totalPrice,
        phone: data.phone,
        address: data.address,
        userId: userId,
        // إنشاء المنتجات داخل نفس الطلب
        orderItems: {
          create: data.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            // لو ضفت المقاس واللون في السلة بعدين، تقدر تمررهم هنا
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Checkout Error:", error);
    throw new Error("Failed to create order");
  }
}
