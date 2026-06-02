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
    if (latest > previous && latest > 80) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
  });

  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: customEase }}
        // التعديل هنا: استخدمنا flex justify-between بدل Grid
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-4 md:px-8 py-4 border-b border-black/5"
      >
        {/* القسم الأيسر: القائمة الجانبية */}
        <div className="flex z-10">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 border border-black/10 text-black"
          >
            <Menu size={18} strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* القسم الأوسط: اللوجو (توسيط مطلق لا يتأثر بالعناصر الأخرى) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0, ease: customEase }}
          >
            <Link href="/shop">
              <h2 className="font-black text-xl md:text-2xl tracking-tighter uppercase text-black/90 select-none cursor-pointer">
                KALT
              </h2>
            </Link>
          </motion.div>
        </div>

        {/* القسم الأيمن: الأيقونات التفاعلية والبحث */}
        <div className="flex z-10">
          <NavActions />
        </div>
      </motion.header>
    </>
  );
}
