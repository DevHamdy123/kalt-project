"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Home, ShoppingCart, Store, LayoutDashboard } from "lucide-react"; // تم إزالة Search
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfileDropdown from "@/components/common/nav-elements/ProfileDropdown";

export default function NavActions() {
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  // التحقق هل اليوزر ده أدمن ولا لأ بدون استخدام any
  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const pathname = usePathname();
  const isCartPage = pathname === "/shop/cart";
  const customEase = [0.22, 1, 0.36, 1] as const;

  // بناء القائمة ديناميكياً
  const navLinks = [
    ...(isAdmin
      ? [
          {
            name: "dashboard",
            Icon: LayoutDashboard,
            href: "/admin",
            hasBadge: false,
            hideOnMobile: false,
          },
        ]
      : []),
    {
      name: "shop",
      Icon: isCartPage ? Store : ShoppingCart,
      href: isCartPage ? "/shop" : "/shop/cart",
      hasBadge: !isCartPage,
      hideOnMobile: false,
    },
    {
      name: "home",
      Icon: Home,
      href: "/",
      hasBadge: false,
      hideOnMobile: true,
    },
  ];

  // تشغيل isMounted عشان الـ Hydration للعداد
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex justify-end items-center gap-2 md:gap-3">
      {navLinks.map((item, idx) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3 + idx * 0.1, // تم التعديل عشان يبدأ الأنيميشن فوراً من غير فجوات
            ease: customEase,
          }}
          className={item.hideOnMobile ? "hidden md:block" : "block"}
        >
          <Link
            href={item.href}
            className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-300 border border-black/10 text-black group hover:scale-105"
          >
            <item.Icon size={18} strokeWidth={1.5} />
            {isMounted && item.hasBadge && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-[#b91c1c] text-white text-[10px] font-bold rounded-full border border-white flex items-center justify-center px-1 shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
        </motion.div>
      ))}

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: customEase }}
        >
          {isLoggedIn ? (
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-black/10 hover:scale-105 transition-all duration-300"
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <div className="w-full h-full bg-black text-white flex items-center justify-center text-xs font-bold">
                  {session?.user?.name?.[0] || "U"}
                </div>
              )}
            </button>
          ) : (
            <Link
              href="/login"
              className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-300 border border-black/10 text-black"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}
        </motion.div>

        <ProfileDropdown
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </div>
    </div>
  );
}
