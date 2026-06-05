import { BarChart3, ShoppingBag, Users } from "lucide-react";

// تعريف البيانات اللي الكومبوننت هيستقبلها
interface StatCardsProps {
  revenue: number;
  ordersCount: number;
  customersCount: number;
}

export function StatCards({
  revenue,
  ordersCount,
  customersCount,
}: StatCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Card 1 - Revenue (Orange) */}
      <div className="bg-white dark:bg-[#202528] p-6 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-[#ff5c00]/10 rounded-full text-[#ff5c00]">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-1 transition-colors">
            Total Revenue
          </h3>
          <p className="text-3xl font-black text-[#363949] dark:text-[#edeffd] transition-colors">
            ${revenue.toFixed(2)}
          </p>
          <p className="text-xs text-[#7d8da1] dark:text-zinc-400 mt-4 transition-colors">
            All Time Earnings
          </p>
        </div>
      </div>

      {/* Card 2 - Orders (Red) */}
      <div className="bg-white dark:bg-[#202528] p-6 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-[#ff7782]/10 rounded-full text-[#ff7782]">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-1 transition-colors">
            Total Orders
          </h3>
          <p className="text-3xl font-black text-[#363949] dark:text-[#edeffd] transition-colors">
            {ordersCount}
          </p>
          <p className="text-xs text-[#7d8da1] dark:text-zinc-400 mt-4 transition-colors">
            Processed Orders
          </p>
        </div>
      </div>

      {/* Card 3 - Customers (Green) */}
      <div className="bg-white dark:bg-[#202528] p-6 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-[#41f1b6]/10 rounded-full text-[#41f1b6]">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-1 transition-colors">
            Total Customers
          </h3>
          <p className="text-3xl font-black text-[#363949] dark:text-[#edeffd] transition-colors">
            {customersCount}
          </p>
          <p className="text-xs text-[#7d8da1] dark:text-zinc-400 mt-4 transition-colors">
            Unique Buyers
          </p>
        </div>
      </div>
    </div>
  );
}
