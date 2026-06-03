const recentOrders = [
  {
    id: "85631",
    name: "Foldable Mini Drone",
    payment: "Due",
    status: "Pending",
    statusColor: "text-orange-400",
  },
  {
    id: "36378",
    name: "LARVENDER KF102 Drone",
    payment: "Refunded",
    status: "Declined",
    statusColor: "text-red-400",
  },
  {
    id: "49347",
    name: "Ruko F11 Pro Drone",
    payment: "Due",
    status: "Pending",
    statusColor: "text-orange-400",
  },
  {
    id: "96996",
    name: "Drone with Camera",
    payment: "Paid",
    status: "Delivered",
    statusColor: "text-green-400",
  },
  {
    id: "22821",
    name: "GPS 4k Drone",
    payment: "Paid",
    status: "Delivered",
    statusColor: "text-green-400",
  },
];

export function RecentOrders() {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Orders</h2>

      <div className="bg-card rounded-3xl shadow-sm border border-border/50 overflow-hidden">
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 text-foreground font-bold">
                <th className="py-4 px-4">Product Name</th>
                <th className="py-4 px-4">Product Number</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-border/20 last:border-none text-muted-foreground hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-foreground">
                    {order.name}
                  </td>
                  <td className="py-4 px-4">{order.id}</td>
                  <td className="py-4 px-4">{order.payment}</td>
                  <td className={`py-4 px-4 font-bold ${order.statusColor}`}>
                    {order.status}
                  </td>
                  <td className="py-4 px-4 text-primary cursor-pointer font-medium hover:underline">
                    Details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-center border-t border-border/50">
          <a
            href="#"
            className="text-primary font-medium hover:underline text-sm"
          >
            Show All
          </a>
        </div>
      </div>
    </div>
  );
}
