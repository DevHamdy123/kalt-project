"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRIDGE_COLLECTIONS } from "./Bridge-data";
import BridgeCard from "./BridgeCard";
import Image from "next/image";

export default function BridgeSection() {
  const [activeId, setActiveId] = useState<number | null>(1);

  const activeCollection =
    BRIDGE_COLLECTIONS.find((c) => c.id === activeId) || BRIDGE_COLLECTIONS[0];
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <section className="w-full min-h-[calc(100vh-3.75rem)] bg-bg-inner px-5 md:px-12 lg:px-16 xl:px-24 flex flex-col lg:flex-row items-center justify-center overflow-hidden gap-0 lg:gap-10 xl:gap-20">
        <div className="w-full flex-1 flex flex-col items-center lg:items-start justify-center pt-10 lg:pt-0 gap-3 lg:gap-8 relative shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="flex flex-col items-center lg:items-start gap-2 max-w-sm mb-4 lg:mb-0 text-center lg:text-left z-20"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
              The Bridge
            </h2>
            <p className="font-medium text-[0.625rem] md:text-[0.6875rem] leading-relaxed text-black/60 uppercase tracking-widest max-w-[17.5rem]">
              From enduring classics to daring statement pieces, our collections
              are crafted with intention.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="relative w-fit mx-auto lg:mx-0 flex items-center justify-center drop-shadow-[0_0_1px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute -top-3 -left-3 text-neutral-400 font-mono text-[0.625rem]">
              +
            </div>
            <div className="absolute -bottom-3 -right-3 text-neutral-400 font-mono text-[0.625rem]">
              +
            </div>

            <div
              className="relative w-[45vw] sm:w-[40vw] max-w-[18.75rem] md:max-w-[25rem] aspect-4/5 bg-[#F5F5F5] overflow-hidden"
              style={{
                clipPath:
                  "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeCollection.id}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: customEase }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeCollection.image}
                    alt={activeCollection.title}
                    fill
                    priority
                    fetchPriority="high"
                    quality={80}
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 40vw, 400px"
                    className="object-cover object-top transition-all duration-700"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
          className="w-full lg:flex-1 flex flex-col justify-center pt-10 lg:pt-0"
        >
          {BRIDGE_COLLECTIONS.map((col) => (
            <BridgeCard
              key={col.id}
              collection={col}
              isOpen={activeId === col.id}
              onClick={(id) => setActiveId(id)}
            />
          ))}
        </motion.div>
      </section>

      <div className="w-full h-20 bg-gray-700 flex items-center justify-center shrink-0">
        <span className="text-[0.625rem] font-bold text-white/40 uppercase tracking-[0.5em]">
          End of BRIGE // Archive Status: Active
        </span>
      </div>
    </>
  );
}
