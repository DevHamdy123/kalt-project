import Link from "next/link";

// تعريف أنواع البيانات لتجنب أي أخطاء Types
interface OrderItem {
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  totalPrice: number | string;
  status: string;
  orderItems: OrderItem[];
}

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  // دالة لتحديد لون الحالة ديناميكياً
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "text-[#ffbb55]";
      case "DELIVERED":
        return "text-[#41f1b6]";
      case "DECLINED":
      case "CANCELLED":
        return "text-[#ff7782]";
      default:
        return "text-[#7380ec]"; // لون افتراضي للحالات الأخرى زي SHIPPED
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-[#363949] dark:text-[#edeffd] mb-4 transition-colors">
        Recent Orders
      </h2>

      <div className="bg-white dark:bg-[#202528] rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300 overflow-hidden">
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#f6f6f9] dark:border-[#313338] text-[#363949] dark:text-[#edeffd] font-bold transition-colors">
                <th className="py-4 px-4">Product Name</th>
                <th className="py-4 px-4">Order ID</th>
                <th className="py-4 px-4">Total</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#7d8da1]">
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  // استخراج اسم أول منتج في الطلب
                  const productName =
                    order.orderItems?.[0]?.product?.name || "Unknown Product";
                  const extraItems =
                    order.orderItems.length > 1
                      ? ` (+${order.orderItems.length - 1})`
                      : "";

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[#f6f6f9] dark:border-[#313338] last:border-none text-[#7d8da1] dark:text-zinc-400 hover:bg-[#f6f6f9] dark:hover:bg-[#181a1e] transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-[#363949] dark:text-[#edeffd] transition-colors max-w-[200px] truncate">
                        {productName} {extraItems}
                      </td>
                      <td className="py-4 px-4 uppercase">
                        {order.id.slice(-6)}
                      </td>
                      <td className="py-4 px-4 font-bold text-[#363949] dark:text-[#edeffd]">
                        ${Number(order.totalPrice).toFixed(2)}
                      </td>
                      <td
                        className={`py-4 px-4 font-bold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </td>
                      <td className="py-4 px-4 text-[#ff5c00] cursor-pointer font-medium hover:underline transition-colors">
                        <Link href={`/admin/orders/${order.id}`}>Details</Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-center border-t border-[#f6f6f9] dark:border-[#313338] transition-colors">
          <Link
            href="/admin/orders"
            className="text-[#ff5c00] font-medium hover:underline text-sm transition-colors"
          >
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
}
