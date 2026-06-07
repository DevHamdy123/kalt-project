import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Calendar,
  User,
  Package,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. استخراج الـ id الخاص بالطلب وانتظار الـ Promise
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // 2. جلب بيانات الطلب بالتفصيل مع المستخدم والمنتجات وصورها
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      orderItems: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  // لو الطلب مش موجود في الداتا بيز
  if (!order) {
    notFound();
  }

  // دالة لتحديد لون بادج الحالة
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-[#ffbb55]/10 text-[#ffbb55]";
      case "PROCESSING":
        return "bg-[#7380ec]/10 text-[#7380ec]";
      case "SHIPPED":
        return "bg-[#b388ff]/10 text-[#b388ff]";
      case "DELIVERED":
        return "bg-[#41f1b6]/10 text-[#41f1b6]";
      case "CANCELLED":
        return "bg-[#ff7782]/10 text-[#ff7782]";
      default:
        return "bg-zinc-100 text-zinc-500";
    }
  };

  return (
    <div className="w-full pb-12 px-4 md:px-0 font-sans">
      {/* زرار الرجوع والخلفية */}
      <div className="mb-8">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#7d8da1] hover:text-[#7380ec] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#363949] dark:text-[#edeffd] transition-colors">
              Order Details
            </h1>
            <p className="text-sm text-[#7d8da1] dark:text-zinc-400 transition-colors mt-1">
              ID // {order.id}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* العمود الأيسر: محتويات الطلب (المنتجات) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#202528] rounded-[1.5rem] p-6 shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] transition-all">
            <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#7380ec]" /> Order Items
            </h3>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex items-center gap-4 first:pt-0 last:pb-0"
                >
                  <div className="w-16 h-20 bg-[#f6f6f9] dark:bg-[#181a1e] rounded-xl relative shrink-0 overflow-hidden flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
                    {item.product.images[0]?.url ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-zinc-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#363949] dark:text-[#edeffd] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#7d8da1] dark:text-zinc-400 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#363949] dark:text-[#edeffd]">
                      USD {Number(item.product.price) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* الحساب الإجمالي للفاتورة */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 mt-6 pt-6 flex justify-between items-center">
              <span className="font-bold text-[#363949] dark:text-[#edeffd]">
                Total Amount
              </span>
              <span className="text-xl font-black text-[#7380ec]">
                USD {Number(order.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* العمود الأيمن: بيانات العميل والشحن */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#202528] rounded-[1.5rem] p-6 shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] transition-all">
            <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#7380ec]" /> Customer Info
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-[#7d8da1] dark:text-zinc-400 uppercase tracking-wider block">
                  Name
                </span>
                <span className="font-semibold text-[#363949] dark:text-[#edeffd]">
                  {order.user?.name || "Guest User"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#7d8da1] dark:text-zinc-400 uppercase tracking-wider block">
                  Email
                </span>
                <span className="text-sm text-[#363949] dark:text-[#edeffd] break-all">
                  {order.user?.email || "No Email Provided"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#202528] rounded-[1.5rem] p-6 shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] transition-all">
            <h3 className="text-lg font-bold text-[#363949] dark:text-[#edeffd] mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#7380ec]" /> Shipping Details
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-[#7d8da1] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#7d8da1] dark:text-zinc-400 uppercase tracking-wider block">
                    Phone
                  </span>
                  <span className="text-sm font-semibold text-[#363949] dark:text-[#edeffd]">
                    {order.phone}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#7d8da1] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#7d8da1] dark:text-zinc-400 uppercase tracking-wider block">
                    Address
                  </span>
                  <p className="text-sm text-[#363949] dark:text-[#edeffd] leading-relaxed">
                    {order.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Calendar className="w-4 h-4 text-[#7d8da1] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#7d8da1] dark:text-zinc-400 uppercase tracking-wider block">
                    Order Date
                  </span>
                  <span className="text-sm text-[#363949] dark:text-[#edeffd]">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
