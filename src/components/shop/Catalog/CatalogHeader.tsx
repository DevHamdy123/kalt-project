"use client";

import { motion, Variants } from "framer-motion";

// Component Types
interface CatalogHeaderProps {
  activeCategory: string;
  setCategory: (category: string) => void;
}

// Constants
const CATEGORIES = [
  "ALL ARCHIVE",
  "STATEMENT PIECES",
  "EVERYDAY ESSENTIALS",
  "TIMELESS CLASSICS",
  "SEASONAL COLLECTIONS",
];

// Animation Config
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CatalogHeader({
  activeCategory,
  setCategory,
}: CatalogHeaderProps) {
  // Derived State
  const formattedActive =
    activeCategory === "ALL ARCHIVE"
      ? "ALL ARCHIVE"
      : activeCategory.replace(/-/g, " ").toUpperCase();

  // Header Wrapper
  return (
    <div className="mb-16 md:mb-24 w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
      {/* Title & Description */}
      <div className="max-w-xl">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-[clamp(2.3rem,4.5vw,4rem)] font-black uppercase tracking-tighter leading-[0.9] text-black mb-4"
        >
          The Syndicate Drop / <br /> Collection '26
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-black/70 text-sm font-medium"
        >
          A curation of urban armor. Limited release.
        </motion.p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 lg:border-t-0 pt-4 lg:pt-0">
        {CATEGORIES.map((cat) => {
          const isActive = formattedActive === cat;

          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="text-[10px] md:text-xs font-bold uppercase tracking-widest pb-1 transition-all duration-300 relative group"
            >
              <span
                className={
                  isActive ? "text-black" : "text-black/40 hover:text-black/80"
                }
              >
                {cat}
              </span>
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full bg-black/30"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
