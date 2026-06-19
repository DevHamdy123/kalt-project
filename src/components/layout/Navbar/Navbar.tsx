"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  Store,
  User,
  LayoutDashboard,
  ShoppingCart,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SideMenu from "@/components/common/nav-elements/SideMenu";
import ProfileDropdown from "@/components/common/nav-elements/ProfileDropdown";
import { useCartQuery } from "@/hooks/queries/useCartQuery";

interface ActionIcon {
  name: string;
  Icon: LucideIcon;
  href: string;
  delay: number;
  hasBadge: boolean;
}

interface CartItem {
  quantity: number;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  const { data: cartData } = useCartQuery();

  const totalItems =
    cartData?.items?.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0,
    ) || 0;

  const customEase = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const actionIcons: ActionIcon[] = [];

  if (isAdmin) {
    actionIcons.push({
      name: "dashboard",
      Icon: LayoutDashboard,
      href: "/admin",
      delay: 0.2,
      hasBadge: false,
    });
  }

  actionIcons.push({
    name: "cart",
    Icon: ShoppingCart,
    href: "/shop/cart",
    delay: 0.3,
    hasBadge: true,
  });

  actionIcons.push({
    name: "shop",
    Icon: Store,
    href: "/shop",
    delay: 0.4,
    hasBadge: false,
  });

  return (
    <>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <header className="w-full flex items-center justify-between relative z-20 pt-3">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
          className="flex-1 flex justify-start"
        >
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black"
          >
            <Menu size={14} strokeWidth={1.5} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0, ease: customEase }}
          className="flex-1 flex justify-center"
        >
          <h2 className="font-black text-xl md:text-2xl tracking-tighter uppercase text-black/90 -translate-y-1.5 md:-translate-y-2 select-none">
            KALT
          </h2>
        </motion.div>

        <div className="flex-1 flex justify-end gap-2 md:gap-3">
          {actionIcons.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: item.delay,
                ease: customEase,
              }}
            >
              <Link
                href={item.href}
                className="relative w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black group"
              >
                <item.Icon size={14} strokeWidth={1.5} />

                {/* Conditional badge based on server-side cart items count */}
                {isMounted && item.hasBadge && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-[#b91c1c] text-white text-[10px] font-bold rounded-full border border-white flex items-center justify-center px-1 shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: customEase }}
            className="relative"
          >
            {isLoggedIn ? (
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-white hover:scale-105 transition-all duration-300"
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
                className="w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black"
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
      </header>
    </>
  );
}
