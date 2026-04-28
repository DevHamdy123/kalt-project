"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CategoryData } from "./category-data";

interface ModelDropzoneProps {
  activeCat: CategoryData;
}

export default function ModelDropzone({ activeCat }: ModelDropzoneProps) {
  return (
    <div className="relative w-full flex-1 min-h-0 flex justify-center items-center z-10 py-2 lg:py-0">
      <div className="relative w-[60%] sm:w-[50%] md:w-[45%] lg:w-[85%] xl:w-[70%] max-w-137.5 max-h-full aspect-4/5">
        {/* ClipPath */}
        <div
          className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent group-hover:opacity-100 transition-opacity z-0 duration-500"
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
}
