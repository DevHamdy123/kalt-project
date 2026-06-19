"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 lg:bottom-10 lg:left-10 z-[100] flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 border border-[#FF5E00]/50 rounded-full bg-[#FF5E00]/10 backdrop-blur-md text-[#FF5E00] hover:bg-[#FF5E00] hover:border-[#FF5E00] hover:text-white transition-all duration-500 group cursor-pointer shadow-[0_4px_20px_rgba(255,94,0,0.15)] hover:shadow-[0_4px_25px_rgba(255,94,0,0.3)]"
        >
          <span className="text-lg lg:text-xl font-light transform transition-transform duration-500 group-hover:-translate-y-1">
            ↑
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
