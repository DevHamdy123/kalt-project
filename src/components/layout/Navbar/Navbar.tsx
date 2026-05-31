"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Search, Store, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SideMenu from "./SideMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const customEase = [0.22, 1, 0.36, 1] as const;

  // التركيز تلقائياً على حقل الإدخال عند تمدده
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // الأيقونات التفاعلية مع مساراتها وتأخير الأنيميشن
  const actionIcons = [
    { Icon: Store, href: "/shop", delay: 0.3 },
    { Icon: User, href: "/profile", delay: 0.4 },
  ];

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
          {/* 1. شريط البحث التفاعلي المتمدد */}
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

          {/* 2. أيقونة المتجر (ShoppingBag) والبروفايل (User) */}
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
        </div>
      </header>
    </>
  );
}
