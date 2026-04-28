"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ABOUT_SLIDES_DATA } from "./about-data";
import SlideTypography from "./SlideTypography";
import SlideImage from "./SlideImage";
import SliderControls from "./SliderControls";
import Slider from "@/components/common/Slider";

export default function AboutSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = ABOUT_SLIDES_DATA[currentSlideIndex];
  const totalSlides = ABOUT_SLIDES_DATA.length;

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full h-dvh bg-bg-inner text-black flex flex-col overflow-hidden px-5 md:px-16 lg:px-24 pt-5 pb-0 lg:pt-24 lg:pb-0">
      {/* ===================== MAIN CONTENT: SPLIT REVEAL ===================== */}
      <div className="flex-1 flex flex-col lg:flex-row gap-2 lg:gap-0 z-10 min-h-0">
        {/* LEFT SIDE */}
        <SlideTypography
          currentSlide={currentSlide}
          totalSlides={totalSlides}
        />

        {/* RIGHT SIDE */}
        <SlideImage currentSlide={currentSlide} />

        {/* Sub Title Details (Mobile & Tablet ONLY) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${currentSlide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex shrink-0 lg:hidden w-full justify-start gap-6 font-mono text-[8px] uppercase tracking-widest opacity-40 z-20 mt-2"
          >
            {currentSlide.details.map((detail, i) => (
              <span key={`mob-${i}`}>{detail}</span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===================== NAVIGATION CONTROLS ===================== */}
      <div className="mb-20 lg:mb-24">
        <SliderControls handlePrev={handlePrev} handleNext={handleNext} />
      </div>

      {/* ===================== SLIDER (MARQUEE) ===================== */}

      <div className="absolute bottom-0 left-0 w-full z-30">
        <Slider />
      </div>

      {/* ===================== DECORATIONS ===================== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[70%] bg-black hidden lg:block" />

      <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[#FF5A00] text-sm lg:text-xl leading-none">
            ✦
          </span>
          <span className="font-mono text-[9px] lg:text-[10px] uppercase tracking-widest opacity-80 font-medium text-black/90">
            [ SS // 2026 ]
          </span>
        </div>
      </div>
    </section>
  );
}
