"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BridgeCollection } from "./Bridge-data";

interface Props {
  collection: BridgeCollection;
  isOpen: boolean;
  onHover: (id: number | null) => void;
}

export default function BridgeCard({ collection, isOpen, onHover }: Props) {
  return (
    <div
      onMouseEnter={() => onHover(collection.id)}
      className="relative border-b border-black/10 py-3 lg:py-6 cursor-pointer group"
    >
      <div className="flex justify-between items-center z-10 relative">
        <div className="flex flex-col w-full">
          <h3 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black flex items-center">
            {collection.title}
            <span className="text-neutral-400 ml-2 lg:ml-3 font-medium text-xs md:text-2xl mt-1">
              {collection.year}
            </span>
          </h3>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="max-w-sm text-xs text-neutral-500 mt-2 lg:mt-4 leading-relaxed font-medium">
                  {collection.description}
                </p>
                <button className="mt-3 lg:mt-5 border border-black px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs tracking-wider uppercase font-bold flex items-center gap-2 hover:bg-black hover:text-white transition-all w-fit">
                  GET STARTED <span>→</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`w-5 h-5 lg:w-8 lg:h-8 border border-black/20 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? "opacity-0" : "opacity-100 group-hover:border-black"}`}
        >
          <span className="text-[10px] lg:text-xs">→</span>
        </div>
      </div>
    </div>
  );
}
