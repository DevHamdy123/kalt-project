import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

export function StatCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Card 1 */}
      <div className="bg-card p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            Total Sales
          </h3>
          <p className="text-3xl font-black text-foreground">$25,024</p>
          <p className="text-xs text-muted-foreground mt-4">Last 24 Hours</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-card p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-[var(--color-danger-egator)]/10 rounded-full text-[var(--color-danger-egator)]">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            Total Expenses
          </h3>
          <p className="text-3xl font-black text-foreground">$14,160</p>
          <p className="text-xs text-muted-foreground mt-4">Last 24 Hours</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-card p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-[var(--color-success-egator)]/10 rounded-full text-[var(--color-success-egator)]">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            Total Income
          </h3>
          <p className="text-3xl font-black text-foreground">$10,864</p>
          <p className="text-xs text-muted-foreground mt-4">Last 24 Hours</p>
        </div>
      </div>
    </div>
  );
}
