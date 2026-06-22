"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus, deleteOrder } from "@/actions/orders";
import { OrderStatus } from "@prisma/client";
import { AlertTriangle, Eye, Package, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Define the structured shape of the order data
export type FormattedOrderType = {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: string;
  user: { name: string | null; email: string | null } | null;
  orderItems: unknown[];
};

export default function OrdersList({
  orders,
}: {
  orders: FormattedOrderType[];
}) {
  const [isPending, startTransition] = useTransition();
  // حالة جديدة لتخزين الـ ID الخاص بالطلب المراد حذفه (وعندما تكون القيمة null يختفي المودال)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  // Handle order status updates
  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      try {
        await updateOrderStatus(id, newStatus as OrderStatus);
        toast.success("Status updated successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update status");
      }
    });
  };

  const confirmDeletion = () => {
    if (!orderToDelete) return;

    startTransition(async () => {
      try {
        await deleteOrder(orderToDelete);
        toast.success("Order deleted successfully");
        setOrderToDelete(null);
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete order");
        setOrderToDelete(null);
      }
    });
  };

  // Determine badge styling based on order status
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
    <div className="pb-12 px-4 md:px-0 relative">
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
        {/* Mobile View - Card Layout */}
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
                    className={`px-3 py-1 text-[11px] font-bold rounded-full cursor-pointer border-none outline-none appearance-none text-center ${getStatusBadge(
                      order.status,
                    )}`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="p-2.5 rounded-lg text-[#7d8da1] hover:text-[#7380ec] bg-white dark:bg-[#202528] hover:bg-[#7380ec]/10 transition-colors border border-zinc-100 dark:border-[#313338] flex items-center justify-center flex-1 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>

                  <button
                    onClick={() => setOrderToDelete(order.id)}
                    disabled={isPending}
                    className="p-2.5 rounded-lg text-[#7d8da1] hover:text-red-500 bg-white dark:bg-[#202528] hover:bg-red-500/10 transition-colors border border-zinc-100 dark:border-[#313338] flex items-center justify-center px-3 cursor-pointer disabled:opacity-50"
                    title="Delete Order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View - Table Layout */}
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
                        className={`px-3 py-1.5 text-xs font-bold rounded-full cursor-pointer border-none outline-none ${getStatusBadge(
                          order.status,
                        )}`}
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
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="p-2 rounded-lg text-[#7d8da1] hover:text-[#7380ec] hover:bg-[#7380ec]/10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>

                        <button
                          onClick={() => setOrderToDelete(order.id)}
                          disabled={isPending}
                          className="p-2 rounded-lg text-[#7d8da1] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete Order"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* ======================================================== */}
      {/* // Custom Delete Confirmation Modal (Pop-up) */}
      {/* ======================================================== */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#202528] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 dark:border-[#313338] flex flex-col items-center text-center transform transition-all">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#363949] dark:text-[#edeffd] mb-2">
              Delete this Order?
            </h3>

            <p className="text-sm text-[#7d8da1] dark:text-zinc-400 mb-6 leading-relaxed">
              This action cannot be undone. This will permanently remove the
              order and its items from the database.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setOrderToDelete(null)}
                disabled={isPending}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-[#7d8da1] bg-zinc-100 dark:bg-[#181a1e] hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeletion}
                disabled={isPending}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
