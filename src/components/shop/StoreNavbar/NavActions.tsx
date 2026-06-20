"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Home,
  ShoppingCart,
  Store,
  LayoutDashboard,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfileDropdown from "@/components/common/nav-elements/ProfileDropdown";
import { useCartQuery } from "@/hooks/queries/useCartQuery";

// --- Type Definitions ---
interface CartItem {
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

interface NavLink {
  name: string;
  Icon: LucideIcon;
  href: string;
  hasBadge: boolean;
  hideOnMobile: boolean;
}

export default function NavActions() {
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const { data: cart } = useCartQuery();

  const totalItems = useMemo(() => {
    return (
      (cart as Cart | undefined)?.items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0,
      ) || 0
    );
  }, [cart]);

  const isAdmin =
    (session?.user as { role?: string } | undefined)?.role === "ADMIN";

  const pathname = usePathname();
  const isCartPage = pathname === "/shop/cart";
  const customEase = [0.22, 1, 0.36, 1] as const;

  const navLinks: NavLink[] = useMemo(() => {
    return [
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
  }, [isAdmin, isCartPage]);

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
            delay: 0.3 + idx * 0.1,
            ease: customEase,
          }}
          className={item.hideOnMobile ? "hidden md:block" : "block"}
        >
          <Link
            href={item.href}
            className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-300 border border-black/10 text-black group hover:scale-105"
          >
            <item.Icon size={16} strokeWidth={1.5} />

            <AnimatePresence>
              {isMounted && item.hasBadge && totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#b91c1c] text-white text-[0.625rem] font-bold rounded-full border border-white flex items-center justify-center px-1 shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
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
              className="w-11 h-11 rounded-full overflow-hidden border border-black/10 hover:scale-105 transition-all duration-300"
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={44}
                  height={44}
                  priority
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <div className="w-full h-full bg-black text-white flex items-center justify-center text-[0.75rem] font-bold">
                  {session?.user?.name?.[0] || "U"}
                </div>
              )}
            </button>
          ) : (
            <Link
              href="/login"
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-300 border border-black/10 text-black"
            >
              <User size={16} strokeWidth={1.5} />
            </Link>
          )}

          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </motion.div>
      </div>
    </div>
  );
}
