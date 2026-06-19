"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  // Fetch cart data with proper typing
  const { data: cart } = useCartQuery();

  // Safely calculate total quantity of items
  const totalItems =
    (cart as Cart | undefined)?.items.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0,
    ) || 0;

  // Check if current user is an admin
  const isAdmin =
    (session?.user as { role?: string } | undefined)?.role === "ADMIN";

  const pathname = usePathname();
  const isCartPage = pathname === "/shop/cart";
  const customEase = [0.22, 1, 0.36, 1] as const;

  // Build dynamic navigation links
  const navLinks: NavLink[] = [
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
            className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-300 border border-black/10 text-black group hover:scale-105"
          >
            <item.Icon size={14} strokeWidth={1.5} />

            {/* Show badge if item count is greater than 0 */}
            {isMounted && item.hasBadge && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-[#b91c1c] text-white text-[0.625rem] font-bold rounded-full border border-white flex items-center justify-center px-1 shadow-sm">
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
                <div className="w-full h-full bg-black text-white flex items-center justify-center text-[0.75rem] font-bold">
                  {session?.user?.name?.[0] || "U"}
                </div>
              )}
            </button>
          ) : (
            <Link
              href="/login"
              className="w-[2.5rem] h-[2.5rem] md:w-[2.75rem] md:h-[2.75rem] bg-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-300 border border-black/10 text-black"
            >
              <User size={14} strokeWidth={1.5} />
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
