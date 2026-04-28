"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AboutSlide } from "./about-data";

interface SlideImageProps {
  currentSlide: AboutSlide;
}

export default function SlideImage({ currentSlide }: SlideImageProps) {
  return (
    <div className="flex-1 min-h-0 relative w-full flex items-center justify-center mt-2 lg:mt-0 z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[95%] lg:h-auto w-auto lg:w-[80%] xl:w-[70%] max-w-md aspect-4/5 flex justify-center items-end"
        >
          <div
            className="absolute inset-0 scale-[1.03] origin-bottom bg-black/10 z-0 bg-linear-to-t from-black/40 via-transparent to-transparent drop-shadow-2xl"
            style={{
              clipPath:
                "polygon(20% 13%, 100% 12%, 100% 70%, 83% 70%, 100% 88%, 100% 100%, 17% 100%, 7% 84%, 7% 28%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 bottom-0 z-10 flex justify-center items-end drop-shadow-2xl">
            <Image
              src={currentSlide.img}
              alt={`KALT ${currentSlide.label}`}
              fill
              className="object-contain object-bottom scale-[0.98] origin-bottom drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
