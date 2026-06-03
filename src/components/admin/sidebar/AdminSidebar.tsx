"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Receipt,
  PieChart,
  MessageSquare,
  Package,
  AlertCircle,
  Settings,
  Plus,
  LogOut,
} from "lucide-react";
import { useSidebar } from "@/providers/SidebarProvider";

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Orders", href: "/admin/orders", icon: Receipt },
  { name: "Analytics", href: "/admin/analytics", icon: PieChart },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
    badge: "26",
  },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Reports", href: "/admin/reports", icon: AlertCircle },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Add Product", href: "/admin/add-product", icon: Plus },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-all"
          onClick={toggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-card border-r border-border/50 transition-all duration-300 overflow-hidden group
        ${isOpen ? "translate-x-0 w-[18rem]" : "-translate-x-full w-[18rem]"}
        lg:translate-x-0 lg:w-24 lg:hover:w-[18rem]
      `}
      >
        <div className="flex flex-col h-full w-full">
          {/* تعديل اللوجو: استخدمنا bg-foreground و text-background */}
          <div className="flex h-20 items-center gap-2 mt-4 px-8 shrink-0">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center text-background font-bold shrink-0">
              K
            </div>
            <h2
              className={`text-2xl font-bold text-foreground transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
            >
              KALT
            </h2>
          </div>

          <nav className="flex-1 mt-8 flex flex-col gap-2 relative overflow-y-auto no-scrollbar">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  /* تعديل ألوان الروابط لتكون أبيض وأسود فقط */
                  className={`flex items-center gap-4 px-8 py-4 h-14 relative transition-all duration-300
                    ${
                      isActive
                        ? "text-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground lg:hover:ml-4"
                    }`}
                >
                  {/* تعديل الخط الجانبي النشط ليكون foreground */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1.5 bg-foreground rounded-r-md"></span>
                  )}

                  <Icon
                    className={`w-6 h-6 shrink-0 transition-all duration-300 ${isActive ? "lg:ml-2" : ""}`}
                  />

                  <span
                    className={`font-medium text-[1.1rem] transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
                  >
                    {link.name}
                  </span>

                  {link.badge && (
                    <span
                      className={`ml-auto bg-[var(--color-danger-egator)] text-white text-xs font-bold px-2 py-1 rounded-lg transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mb-8 mt-4">
            <button className="flex items-center gap-4 px-8 py-4 h-14 text-muted-foreground hover:text-foreground transition-all duration-300 lg:hover:ml-4 w-full">
              <LogOut className="w-6 h-6 shrink-0" />
              <span
                className={`font-medium text-[1.1rem] transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
