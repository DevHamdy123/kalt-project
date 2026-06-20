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
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="shrink-0 lg:flex-1 flex flex-col justify-center gap-3 lg:gap-8 relative z-20">
      <div className="flex flex-col gap-1 lg:gap-3">
        <div className="text-[clamp(3rem,8vw,7rem)] uppercase tracking-tighter leading-none font-bold opacity-100 flex items-baseline gap-1">
          <span>{currentSlide.id}</span>
          <span className="text-[clamp(1.5rem,4vw,3.5rem)] font-light opacity-50">
            / {`0${totalSlides}`.slice(-2)}
          </span>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 opacity-60">
          <span className="w-6 lg:w-8 h-px bg-black"></span>
          <span className="font-mono text-[0.5625rem] lg:text-[0.625rem] uppercase tracking-[0.3em]">
            {`[ ${currentSlide.label} ]`}
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <AnimatePresence mode="popLayout">
        <motion.h2
          key={currentSlide.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.6, ease: customEase }}
          className="text-[clamp(2rem,6vw,5rem)] uppercase tracking-tighter leading-none lg:leading-[0.9] font-light whitespace-nowrap max-w-lg mt-1 lg:mt-0"
        >
          {currentSlide.titleLine1} <br className="hidden lg:block" />
          <span className="font-bold">{currentSlide.titleLine2}</span>
        </motion.h2>
      </AnimatePresence>

      {/* Paragraph */}
      <AnimatePresence mode="popLayout">
        <motion.p
          key={currentSlide.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
          className="text-xs md:text-base lg:text-lg text-black/70 font-light leading-snug lg:leading-relaxed max-w-md"
        >
          {currentSlide.paragraph}
        </motion.p>
      </AnimatePresence>

      {/* Sub Title Details (Desktop ONLY) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`desktop-${currentSlide.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.1, ease: customEase }}
          className="mt-8 hidden lg:flex gap-8 font-mono text-[0.5625rem] uppercase tracking-widest opacity-40"
        >
          {currentSlide.details.map((detail, i) => (
            <span key={`desk-${i}`}>{detail}</span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
