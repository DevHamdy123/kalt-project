"use client";
import { Anchor, Archive, Box, Crown, Flame, History } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SliderProps {
  theme?: "dark" | "light";
}

interface BrandItem {
  label: string;
  icon: ReactNode;
}

export default function Slider({ theme = "dark" }: SliderProps) {
  const brandItems: BrandItem[] = [
    { label: "ESTABLISHED 2026", icon: <History size={14} /> },
    { label: "URBAN ARCHIVE", icon: <Archive size={14} /> },
    { label: "RAW AESTHETICS", icon: <Anchor size={14} /> },
    { label: "PREMIUM CUTS", icon: <Crown size={14} /> },
    { label: "STREET LEGACY", icon: <Flame size={14} /> },
    { label: "LIMITED DROP", icon: <Box size={14} /> },
  ];

  const isLight = theme === "light";

  const duplicatedItems = [
    ...brandItems,
    ...brandItems,
    ...brandItems,
    ...brandItems,
  ];

  return (
    <div
      className={`w-full h-14 md:h-16 flex items-center overflow-hidden shrink-0 shadow-2xl z-20 
      ${isLight ? "bg-white text-black border-y border-black/10" : "bg-black text-white"}`}
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        }}
      >
        <ul className="flex items-center gap-8 md:gap-16 font-black text-[9px] md:text-[11px] uppercase tracking-[0.3em] whitespace-nowrap px-4 md:px-8 italic opacity-90">
          {duplicatedItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className={isLight ? "text-black/40" : "text-white/60"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
