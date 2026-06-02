"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Search, Store, User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react"; // 1. استيراد الـ session
import Image from "next/image"; // 2. استيراد Image
import SideMenu from "@/components/common/nav-elements/SideMenu";
import ProfileDropdown from "@/components/common/nav-elements/ProfileDropdown"; // 3. استيراد المنيو المشتركة

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // حالة المنيو

  const { data: session, status } = useSession(); // جلب بيانات الجلسة
  const isLoggedIn = status === "authenticated";

  const inputRef = useRef<HTMLInputElement>(null);
  const customEase = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // الأيقونات الأساسية (شيلنا منها الـ User عشان هنعمله لوحده)
  const actionIcons = [{ Icon: Store, href: "/shop", delay: 0.3 }];

  return (
    <>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <header className="w-full flex items-center justify-between relative z-20 pt-4">
        {/* زر القائمة الجانبية */}
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
            <Menu size={18} strokeWidth={1.5} />
          </button>
        </motion.div>

        {/* اللوجو */}
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

        {/* الأيقونات وشريط البحث */}
        <div className="flex-1 flex justify-end gap-2 md:gap-3">
          {/* البحث */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            className="flex items-center"
          >
            <motion.div
              layout
              className={`relative h-10 md:h-11 flex items-center rounded-full border overflow-hidden group ${
                isSearchOpen
                  ? "bg-white border-black/20 w-45 md:w-60"
                  : "bg-border-white border-white w-10 md:w-11 cursor-pointer hover:border-black hover:bg-black transition-colors duration-300"
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
                  isSearchOpen
                    ? "text-black hover:bg-black/5"
                    : "text-black group-hover:text-border-white"
                }`}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            </motion.div>
          </motion.div>

          {/* الأيقونات (Store) */}
          {actionIcons.map((item, idx) => (
            <motion.div
              key={idx}
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
                className="w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black"
              >
                <item.Icon size={18} strokeWidth={1.5} />
              </Link>
            </motion.div>
          ))}

          {/* أيقونة البروفايل (الديناميكية) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
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
                <User size={18} strokeWidth={1.5} />
              </Link>
            )}

            {/* استخدام الكومبوننت المشترك */}
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
