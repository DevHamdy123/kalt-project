const recentOrders = [
  {
    id: "85631",
    name: "Foldable Mini Drone",
    payment: "Due",
    status: "Pending",
    statusColor: "text-[#ffbb55]",
  },
  {
    id: "36378",
    name: "LARVENDER KF102 Drone",
    payment: "Refunded",
    status: "Declined",
    statusColor: "text-[#ff7782]",
  },
  {
    id: "49347",
    name: "Ruko F11 Pro Drone",
    payment: "Due",
    status: "Pending",
    statusColor: "text-[#ffbb55]",
  },
  {
    id: "96996",
    name: "Drone with Camera",
    payment: "Paid",
    status: "Delivered",
    statusColor: "text-[#41f1b6]",
  },
  {
    id: "22821",
    name: "GPS 4k Drone",
    payment: "Paid",
    status: "Delivered",
    statusColor: "text-[#41f1b6]",
  },
];

export function RecentOrders() {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-[#363949] mb-4">Recent Orders</h2>

      <div className="bg-white rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none transition-shadow overflow-hidden">
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#f6f6f9] text-[#363949] font-bold">
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
                  className="border-b border-[#f6f6f9] last:border-none text-[#7d8da1] hover:bg-[#f6f6f9] transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-[#363949]">
                    {order.name}
                  </td>
                  <td className="py-4 px-4">{order.id}</td>
                  <td className="py-4 px-4">{order.payment}</td>
                  <td className={`py-4 px-4 font-bold ${order.statusColor}`}>
                    {order.status}
                  </td>
                  <td className="py-4 px-4 text-[#ff5c00] cursor-pointer font-medium hover:underline">
                    Details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-center border-t border-[#f6f6f9]">
          <a
            href="#"
            className="text-[#ff5c00] font-medium hover:underline text-sm"
          >
            Show All
          </a>
        </div>
      </div>
    </div>
  );
}
