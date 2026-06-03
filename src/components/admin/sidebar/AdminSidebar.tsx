"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Receipt,
  PieChart,
  Package,
  Settings,
  Plus,
  LogOut,
  Globe,
  Store,
} from "lucide-react";
import { useSidebar } from "@/providers/SidebarProvider";

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Orders", href: "/admin/orders", icon: Receipt },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Add Product", href: "/admin/add-product", icon: Plus },
  { name: "Analytics", href: "/admin/analytics", icon: PieChart },
  { name: "Landing Page", href: "/", icon: Globe },
  { name: "Live Store", href: "/shop", icon: Store },
  { name: "Settings", href: "/admin/settings", icon: Settings },
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
        className={`fixed top-0 left-0 z-50 h-screen bg-white transition-all duration-300 overflow-hidden group
        ${isOpen ? "translate-x-0 w-[18rem]" : "-translate-x-full w-[18rem]"}
        lg:translate-x-0 lg:w-24 lg:hover:w-[18rem]
      `}
      >
        <div className="flex flex-col h-full w-full">
          <div className="flex h-20 items-center gap-2 mt-4 px-8 shrink-0">
            {/* اللوجو باللون البرتقالي */}
            <div className="w-8 h-8 bg-[#ff5c00] rounded-lg flex items-center justify-center text-white font-bold shrink-0">
              K
            </div>
            <h2
              className={`text-2xl font-bold text-[#363949] transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
            >
              KAL<span className="text-[#ff5c00]">T</span>
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
                  className={`flex items-center gap-4 px-8 py-4 h-14 relative transition-all duration-300
                    ${
                      isActive
                        ? "text-[#ff5c00] font-bold"
                        : "text-[#7d8da1] hover:text-[#ff5c00] lg:hover:ml-4"
                    }`}
                >
                  {/* الشريط الجانبي البرتقالي */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1.5 bg-[#ff5c00] rounded-r-md"></span>
                  )}

                  <Icon
                    className={`w-6 h-6 shrink-0 transition-all duration-300 ${isActive ? "lg:ml-2" : ""}`}
                  />

                  <span
                    className={`font-medium text-[1.1rem] transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mb-8 mt-4">
            <button className="flex items-center gap-4 px-8 py-4 h-14 text-[#7d8da1] hover:text-[#ff5c00] transition-all duration-300 lg:hover:ml-4 w-full">
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
