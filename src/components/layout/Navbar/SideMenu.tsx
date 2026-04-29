"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { name: "Shop All", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "Product Anatomy", href: "#anatomy" },
  { name: "Our Philosophy", href: "#about" },
  { name: "Contact", href: "/contact" },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const customEase = [0.22, 1, 0.36, 1] as const;

  if (!mounted) return null;

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 pointer-events-none flex">
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
              {MENU_LINKS.map((link, i) => (
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
                    <span className="text-xl md:text-2xl font-medium uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-8">
              <button className="w-full bg-[#b91c1c] text-white py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:bg-red-700 transition-colors group active:scale-[0.98]">
                <LogOut size={20} />
                <span className="font-bold uppercase tracking-tight">
                  Log Out
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(menuContent, document.body);
}
