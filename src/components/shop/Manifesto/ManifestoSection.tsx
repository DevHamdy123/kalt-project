"use client";

import { useRef } from "react";
import { useInView, motion, Variants } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";

const PRINCIPLES = [
  {
    id: 1,
    number: "// 01",
    title: "LIMITED DROPS.",
    description:
      "We do not mass produce. Every collection is a limited release. Once a piece is gone, it is archived forever.",
  },
  {
    id: 2,
    number: "// 02",
    title: "RAW AESTHETICS.",
    description:
      "Stripped of the unnecessary. We focus on heavy-weight fabrics, structural cuts, and brutalist precision.",
  },
  {
    id: 3,
    number: "// 03",
    title: "GLOBAL SYNDICATE.",
    description:
      "From our studio directly to the streets. We provide priority express shipping for the chosen few worldwide.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative w-full pt-32 bg-[#FFFFFF]">
      <div className="px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto w-full relative z-10">
        {/* العنوان مع البوردر اللي طلبته */}
        <div className="mb-32 max-w-4xl border-b border-black/20 pb-16">
          <Reveal active={isInView}>
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.9]">
              Not just apparel- <br />
              <span className="font-light italic text-black/90">
                Urban Armor.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* الجريد بدون بوردرات علوية */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 pt-16"
        >
          {PRINCIPLES.map((principle) => (
            <motion.div
              key={principle.id}
              variants={itemVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group flex flex-col gap-6 cursor-pointer pt-6"
            >
              <span className="text-xs font-mono text-black/40 uppercase tracking-[0.3em] block mb-2">
                {principle.number}
              </span>
              <h3 className="text-3xl font-bold uppercase tracking-tighter group-hover:pl-2 transition-all duration-300">
                {principle.title}
              </h3>
              <p className="max-w-sm text-sm text-neutral-600 uppercase leading-relaxed font-mono tracking-wide">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* الـ Footer Bar - لون رمادي غامق وأنيق */}
      <div className="w-full h-[60px] bg-[#333333] mt-32" />
    </section>
  );
}
