"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRIDGE_COLLECTIONS } from "./Bridge-data";
import BridgeCard from "./BridgeCard";
import Image from "next/image";

export default function BridgeSection() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [isHoveringList, setIsHoveringList] = useState(false);

  const activeCollection =
    BRIDGE_COLLECTIONS.find((c) => c.id === activeId) || BRIDGE_COLLECTIONS[0];
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="w-full h-dvh bg-white px-5 md:px-12 lg:px-16 xl:px-24 flex flex-col lg:flex-row items-center justify-center overflow-hidden gap-0 lg:gap-10 xl:gap-20">
      <div className="w-full h-[50%] lg:h-auto lg:flex-1 flex flex-col items-center lg:items-start justify-center pt-2 lg:pt-0 pb-2 lg:pb-0 gap-3 lg:gap-8 relative shrink-0">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="max-w-70 font-medium text-[10px] md:text-[11px] leading-tight text-black/80 text-center lg:text-left mt-2 lg:mt-0"
        >
          From enduring classics to daring statement pieces, our collections are
          crafted with intention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
          className="relative w-fit mx-auto lg:mx-0 flex items-center justify-center drop-shadow-[0_0_1px_rgba(0,0,0,0.3)] mt-1 lg:mt-0"
        >
          <div className="absolute -top-3 -left-3 text-neutral-400 font-mono text-[10px] leading-none">
            +
          </div>
          <div className="absolute -bottom-3 -right-3 text-neutral-400 font-mono text-[10px] leading-none">
            +
          </div>

          <div
            className="relative w-[45vw] sm:w-[40vw] max-w-47.5 md:max-w-65 lg:max-w-90 xl:max-w-115 aspect-4/5 bg-[#F5F5F5] overflow-hidden"
            style={{
              clipPath:
                "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCollection.id}
                initial={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                transition={{ duration: 0.5, ease: customEase }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={activeCollection.image}
                  alt={activeCollection.title}
                  fill
                  className={`object-cover object-top transition-all duration-700 ease-in-out ${
                    isHoveringList
                      ? "grayscale-0 scale-105"
                      : "grayscale scale-100"
                  }`}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-[70%] left-0 w-full h-2 md:h-4 bg-white z-10 -translate-y-1/2" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
        }}
        className="w-full h-[50%] lg:h-auto lg:flex-1 flex flex-col justify-start lg:justify-center pt-2 lg:pt-0"
        onMouseEnter={() => setIsHoveringList(true)}
        onMouseLeave={() => setIsHoveringList(false)}
      >
        {BRIDGE_COLLECTIONS.map((col) => (
          <BridgeCard
            key={col.id}
            collection={col}
            isOpen={activeId === col.id}
            onHover={(id) => setActiveId(id)}
          />
        ))}
      </motion.div>
    </section>
  );
}
