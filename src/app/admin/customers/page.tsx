import { prisma } from "@/lib/prisma";
import { Users, Mail, Phone, ShoppingBag } from "lucide-react";

export default async function CustomersPage() {
  // 1. جلب كل الطلبات مع بيانات المستخدمين المرتبطة بيها
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

  // 2. تجميع البيانات لاستخراج قائمة العملاء (مسجلين أو زوار)
  const customersMap = new Map();

  orders.forEach((order) => {
    // المفتاح هيكون كود المستخدم لو مسجل، أو رقم التليفون لو زائر
    const customerKey = order.userId || order.phone;

    if (!customersMap.has(customerKey)) {
      customersMap.set(customerKey, {
        id: customerKey,
        name: order.user?.name || "Guest User",
        email: order.user?.email || "N/A",
        phone: order.phone,
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: order.createdAt,
      });
    }

    // تحديث إحصائيات العميل مع كل طلب جديد له
    const customer = customersMap.get(customerKey);
    customer.totalOrders += 1;
    customer.totalSpent += Number(order.totalPrice);
  });

  // تحويل الـ Map لمصفوفة عشان نقدر نعرضها في الجدول
  const customers = Array.from(customersMap.values());

  return (
    <div className="w-full pb-12 px-4 md:px-0 font-sans">
      {/* هيدر الصفحة */}
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

      {/* جدول العملاء */}
      <div className="bg-white dark:bg-[#202528] rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] transition-all overflow-hidden">
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
                customers.map((customer, index) => (
                  <tr
                    key={index}
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
                        <ShoppingBag className="w-4 h-4 text-[#7380ec]" />
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
    </div>
  );
}
