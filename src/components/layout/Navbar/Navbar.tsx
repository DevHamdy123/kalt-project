"use client";
import { useState } from "react";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import SideMenu from "./SideMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const customEase = [0.22, 1, 0.36, 1] as const;
  const rightIcons = [Search, ShoppingBag, User];

  return (
    <>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <header className="w-full flex items-center justify-between relative z-20 pt-4">
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
          {rightIcons.map((Icon, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + idx * 0.1,
                ease: customEase,
              }}
              className="w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black"
            >
              <Icon size={18} strokeWidth={1.5} />
            </motion.button>
          ))}
        </div>
      </header>
    </>
  );
}
