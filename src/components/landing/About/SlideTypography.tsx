"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AboutSlide } from "./about-data";

interface SlideTypographyProps {
  currentSlide: AboutSlide;
  totalSlides: number;
}

export default function SlideTypography({
  currentSlide,
  totalSlides,
}: SlideTypographyProps) {
  return (
    <div className="shrink-0 lg:flex-1 flex flex-col justify-center gap-3 lg:gap-8 relative z-20">
      {/* Tоп Elements */}
      <div className="flex flex-col gap-1 lg:gap-3">
        <div className="text-[clamp(3rem,8vw,7rem)] uppercase tracking-tighter leading-none font-bold opacity-100 flex items-baseline gap-1">
          <span>{currentSlide.id}</span>
          <span className="text-[clamp(1.5rem,4vw,3.5rem)] font-light opacity-50">
            {" "}
            / {`0${totalSlides}`.slice(-2)}
          </span>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 opacity-60">
          <span className="w-6 lg:w-8 h-px bg-black"></span>
          <span className="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.3em]">
            {`[ ${currentSlide.label} ]`}
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentSlide.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-[clamp(2rem,6vw,5rem)] uppercase tracking-tighter leading-none lg:leading-[0.9] font-light whitespace-nowrap max-w-lg mt-1 lg:mt-0"
        >
          {currentSlide.titleLine1} <br className="hidden lg:block" />
          <span className="font-bold">{currentSlide.titleLine2}</span>
        </motion.h2>
      </AnimatePresence>

      {/* Paragraph */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentSlide.id}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          className="text-xs md:text-base lg:text-lg text-black/70 font-light leading-snug lg:leading-relaxed max-w-md"
        >
          {currentSlide.paragraph}
        </motion.p>
      </AnimatePresence>

      {/* Sub Title Details (Desktop ONLY) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`desktop-${currentSlide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-8 hidden lg:flex gap-8 font-mono text-[9px] uppercase tracking-widest opacity-40"
        >
          {currentSlide.details.map((detail, i) => (
            <span key={`desk-${i}`}>{detail}</span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
