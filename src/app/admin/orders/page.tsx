import { getAdminOrders } from "@/actions/orders";
import OrdersList from "@/components/admin/orders/OrdersList";

// Valid order status types
type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

// Frontend order structure
interface FormattedOrder {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string | null;
  } | null;
  orderItems: unknown[];
}

export default async function AdminOrdersPage() {
  // Fetch orders from database
  const rawOrders = await getAdminOrders();

  // Serialize data for client components
  const formattedOrders: FormattedOrder[] = rawOrders.map((order) => ({
    id: order.id,
    status: order.status as OrderStatus,
    totalPrice: Number(order.totalPrice),
    isPaid: order.isPaid,
    phone: order.phone,
    address: order.address,
    createdAt: order.createdAt.toISOString(),
    user: order.user,
    orderItems: order.orderItems as unknown[],
  }));

  return (
    <div className="w-full">
      <OrdersList orders={formattedOrders} />
    </div>
  );
}
