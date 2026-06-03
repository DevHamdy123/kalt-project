import { StatCards } from "@/components/admin/dashboard/StatCards";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RecentUpdates } from "@/components/admin/dashboard/RecentUpdates";
import { SalesAnalytics } from "@/components/admin/dashboard/SalesAnalytics";

export default function AdminDashboardPage() {
  return (
    <div className="pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {new Date().toLocaleDateString("en-EG", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
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
