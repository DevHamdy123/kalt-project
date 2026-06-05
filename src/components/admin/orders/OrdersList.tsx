"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/actions/orders";
import { OrderStatus } from "@prisma/client";
import { Eye, Package } from "lucide-react";
import Link from "next/link";

// تعريف شكل البيانات بعد تنسيقها
export type FormattedOrderType = {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: string;
  user: { name: string | null; email: string | null } | null;
  orderItems: any[];
};

export default function OrdersList({
  orders,
}: {
  orders: FormattedOrderType[];
}) {
  const [isPending, startTransition] = useTransition();

  // دالة تغيير حالة الطلب
  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      try {
        await updateOrderStatus(id, newStatus as OrderStatus);
      } catch (error) {
        console.error(error);
        alert("Failed to update order status");
      }
    });
  };

  // دالة لتحديد لون البادج حسب حالة الطلب
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-[#ffbb55]/10 text-[#ffbb55]";
      case "PROCESSING":
        return "bg-[#7380ec]/10 text-[#7380ec]";
      case "SHIPPED":
        return "bg-[#b388ff]/10 text-[#b388ff]";
      case "DELIVERED":
        return "bg-[#41f1b6]/10 text-[#41f1b6]";
      case "CANCELLED":
        return "bg-[#ff7782]/10 text-[#ff7782]";
      default:
        return "bg-zinc-100 text-zinc-500";
    }
  };

  return (
    <div className="pb-12 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#363949] dark:text-[#edeffd] transition-colors">
            Orders
          </h1>
          <p className="text-sm text-[#7d8da1] dark:text-zinc-400 transition-colors mt-1">
            Manage customer orders and update their delivery status.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#202528] rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] transition-all duration-300 overflow-hidden">
        {/* تصميم الموبايل - بطاقات */}
        <div className="block md:hidden p-4 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-[#7d8da1] dark:text-zinc-400">
              No orders found yet.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#f6f6f9] dark:bg-[#181a1e] rounded-2xl p-4 border border-zinc-100 dark:border-[#313338] flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-[#313338] flex items-center justify-center text-[#363949] dark:text-[#edeffd]">
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#363949] dark:text-[#edeffd]">
                        {order.user?.name || "Guest User"}
                      </span>
                      <span className="text-xs text-[#7d8da1] dark:text-zinc-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#7d8da1] dark:text-zinc-400 text-sm font-medium">
                    Total
                  </span>
                  <span className="font-bold text-[#363949] dark:text-[#edeffd]">
                    USD {order.totalPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#7d8da1] dark:text-zinc-400 text-sm font-medium">
                    Status
                  </span>
                  <select
                    disabled={isPending}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`px-3 py-1 text-[11px] font-bold rounded-full cursor-pointer border-none outline-none appearance-none text-center ${getStatusBadge(order.status)}`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  {/* زرار لعرض تفاصيل الطلب مستقبلاً */}
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="p-2.5 rounded-lg text-[#7d8da1] hover:text-[#7380ec] bg-white dark:bg-[#202528] hover:bg-[#7380ec]/10 transition-colors border border-zinc-100 dark:border-[#313338] flex items-center justify-center w-full"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* تصميم الشاشات الكبيرة - جدول */}
        <div className="hidden md:block overflow-x-auto p-6">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#f6f6f9] dark:border-[#313338] text-[#363949] dark:text-[#edeffd] font-bold transition-colors">
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Items</th>
                <th className="py-4 px-4">Total</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-[#7d8da1] dark:text-zinc-400"
                  >
                    No orders found yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#f6f6f9] dark:border-[#313338] last:border-none text-[#7d8da1] dark:text-zinc-400 hover:bg-[#f6f6f9] dark:hover:bg-[#181a1e] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#363949] dark:text-[#edeffd]">
                          {order.user?.name || "Guest User"}
                        </span>
                        <span className="text-xs text-[#7d8da1] dark:text-zinc-400">
                          {order.user?.email || "No email"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      {order.orderItems.length} items
                    </td>
                    <td className="py-4 px-4 font-medium text-[#363949] dark:text-[#edeffd]">
                      USD {order.totalPrice}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        disabled={isPending}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className={`px-3 py-1.5 text-xs font-bold rounded-full cursor-pointer border-none outline-none ${getStatusBadge(order.status)}`}
                      >
                        <option value="PENDING" className="text-black">
                          PENDING
                        </option>
                        <option value="PROCESSING" className="text-black">
                          PROCESSING
                        </option>
                        <option value="SHIPPED" className="text-black">
                          SHIPPED
                        </option>
                        <option value="DELIVERED" className="text-black">
                          DELIVERED
                        </option>
                        <option value="CANCELLED" className="text-black">
                          CANCELLED
                        </option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="p-2 rounded-lg text-[#7d8da1] hover:text-[#7380ec] hover:bg-[#7380ec]/10 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
