import { prisma } from "@/lib/prisma";
import { Users, Mail, Phone, ShoppingBag, Calendar } from "lucide-react";

// ==========================================
// Types
// ==========================================

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
}

export default async function CustomersPage() {
  // Fetch orders with user relation
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Aggregate customer data
  const customersMap = new Map<string, Customer>();

  orders.forEach((order) => {
    const customerKey = order.userId || order.phone;

    if (!customersMap.has(customerKey)) {
      customersMap.set(customerKey, {
        id: customerKey,
        name: order.user?.name || "Guest User",
        email: order.user?.email || "N/A",
        phone: order.phone ?? "N/A",
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: order.createdAt,
      });
    }

    const customer = customersMap.get(customerKey)!;
    customer.totalOrders += 1;
    customer.totalSpent += Number(order.totalPrice);
  });

  const customers = Array.from(customersMap.values());

  return (
    <div className="w-full pb-12 px-4 md:px-0 font-sans">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#363949] dark:text-[#edeffd] transition-colors flex items-center gap-3">
            <Users className="text-[#7380ec]" /> Customers
          </h1>
          <p className="text-sm text-[#7d8da1] dark:text-zinc-400 transition-colors mt-1">
            Manage your store customers and view their purchase history.
          </p>
        </div>
        <div className="bg-white dark:bg-[#202528] px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-[#7380ec]">
          Total Customers: {customers.length}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-[#202528] rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] transition-all overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <th className="py-5 px-6 text-sm font-bold text-[#363949] dark:text-[#edeffd]">
                  Customer
                </th>
                <th className="py-5 px-6 text-sm font-bold text-[#363949] dark:text-[#edeffd]">
                  Contact
                </th>
                <th className="py-5 px-6 text-sm font-bold text-[#363949] dark:text-[#edeffd]">
                  Orders
                </th>
                <th className="py-5 px-6 text-sm font-bold text-[#363949] dark:text-[#edeffd]">
                  Total Spent
                </th>
                <th className="py-5 px-6 text-sm font-bold text-[#363949] dark:text-[#edeffd]">
                  Last Order
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-[#7d8da1] dark:text-zinc-500"
                  >
                    No customers found yet.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-zinc-50 dark:hover:bg-[#181a1e] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#7380ec]/10 flex items-center justify-center text-[#7380ec] font-bold">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#363949] dark:text-[#edeffd]">
                            {customer.name}
                          </p>
                          {customer.name === "Guest User" && (
                            <span className="text-[10px] uppercase tracking-widest text-[#ffbb55] bg-[#ffbb55]/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                              Guest
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-[#7d8da1] dark:text-[#edeffd]">
                          <Phone className="w-3 h-3" /> {customer.phone}
                        </div>
                        {customer.email !== "N/A" && (
                          <div className="flex items-center gap-2 text-xs text-[#7d8da1] dark:text-zinc-500">
                            <Mail className="w-3 h-3" /> {customer.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 font-bold text-[#363949] dark:text-[#edeffd]">
                        <ShoppingBag className="w-4 h-4 text-[#7380ec]" />{" "}
                        {customer.totalOrders}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-black text-[#41f1b6]">
                        ${customer.totalSpent.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#7d8da1] dark:text-zinc-400">
                      {new Date(customer.lastOrderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {customers.length === 0 ? (
          <div className="bg-white dark:bg-[#202528] p-8 text-center rounded-[1.5rem] shadow-sm text-[#7d8da1]">
            No customers found yet.
          </div>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white dark:bg-[#202528] rounded-[1.5rem] p-5 shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] transition-all"
            >
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-full bg-[#7380ec]/10 flex items-center justify-center text-[#7380ec] font-bold text-xl shrink-0">
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#363949] dark:text-[#edeffd]">
                    {customer.name}
                  </h3>
                  {customer.name === "Guest User" && (
                    <span className="text-[10px] uppercase tracking-widest text-[#ffbb55] bg-[#ffbb55]/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                      Guest
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-[#7d8da1] dark:text-[#edeffd]">
                    <div className="p-2 rounded-lg bg-[#7380ec]/10 text-[#7380ec]">
                      <Phone className="w-4 h-4" />
                    </div>
                    {customer.phone}
                  </div>
                  {customer.email !== "N/A" && (
                    <div className="flex items-center gap-3 text-sm text-[#7d8da1] dark:text-zinc-400">
                      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      {customer.email}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 font-bold text-[#363949] dark:text-[#edeffd]">
                    <ShoppingBag className="w-5 h-5 text-[#ffbb55]" />{" "}
                    {customer.totalOrders} Orders
                  </div>
                  <div className="font-black text-[#41f1b6] text-xl">
                    ${customer.totalSpent.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-[#7d8da1] dark:text-zinc-500 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <Calendar className="w-4 h-4" /> Last Order:{" "}
                  {new Date(customer.lastOrderDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
