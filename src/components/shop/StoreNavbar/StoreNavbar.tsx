"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";

import NavActions from "./NavActions";
import SideMenu from "@/components/common/nav-elements/SideMenu";

export default function StoreNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 80) setIsHidden(true);
    else if (latest < previous) setIsHidden(false);
  });

  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: customEase }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5"
        style={{ paddingRight: "var(--scrollbar-width, 0px)" }}
      >
        {/* Added this wrapper to maintain original Tailwind spacing without interference */}
        <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Left section: Navigation menu toggle */}
          <div className="flex flex-1 justify-start">
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 bg-white rounded-full cursor-pointer flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-all"
            >
              <Menu size={18} strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Center section: Brand logo */}
          <div className="flex flex-1 justify-center">
            <Link href="/shop" className="cursor-pointer">
              <h2 className="font-black text-xl md:text-2xl tracking-tighter uppercase text-black/90 whitespace-nowrap">
                KALT
              </h2>
            </Link>
          </div>

          {/* Right section: Search and user actions */}
          <div className="flex flex-1 justify-end">
            <NavActions />
          </div>
        </div>
      </motion.header>
    </>
  );
}
