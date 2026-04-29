"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BridgeCollection } from "./Bridge-data";

interface Props {
  collection: BridgeCollection;
  isOpen: boolean;
  onHover: (id: number | null) => void;
}

export default function BridgeCard({ collection, isOpen, onHover }: Props) {
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: customEase },
        },
      }}
      onMouseEnter={() => onHover(collection.id)}
      className="relative border-b border-black/10 py-3 lg:py-6 cursor-pointer group"
    >
      <div className="flex justify-between items-center z-10 relative">
        <div className="flex flex-col w-full">
          <h3
            className={`text-xl md:text-3xl lg:text-4xl tracking-tight flex items-center transition-colors duration-300 ${
              isOpen
                ? "text-black font-bold"
                : "text-black/40 font-medium group-hover:text-black/80"
            }`}
          >
            {collection.title}
            <span
              className={`ml-2 lg:ml-3 font-medium text-xs md:text-2xl mt-1 transition-colors duration-300 ${
                isOpen ? "text-neutral-400" : "text-neutral-300"
              }`}
            >
              {collection.year}
            </span>
          </h3>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: customEase }}
                className="overflow-hidden"
              >
                <p className="max-w-sm text-xs text-neutral-500 mt-2 lg:mt-4 leading-relaxed font-medium">
                  {collection.description}
                </p>
                <button className="mt-3 lg:mt-5 border border-black px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs tracking-wider uppercase font-bold flex items-center gap-2 hover:bg-black hover:text-white transition-all w-fit group/btn">
                  GET STARTED{" "}
                  <span className="group-hover/btn:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`w-5 h-5 lg:w-8 lg:h-8 border rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
            isOpen
              ? "border-black bg-black text-white -rotate-45"
              : "border-black/20 text-black opacity-100 group-hover:border-black"
          }`}
        >
          <span className="text-[10px] lg:text-xs">→</span>
        </div>
      </div>
    </motion.div>
  );
}
