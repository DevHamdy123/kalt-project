"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AuthButton from "./AuthButton";
import { useSession } from "next-auth/react";
// 1. بنستورد النوع الافتراضي بتاع الجلسة من المكتبة
import type { DefaultSession } from "next-auth";
// 2. بنعمل Interface مخصص بيورث خصائص اليوزر العادي وبنضيف عليه الـ role
type CustomUser = DefaultSession["user"] & {
  role?: string;
};
interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Cart", href: "/shop/cart" },
  { name: "All Archive", href: "/shop#shop-catalog" },
  {
    name: "Statement Pieces",
    href: "/shop?category=statement-pieces#shop-catalog",
  },
  {
    name: "Everyday Essentials",
    href: "/shop?category=everyday-essentials#shop-catalog",
  },
  {
    name: "Timeless Classics",
    href: "/shop?category=timeless-classics#shop-catalog",
  },
  {
    name: "Seasonal Drops",
    href: "/shop?category=seasonal-collections#shop-catalog",
  },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  // 3. بنحول اليوزر للنوع المخصص بتاعنا بشكل صريح وآمن (Type Casting)
  const user = session?.user as CustomUser | undefined;

  // 4. التايب سكريبت دلوقتي عارف إن فيه حاجة اسمها role وإنت في السليم
  const isAdmin = user?.role === "ADMIN";

  const activeLinks = isAdmin
    ? [{ name: "KALT  (Admin)", href: "/admin" }, ...MENU_LINKS]
    : MENU_LINKS;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  const customEase = [0.22, 1, 0.36, 1] as const;

  if (!mounted) return null;

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: customEase }}
            className="relative h-dvh w-[85vw] sm:w-[50vw] lg:w-[30vw] xl:w-[25vw] bg-white text-black shadow-2xl flex flex-col pointer-events-auto"
          >
            <div className="flex items-center justify-between p-6 md:p-8">
              <span className="font-bold text-sm tracking-tight">
                KALT | Live Style
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 md:px-12 gap-8">
              {activeLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center gap-4"
                  >
                    <span className="font-mono text-xs opacity-40">
                      0{i + 1}
                    </span>
                    <span
                      className={`text-xl md:text-2xl font-medium uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300 ${link.name.includes("Admin") ? "text-[#ff5c00]" : ""}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-8">
              <AuthButton />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(menuContent, document.body);
}
