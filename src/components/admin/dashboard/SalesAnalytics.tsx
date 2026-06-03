import { ShoppingCart, ShoppingBag, UserPlus, Plus } from "lucide-react";

export function SalesAnalytics() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-foreground mb-4">
        Sales Analytics
      </h2>

      <div className="flex flex-col gap-4">
        {/* Item 1 */}
        <div className="bg-card p-4 rounded-3xl shadow-sm border border-border/50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-foreground">
                ONLINE ORDERS
              </h3>
              <p className="text-xs text-muted-foreground">Last 24 Hours</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-bold text-sm">+39%</span>
              <span className="font-black text-foreground">3849</span>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-card p-4 rounded-3xl shadow-sm border border-border/50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-[var(--color-danger-egator)]/10 rounded-full text-[var(--color-danger-egator)] shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-foreground">
                OFFLINE ORDERS
              </h3>
              <p className="text-xs text-muted-foreground">Last 24 Hours</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-red-500 font-bold text-sm">-17%</span>
              <span className="font-black text-foreground">1100</span>
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div className="bg-card p-4 rounded-3xl shadow-sm border border-border/50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-[var(--color-success-egator)]/10 rounded-full text-[var(--color-success-egator)] shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-foreground">
                NEW CUSTOMER
              </h3>
              <p className="text-xs text-muted-foreground">Last 24 Hours</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-bold text-sm">+25%</span>
              <span className="font-black text-foreground">849</span>
            </div>
          </div>
        </div>

        {/* Add Product Button */}
        <button className="mt-2 flex items-center justify-center gap-2 w-full p-4 rounded-3xl border-2 border-dashed border-primary/50 text-primary font-bold hover:bg-primary hover:text-white transition-colors">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>
    </div>
  );
}
