import { ShoppingCart, ShoppingBag, UserPlus, Plus } from "lucide-react";
import Link from "next/link";

export function SalesAnalytics() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-[#363949] dark:text-[#edeffd] mb-4 transition-colors">
        Sales Analytics
      </h2>

      <div className="flex flex-col gap-4">
        {/* Item 1 - Orange */}
        <div className="bg-white dark:bg-[#202528] p-4 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300 flex items-center gap-4">
          <div className="p-3 bg-[#ff5c00]/10 rounded-full text-[#ff5c00] shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-[#363949] dark:text-[#edeffd] transition-colors">
                ONLINE ORDERS
              </h3>
              <p className="text-xs text-[#7d8da1] dark:text-zinc-400 transition-colors">
                Last 24 Hours
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#41f1b6] font-bold text-sm">+39%</span>
              <span className="font-black text-[#363949] dark:text-[#edeffd] transition-colors">
                3849
              </span>
            </div>
          </div>
        </div>

        {/* Item 2 - Red */}
        <div className="bg-white dark:bg-[#202528] p-4 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300 flex items-center gap-4">
          <div className="p-3 bg-[#ff7782]/10 rounded-full text-[#ff7782] shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-[#363949] dark:text-[#edeffd] transition-colors">
                OFFLINE ORDERS
              </h3>
              <p className="text-xs text-[#7d8da1] dark:text-zinc-400 transition-colors">
                Last 24 Hours
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#ff7782] font-bold text-sm">-17%</span>
              <span className="font-black text-[#363949] dark:text-[#edeffd] transition-colors">
                1100
              </span>
            </div>
          </div>
        </div>

        {/* Item 3 - Green */}
        <div className="bg-white dark:bg-[#202528] p-4 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300 flex items-center gap-4">
          <div className="p-3 bg-[#41f1b6]/10 rounded-full text-[#41f1b6] shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-[#363949] dark:text-[#edeffd] transition-colors">
                NEW CUSTOMER
              </h3>
              <p className="text-xs text-[#7d8da1] dark:text-zinc-400 transition-colors">
                Last 24 Hours
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#41f1b6] font-bold text-sm">+25%</span>
              <span className="font-black text-[#363949] dark:text-[#edeffd] transition-colors">
                849
              </span>
            </div>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="w-full">
          <Link
            href="/admin/products/new"
            className="mt-4 flex items-center justify-center gap-2 w-full p-4 rounded-[1.5rem] border-2 border-dashed border-[#ff5c00]/50 text-[#ff5c00] font-bold hover:bg-[#ff5c00] hover:text-white dark:hover:text-white transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
}
