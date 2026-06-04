import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

export function StatCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Card 1 - Sales (Orange) */}
      <div className="bg-white dark:bg-[#202528] p-6 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-[#ff5c00]/10 rounded-full text-[#ff5c00]">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-1 transition-colors">
            Total Sales
          </h3>
          <p className="text-3xl font-black text-[#363949] dark:text-[#edeffd] transition-colors">
            $25,024
          </p>
          <p className="text-xs text-[#7d8da1] dark:text-zinc-400 mt-4 transition-colors">
            Last 24 Hours
          </p>
        </div>
      </div>

      {/* Card 2 - Expenses (Red) */}
      <div className="bg-white dark:bg-[#202528] p-6 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-[#ff7782]/10 rounded-full text-[#ff7782]">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-1 transition-colors">
            Total Expenses
          </h3>
          <p className="text-3xl font-black text-[#363949] dark:text-[#edeffd] transition-colors">
            $14,160
          </p>
          <p className="text-xs text-[#7d8da1] dark:text-zinc-400 mt-4 transition-colors">
            Last 24 Hours
          </p>
        </div>
      </div>

      {/* Card 3 - Income (Green) */}
      <div className="bg-white dark:bg-[#202528] p-6 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-[#41f1b6]/10 rounded-full text-[#41f1b6]">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-1 transition-colors">
            Total Income
          </h3>
          <p className="text-3xl font-black text-[#363949] dark:text-[#edeffd] transition-colors">
            $10,864
          </p>
          <p className="text-xs text-[#7d8da1] dark:text-zinc-400 mt-4 transition-colors">
            Last 24 Hours
          </p>
        </div>
      </div>
    </div>
  );
}
