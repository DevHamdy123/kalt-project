"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// DATA
const CATEGORIES_DATA = [
  { id: "01", name: "Shirt", count: "(174)", img: "/images/img7.webp" },
  { id: "02", name: "Jacket", count: "(361)", img: "/images/img6.webp" },
  { id: "03", name: "Jeans", count: "(368)", img: "/images/img1.webp" },
  { id: "04", name: "Outer", count: "(117)", img: "/images/img2.webp" },
  { id: "05", name: "Shoes", count: "(78)", img: "/images/img3.webp" },
];

// TITLE @ PARAGRAPH
const SectionHeader = () => (
  <div className="w-full lg:w-62.5 xl:w-75 shrink-0 flex flex-col z-20 text-center lg:text-left mb-2 lg:mb-0">
    <h2 className="text-[clamp(2rem,4vw,3.5rem)] uppercase tracking-tighter leading-none text-black break-words mb-3 lg:mb-0 lg:absolute lg:top-20 lg:left-20 z-30 font-light">
      <span className="font-light opacity-90">Urban</span>
      <span className="font-bold">_Catalog</span>
    </h2>
    <p className="text-[11px] lg:text-[13px] leading-relaxed tracking-widest font-medium opacity-50 uppercase max-w-62.5 mx-auto lg:mx-0">
      Every piece carries rhythm beyond clothing it's motion and meaning where
      street energy meets
    </p>
  </div>
);

// MAIN MODEL @ ANIMATION
const ModelDropzone = ({
  activeCat,
}: {
  activeCat: (typeof CATEGORIES_DATA)[0];
}) => (
  <div className="relative w-full flex-1 min-h-0 flex justify-center items-center z-10 py-2 lg:py-0">
    <div className="relative w-[60%] sm:w-[50%] md:w-[45%] lg:w-[85%] xl:w-[70%] max-w-137.5 max-h-full aspect-4/5">
      {/* ClipPath */}
      <div
        className="absolute inset-0 bg-[#E5E5E5] z-0 transition-all duration-500"
        style={{
          clipPath:
            "polygon(20% 13%, 100% 12%, 100% 70%, 83% 70%, 100% 88%, 100% 100%, 17% 100%, 7% 84%, 7% 28%)",
        }}
      />
      {/* Animation */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[95%] z-10 flex justify-center items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={activeCat.img}
              alt={activeCat.name}
              fill
              className="object-contain object-bottom drop-shadow-xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </div>
);

// SIDE MENU
const CategoryMenu = ({
  categories,
  activeCat,
  onSelect,
}: {
  categories: typeof CATEGORIES_DATA;
  activeCat: (typeof CATEGORIES_DATA)[0];
  onSelect: (cat: (typeof CATEGORIES_DATA)[0]) => void;
}) => (
  <div
    className="w-fit self-end lg:w-75 lg:self-auto shrink-0 flex flex-col items-end gap-2 h-[25vh] lg:h-87.5 overflow-y-auto overscroll-contain no-scrollbar pr-2 lg:pr-5 z-20 mt-2 lg:mt-0"
    style={{
      maskImage:
        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
    }}
  >
    {categories.map((cat) => {
      const isActive = activeCat.id === cat.id;
      return (
        <button
          key={cat.id}
          onClick={() => onSelect(cat)}
          className={`flex items-start justify-end w-full gap-2 transition-all duration-500 group ${
            isActive ? "opacity-100" : "opacity-30 hover:opacity-60"
          }`}
        >
          <span className="text-[9px] font-mono mt-2 md:mt-3 opacity-60">
            [{cat.id}]
          </span>
          <div className="flex items-baseline gap-2">
            <h3
              className={`text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter transition-all duration-500 ${
                isActive ? "font-bold text-black" : "font-normal text-gray-500"
              }`}
            >
              {cat.name}
            </h3>
            <span
              className={`text-lg lg:text-xl transition-all duration-500 ${
                isActive ? "font-medium text-black" : "font-light text-gray-400"
              }`}
            >
              {cat.count}
            </span>
          </div>
        </button>
      );
    })}
  </div>
);

// BUTTON & DECORATIONS
const PeripheralDecorations = () => (
  <>
    <div className="absolute top-4 left-4 lg:top-auto lg:bottom-10 lg:left-10 border border-black rounded-full px-4 lg:px-6 py-1.5 lg:py-2 text-[10px] lg:text-xs uppercase font-bold cursor-pointer hover:bg-black hover:text-white transition-all z-30 bg-white/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
      See Product →
    </div>

    <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 text-[8px] lg:text-[10px] uppercase font-mono tracking-[0.2em] z-30">
      [Categories] ................
    </div>

    <div className="absolute top-4 right-4 lg:top-20 lg:right-20 z-30 flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <span className="text-[#FF5A00] text-sm lg:text-2xl leading-none">
          ✦
        </span>

        <span className="font-mono text-[9px] lg:text-[11px] uppercase tracking-widest opacity-80 font-medium text-black">
          [ FW // 2026 ]
        </span>
      </div>

      <span className="font-mono text-[8px] lg:text-[10px] uppercase tracking-[0.2em] opacity-40 text-black pr-1">
        SEC. 02 — 05
      </span>
    </div>
  </>
);

// MAIN COMPONENT
export default function CategoryShowcase() {
  const [activeCat, setActiveCat] = useState(CATEGORIES_DATA[1]);

  return (
    <section className="relative w-full h-dvh bg-white flex flex-col lg:flex-row items-center justify-between px-5 md:px-10 lg:px-20 pt-20 pb-8 lg:py-0 overflow-hidden">
      <SectionHeader />

      <ModelDropzone activeCat={activeCat} />

      <CategoryMenu
        categories={CATEGORIES_DATA}
        activeCat={activeCat}
        onSelect={setActiveCat}
      />

      <PeripheralDecorations />
    </section>
  );
}
