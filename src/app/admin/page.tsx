import { StatCards } from "@/components/admin/dashboard/StatCards";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RecentUpdates } from "@/components/admin/dashboard/RecentUpdates";
import { SalesAnalytics } from "@/components/admin/dashboard/SalesAnalytics";

export default function AdminDashboardPage() {
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
        {/* المربع اللي ماسك العنوان والتاريخ */}
        <h1 className="text-3xl font-bold text-[#363949] dark:text-[#edeffd] transition-colors">
          Dashboard
        </h1>
        <p className="text-sm text-[#7d8da1] dark:text-zinc-400 transition-colors mt-1">
          {currentDate}
        </p>
      </div>

      {/* هنا استخدمنا Grid لتقسيم الشاشة:
        في الموبايل: عمود واحد 
        في الشاشات الكبيرة: 3 أعمدة
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* الجزء الأيسر (يأخذ عمودين من أصل 3) */}
        <div className="lg:col-span-2 space-y-8">
          <StatCards />
          <RecentOrders />
        </div>

        {/* الجزء الأيمن (يأخذ عمود واحد) */}
        <div className="lg:col-span-1">
          <RecentUpdates />
          <SalesAnalytics />
        </div>
      </div>
    </div>
  );
}
