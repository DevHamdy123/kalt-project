"use client";
import { motion, Variants } from "framer-motion";

export default function SectionHeader() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full lg:w-62.5 xl:w-75 shrink-0 flex flex-col z-20 text-center lg:text-left mb-2 lg:mb-0"
    >
      <h2 className="text-[clamp(2rem,4vw,3.5rem)] uppercase tracking-tighter leading-none text-black wrap-break-word mb-3 lg:mb-0 lg:absolute lg:top-20 lg:left-20 z-30 font-light">
        <motion.span
          variants={itemVariants}
          className="font-light opacity-90 block lg:inline"
        >
          Urban
        </motion.span>
        <motion.span
          variants={itemVariants}
          className="font-bold block lg:inline"
        >
          _Catalog
        </motion.span>
      </h2>
      <motion.p
        variants={itemVariants}
        className="text-[11px] lg:text-[13px] leading-relaxed tracking-widest font-medium opacity-50 uppercase max-w-62.5 mx-auto lg:mx-0"
      >
        Every piece carries rhythm beyond clothing it's motion and meaning where
        street energy meets
      </motion.p>
    </motion.div>
  );
}
