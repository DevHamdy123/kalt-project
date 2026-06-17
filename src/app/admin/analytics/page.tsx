import { prisma } from "@/lib/prisma";
import { TrendingUp, Activity } from "lucide-react";
import SalesChart from "@/components/admin/Analytics/SalesChart";

// Types definition
interface ChartDataPoint {
  date: string;
  revenue: number;
}

export default async function AnalyticsPage() {
  // Fetching data
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "asc" },
  });

  // Aggregating sales by date
  const salesDataMap = new Map<string, number>();

  orders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const currentRevenue = salesDataMap.get(date) || 0;
    salesDataMap.set(date, currentRevenue + Number(order.totalPrice));
  });

  // Mapping to Chart Format
  const chartData: ChartDataPoint[] = Array.from(
    salesDataMap,
    ([date, revenue]) => ({
      date,
      revenue,
    }),
  );

  // Calculating total
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="w-full pb-12 px-4 md:px-0 font-sans">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#363949] dark:text-[#edeffd] transition-colors flex items-center gap-3">
            <Activity className="text-[#7380ec]" /> Analytics
          </h1>
          <p className="text-sm text-[#7d8da1] dark:text-zinc-400 transition-colors mt-1">
            Track your store revenue and performance over time.
          </p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-[#202528] rounded-[1.5rem] p-6 shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#41f1b6]" /> Revenue Overview
            </h3>
            <div className="text-right">
              <span className="block text-xs text-[#7d8da1] uppercase tracking-widest font-bold mb-1">
                Total Revenue
              </span>
              <span className="text-2xl font-black text-[#363949] dark:text-[#edeffd]">
                ${totalRevenue.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Chart Section */}
          {chartData.length > 0 ? (
            <SalesChart data={chartData} />
          ) : (
            <div className="h-[400px] w-full flex items-center justify-center text-[#7d8da1] font-bold uppercase tracking-widest">
              No Sales Data Available Yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
