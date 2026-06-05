import { prisma } from "@/lib/prisma";
import { StatCards } from "@/components/admin/dashboard/StatCards";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RecentUpdates } from "@/components/admin/dashboard/RecentUpdates";
import { SalesAnalytics } from "@/components/admin/dashboard/SalesAnalytics";

export default async function AdminDashboardPage() {
  // 1. جلب كل الطلبات من الداتا بيز مترتبة من الأحدث للأقدم
  const allOrders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 2. حساب الإحصائيات الأساسية
  const totalRevenue = allOrders.reduce(
    (sum, order) => sum + Number(order.totalPrice),
    0,
  );
  const totalOrdersCount = allOrders.length;

  // حساب عدد العملاء الفريدين (باستخدام رقم التليفون أو كود المستخدم)
  const uniqueCustomers = new Set(
    allOrders.map((order) => order.userId || order.phone),
  );
  const totalCustomersCount = uniqueCustomers.size;

  // أحدث 5 طلبات للجدول
  const recentOrdersData = allOrders.slice(0, 5);

  // دالة صغيرة بتجيب تاريخ النهاردة وتنسقه بشكل شيك
  const currentDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#363949] dark:text-[#edeffd] transition-colors">
          Dashboard
        </h1>
        <p className="text-sm text-[#7d8da1] dark:text-zinc-400 transition-colors mt-1">
          {currentDate}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* الجزء الأيسر */}
        <div className="lg:col-span-2 space-y-8">
          <StatCards
            revenue={totalRevenue}
            ordersCount={totalOrdersCount}
            customersCount={totalCustomersCount}
          />
          <RecentOrders orders={recentOrdersData} />
        </div>

        {/* الجزء الأيمن */}
        <div className="lg:col-span-1">
          {/* هنمرر أحدث الطلبات عشان ناخد منها أسماء العملاء للتحديثات */}
          <RecentUpdates recentOrders={recentOrdersData} />
          <SalesAnalytics
            revenue={totalRevenue}
            ordersCount={totalOrdersCount}
            customersCount={totalCustomersCount}
          />
        </div>
      </div>
    </div>
  );
}
