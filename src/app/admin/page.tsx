import { prisma } from "@/lib/prisma";
import { StatCards } from "@/components/admin/dashboard/StatCards";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RecentUpdates } from "@/components/admin/dashboard/RecentUpdates";
import { SalesAnalytics } from "@/components/admin/dashboard/SalesAnalytics";

// ==========================================
// Types
// ==========================================

interface OrderItem {
  id: string;
  product: {
    name: string;
  };
}

interface DashboardOrder {
  id: string;
  totalPrice: number;
  userId: string | null;
  phone: string;
  createdAt: Date;
  status: string;
  user: { name: string | null } | null;
  orderItems: OrderItem[];
}

export default async function AdminDashboardPage() {
  // 1. Fetch raw data from Prisma
  const rawOrders = await prisma.order.findMany({
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

  // 2. Map and format data to match our DashboardOrder interface
  const allOrders: DashboardOrder[] = rawOrders.map((order) => ({
    id: order.id,
    totalPrice: Number(order.totalPrice),
    userId: order.userId,
    phone: order.phone,
    createdAt: order.createdAt,
    status: order.status,
    user: order.user ? { name: order.user.name } : null,
    orderItems: order.orderItems.map((item) => ({
      id: item.id,
      product: { name: item.product.name },
    })),
  }));

  // Calculate dashboard statistics
  const totalRevenue = allOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0,
  );

  const totalOrdersCount = allOrders.length;

  const uniqueCustomers = new Set(
    allOrders.map((order) => order.userId || order.phone),
  );
  const totalCustomersCount = uniqueCustomers.size;

  const recentOrdersData = allOrders.slice(0, 5);

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
        <div className="lg:col-span-2 space-y-8">
          <StatCards
            revenue={totalRevenue}
            ordersCount={totalOrdersCount}
            customersCount={totalCustomersCount}
          />
          <RecentOrders orders={recentOrdersData} />
        </div>

        <div className="lg:col-span-1">
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
