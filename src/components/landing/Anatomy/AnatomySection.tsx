"use client";
import { useRef } from "react";
import { useScroll, motion } from "framer-motion";

import { ANATOMY_STEPS } from "./constants";
import HoodieFrame from "./Components/HoodieFrame";
import Annotation from "./Components/Annotation";

export default function AnatomySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[600vh] w-full bg-[#fdfdfd]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-50">
        {/* Background Text - Fixed & Subtle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[25vw] font-black uppercase text-black/5 select-none tracking-tighter">
            KALT
          </h2>
        </div>

        {/* Brand Title Overlay - Animated Entry */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-6 left-4 sm:top-10 sm:left-8 md:top-12 md:left-12 lg:top-8 lg:left-8 xl:top-16 xl:left-16 z-40 pointer-events-none"
        >
          <h2 className="flex flex-col md:flex-row text-black uppercase tracking-tighter leading-[0.8] md:leading-none whitespace-nowrap">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-light">
              PRODUCT_
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold">
              ANATOMY
            </span>
          </h2>
        </motion.div>

        <HoodieFrame progress={scrollYProgress} />

        {ANATOMY_STEPS.map((step) => (
          <Annotation key={step.id} step={step} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
