import Image from "next/image";

interface OrderItem {
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  status: string;
  createdAt: Date;
  user?: { name: string | null; image?: string | null } | null;
  orderItems: OrderItem[];
}

interface RecentUpdatesProps {
  recentOrders: Order[];
}

export function RecentUpdates({ recentOrders }: RecentUpdatesProps) {
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(date).getTime()) / 1000,
    );

    if (diffInSeconds < 60) return `Just now`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} Minutes Ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} Hours Ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} Days Ago`;
  };

  const getActionText = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "placed a new order for";
      case "DELIVERED":
        return "received their order of";
      case "CANCELLED":
      case "DECLINED":
        return "cancelled their order of";
      case "SHIPPED":
        return "has order shipped for";
      default:
        return "updated their order of";
    }
  };

  const displayOrders = recentOrders.slice(0, 3);

  return (
    <div>
      <h2 className="text-xl font-bold text-[#363949] dark:text-[#edeffd] mb-4 transition-colors">
        Recent Updates
      </h2>
      <div className="bg-white dark:bg-[#202528] p-6 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300">
        <div className="flex flex-col gap-6">
          {displayOrders.length === 0 ? (
            <p className="text-center text-sm text-[#7d8da1]">
              No recent updates.
            </p>
          ) : (
            displayOrders.map((order) => {
              const customerName = order.user?.name || "Guest";
              const customerImage = order.user?.image;
              const productName =
                order.orderItems?.[0]?.product?.name || "Product";
              const actionText = getActionText(order.status);
              const timeAgo = getRelativeTime(order.createdAt);

              const initial = customerName.charAt(0).toUpperCase();

              return (
                <div key={order.id} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#7380ec]/10 flex items-center justify-center transition-colors">
                    {customerImage ? (
                      <Image
                        src={customerImage}
                        alt={customerName}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-[#7380ec] font-bold text-lg">
                        {initial}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-[#363949] dark:text-[#edeffd] transition-colors leading-tight">
                      <span className="font-bold">{customerName}</span>{" "}
                      <span className="text-[#7d8da1] dark:text-zinc-400 transition-colors">
                        {actionText} {productName}.
                      </span>
                    </p>
                    <p className="text-xs text-[#7d8da1] dark:text-zinc-500 mt-1 transition-colors font-medium">
                      {timeAgo}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
