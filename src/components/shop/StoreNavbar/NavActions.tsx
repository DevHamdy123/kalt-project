"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
// 1. استيراد أيقونة المتجر (Store)
import { User, Home, ShoppingCart, Search, Store } from "lucide-react";
import Link from "next/link";
// 2. استيراد usePathname لمعرفة الصفحة الحالية
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function NavActions() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // 3. قراءة المسار الحالي للتحقق من وجودنا في صفحة السلة
  const pathname = usePathname();
  const isCartPage = pathname === "/shop/cart";

  const customEase = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    setIsMounted(true);
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // 4. جعل بيانات الأيقونة الأولى ديناميكية
  const actionIcons = [
    {
      name: "dynamic-icon",
      // تتغير الأيقونة والرابط بناءً على الصفحة الحالية
      Icon: isCartPage ? Store : ShoppingCart,
      href: isCartPage ? "/shop" : "/shop/cart",
      delay: 0.4,
      // نخفي العداد إذا تحولت الأيقونة إلى المتجر
      hasBadge: !isCartPage,
      hideOnMobile: false,
    },
    {
      name: "home",
      Icon: Home,
      href: "/",
      delay: 0.5,
      hasBadge: false,
      hideOnMobile: true,
    },
    {
      name: "profile",
      Icon: User,
      href: "/profile",
      delay: 0.6,
      hasBadge: false,
      hideOnMobile: true,
    },
  ];

  return (
    <div className="flex justify-end items-center gap-2 md:gap-3">
      {/* 1. شريط البحث التفاعلي المتمدد */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
        className="flex items-center"
      >
        <motion.div
          layout
          className={`relative h-10 md:h-11 flex items-center rounded-full border overflow-hidden ${
            isSearchOpen
              ? "bg-white border-black/20 w-45 md:w-60"
              : "bg-white border-black/10 w-10 md:w-11 cursor-pointer hover:border-black hover:bg-black hover:text-white transition-colors duration-300"
          }`}
        >
          <input
            ref={inputRef}
            onBlur={() => setIsSearchOpen(false)}
            className={`absolute left-0 h-full w-full bg-transparent pl-4 pr-12 text-sm outline-none text-black ${
              isSearchOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            placeholder="Search..."
          />

          <button
            onClick={() => setIsSearchOpen(true)}
            className={`absolute right-0 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full z-10 transition-colors duration-300 ${
              isSearchOpen ? "text-black hover:bg-black/5" : "text-current"
            }`}
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
        </motion.div>
      </motion.div>

      {/* 2. باقي الأيقونات */}
      {actionIcons.map((item, idx) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: item.delay, ease: customEase }}
          className={item.hideOnMobile ? "hidden md:block" : "block"}
        >
          <Link
            href={item.href}
            className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-300 border border-black/10 text-black group hover:scale-105"
          >
            <item.Icon size={18} strokeWidth={1.5} />

            {/* 5. عرض عداد الكمية للأيقونة الديناميكية (السلة) فقط */}
            {isMounted &&
              item.hasBadge &&
              item.name === "dynamic-icon" &&
              totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-[#b91c1c] text-white text-[10px] font-bold rounded-full border border-white flex items-center justify-center px-1 shadow-sm transition-colors duration-300 group-hover:border-black">
                  {totalItems}
                </span>
              )}

            {/* في حالة وجود Badge لأيقونات أخرى مستقبلاً */}
            {isMounted && item.hasBadge && item.name !== "dynamic-icon" && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:border-black transition-colors duration-300"></span>
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
