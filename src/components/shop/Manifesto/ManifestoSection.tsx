"use client";

import { useRef } from "react";
import { useInView, motion, Variants } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";

// Constants
const PRINCIPLES = [
  {
    id: 1,
    number: "01",
    title: "LIMITED DROPS.",
    description:
      "We do not mass produce. Every collection is a limited release. Once a piece is gone, it is archived forever.",
  },
  {
    id: 2,
    number: "02",
    title: "RAW AESTHETICS.",
    description:
      "Stripped of the unnecessary. We focus on heavy-weight fabrics, structural cuts, and brutalist precision.",
  },
  {
    id: 3,
    number: "03",
    title: "GLOBAL SYNDICATE.",
    description:
      "From our studio directly to the streets. We provide priority express shipping for the chosen few worldwide.",
  },
];

// Animation Config
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ManifestoSection() {
  // Local Refs & State
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Section Wrapper
  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white flex flex-col justify-between"
    >
      {/* Main Container */}
      {/* حولنا 1600px لـ 100rem عشان الكونتينر ينكمش مع الزوم */}
      <div className="flex-grow flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[100rem] mx-auto w-full pt-32 pb-16">
        {/* Manifesto Header */}
        <div className="mb-24 md:mb-32">
          {/* حولنا 10px لـ 0.625rem */}
          <span className="text-[0.625rem] font-bold text-[#FF5A00] tracking-[0.3em] uppercase mb-6 block">
            `// Manifesto`
          </span>
          <Reveal active={isInView}>
            {/* صغرنا الـ 8vw لـ 6.4vw عشان الكلمة تلم جوه الكونتينر */}
            <h2 className="text-[clamp(3.5rem,6.4vw,8rem)] font-black uppercase tracking-tighter leading-[0.85] text-black">
              NOT JUST APPAREL-
              <br />
              <span className="font-light italic text-black/50">
                URBAN ARMOR.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Principles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-black/10"
        >
          {PRINCIPLES.map((principle) => (
            <motion.div
              key={principle.id}
              variants={itemVariants}
              className="group relative p-8 md:p-12 border-r border-b border-black/10 hover:bg-neutral-50 transition-colors duration-500 overflow-hidden"
            >
              <span className="absolute top-4 right-6 text-7xl font-black text-black/5 select-none transition-all group-hover:text-[#FF5A00]/10">
                {principle.number}
              </span>

              <div className="relative z-10 flex flex-col gap-6">
                {/* حولنا 10px لـ 0.625rem */}
                <span className="text-[0.625rem] font-bold text-black/40 tracking-[0.3em] uppercase">
                  `//` {principle.number}
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-black">
                  {principle.title}
                </h3>
                <p className="text-sm text-neutral-500 font-mono leading-relaxed tracking-wide">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer Banner */}
      {/* حولنا 80px لـ 5rem */}
      <div className="w-full h-[5rem] bg-gray-700 flex items-center justify-center shrink-0">
        {/* حولنا 10px لـ 0.625rem */}
        <span className="text-[0.625rem] font-bold text-white/40 uppercase tracking-[0.5em]">
          End of Manifesto // Archive Status: Active
        </span>
      </div>
    </section>
  );
}
