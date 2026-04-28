"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";

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
    <section ref={containerRef} className="relative h-[600vh] w-full bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-50">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[25vw] font-black uppercase text-black/5 select-none">
            KALT
          </h2>
        </div>

        {/* Brand Title Overlay */}
        <div className="absolute top-6 left-4 sm:top-10 sm:left-8 md:top-12 md:left-12 lg:top-8 lg:left-8 xl:top-16 xl:left-16 z-40 pointer-events-none">
          <h2 className="flex flex-row text-black uppercase tracking-tighter leading-none whitespace-nowrap">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-light">
              PRODUCT_
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold">
              ANATOMY
            </span>
          </h2>
        </div>

        <HoodieFrame progress={scrollYProgress} />

        {ANATOMY_STEPS.map((step) => (
          <Annotation key={step.id} step={step} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
