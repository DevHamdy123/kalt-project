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
      <div className="relative w-[90%] sm:w-[80%] md:w-[65%] lg:w-[85%] xl:w-[70%] max-w-137.5 max-h-full aspect-4/5 overflow-hidden">
        <div
          className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent z-0"
          style={{
            clipPath:
              "polygon(20% 13%, 100% 12%, 100% 70%, 83% 70%, 100% 88%, 100% 100%, 17% 100%, 7% 84%, 7% 28%)",
          }}
        />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] lg:w-[70%] h-[95%] z-10 flex justify-center items-end ">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -60, filter: "blur(10px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={activeCat.img}
                alt={activeCat.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 70vw"
                className="object-contain object-bottom drop-shadow-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
