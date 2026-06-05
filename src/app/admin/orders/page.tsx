import { getAdminOrders } from "@/actions/orders";
import OrdersList from "@/components/admin/orders/OrdersList";

export default async function AdminOrdersPage() {
  // 1. جلب البيانات من الداتا بيز
  const rawOrders = await getAdminOrders();

  // 2. تنسيق البيانات (Serialization)
  // الخطوة دي مهمة جداً عشان نحول الـ Decimal لأرقام والتواريخ لنصوص
  // عشان الـ Client Components متضربش إيرور في Next.js
  const formattedOrders = rawOrders.map((order) => ({
    id: order.id,
    status: order.status,
    totalPrice: Number(order.totalPrice),
    isPaid: order.isPaid,
    phone: order.phone,
    address: order.address,
    createdAt: order.createdAt.toISOString(),
    user: order.user,
    orderItems: order.orderItems,
  }));

  return (
    <div className="w-full">
      <OrdersList orders={formattedOrders} />
    </div>
  );
}
