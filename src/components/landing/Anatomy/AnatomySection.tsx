"use client";
import { useRef, useState } from "react";
import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

import { ANATOMY_STEPS } from "./constants";
import HoodieFrame from "./Components/HoodieFrame";
import Annotation from "./Components/Annotation";
import Slider from "@/components/common/Slider";

export default function AnatomySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStepId, setActiveStepId] = useState<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let currentStep = null;
    for (const step of ANATOMY_STEPS) {
      if (latest >= step.range[0] && latest <= step.range[3]) {
        currentStep = step.id;
        break;
      }
    }
    setActiveStepId(currentStep);
  });

  const activeStepData = ANATOMY_STEPS.find((s) => s.id === activeStepId);

  return (
    <section
      ref={containerRef}
      className="relative h-[600vh] w-full bg-[#fdfdfd]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-50">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[25vw] font-black uppercase text-black/5 select-none tracking-tighter">
            KALT
          </h2>
        </div>

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

        {/* ========================================= */}
        {/* Mobile & Tablet Info Card */}
        {/* ========================================= */}
        <div className="lg:hidden absolute bottom-[80px] left-0 w-full px-4 z-50 pointer-events-none">
          <AnimatePresence mode="wait">
            {activeStepData && (
              <motion.div
                key={activeStepData.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white/90 backdrop-blur-md border border-black/10 shadow-2xl rounded-2xl p-5 flex flex-col gap-1 w-full md:max-w-md md:mx-auto"
              >
                <span className="font-mono text-[10px] text-[#FF5A00] font-bold uppercase tracking-widest">
                  Spec // 0{activeStepData.id}
                </span>
                <h4 className="text-xl font-black uppercase tracking-tighter leading-none text-black">
                  {activeStepData.title}
                </h4>
                <p className="text-xs uppercase opacity-70 leading-tight font-medium mt-1">
                  {activeStepData.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-50">
          <Slider theme="light" />
        </div>
      </div>
    </section>
  );
}
