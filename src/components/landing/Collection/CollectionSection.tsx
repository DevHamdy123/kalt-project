"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Slider from "@/components/common/Slider";
import { CollectionCard } from "./CollectionCard";
import { MOCK_COLLECTION, SLOT_CLASSES } from "./Collection-data";

const TOTAL_STEPS = MOCK_COLLECTION.length;

const CollectionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();

  // =========================================
  // Mobile Scroll Tracking State
  // =========================================
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [mobileProgress, setMobileProgress] = useState(0);

  const handleMobileScroll = () => {
    if (mobileScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mobileScrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = scrollLeft / maxScroll;
        setMobileProgress(progress);
      }
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newStart = Math.round(latest * TOTAL_STEPS);
    if (newStart !== startIndex && newStart >= 0 && newStart <= TOTAL_STEPS) {
      setStartIndex(newStart);
    }
  });

  const visibleItems = [0, 1, 2, 3].map((offset) => {
    const absoluteIndex = startIndex + offset;
    const actualItem = MOCK_COLLECTION[absoluteIndex % MOCK_COLLECTION.length];
    const lap = Math.floor(absoluteIndex / MOCK_COLLECTION.length);

    return {
      ...actualItem,
      uniqueKey: `${actualItem.id}-lap${lap}`,
    };
  });

  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ========================================= */}
      {/* DESKTOP LAYOUT (Framer Motion Logic)        */}
      {/* ========================================= */}
      <section className="hidden lg:block w-full h-[350vh] relative">
        <div className="sticky top-0 w-full h-dvh bg-[#FDFDFD] flex flex-col overflow-hidden">
          <div className=" flex-1 flex flex-col w-full px-5 md:px-[clamp(1.25rem,5vw,5rem)] py-4 justify-between min-h-0">
            {/* Section title header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="shrink-0 lg:absolute lg:top-10 lg:left-20 z-30"
            >
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] uppercase tracking-tighter leading-none text-black wrap-break-word mb-3 lg:mb-0 font-light">
                <span className="font-light opacity-90">New</span>
                <span className="font-bold">_Collection</span>
              </h2>
            </motion.div>

            {/* Cards grid section */}
            <div className="flex-1 min-h-0 w-full flex items-center justify-center my-2 lg:my-0">
              <div className="w-full max-w-[39rem] lg:max-w-full grid grid-cols-2 lg:flex lg:flex-row justify-items-center lg:justify-between items-center gap-4 lg:gap-0 h-full max-h-full">
                <AnimatePresence mode="popLayout">
                  {visibleItems.map((item, localIndex) => {
                    const isHero = localIndex === 2;

                    return (
                      <motion.div
                        layout
                        layoutId={item.uniqueKey}
                        key={item.uniqueKey}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.8, ease: customEase }}
                        className={`relative shrink-0 ${SLOT_CLASSES[localIndex]}`}
                      >
                        <CollectionCard item={item} isHero={isHero} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom navigation area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="shrink-0 w-full pt-2 flex flex-row items-center justify-center gap-3 md:gap-5 border-t border-black/15"
            >
              <span className="text-[clamp(1.2rem,4vw,2.5rem)] font-bold uppercase tracking-tighter leading-none">
                FOR_MORE
              </span>
              {/* Button to handle programmatic navigation to shop */}
              <button
                onClick={() => router.push("/shop")}
                className="flex shrink-0 items-center justify-center w-[clamp(2rem,4vw,3rem)] h-[clamp(2rem,4vw,3rem)] rounded-full border border-black hover:bg-black hover:text-white transition-all duration-500 cursor-pointer group"
              >
                <span className="text-xl md:text-2xl font-light leading-none transition-transform duration-500 group-hover:rotate-90">
                  +
                </span>
              </button>
            </motion.div>
          </div>

          {/* Footer slider component */}
          <Slider theme="light" />
        </div>
      </section>

      {/* ========================================= */}
      {/* MOBILE & TABLET LAYOUT (Native Scroll)      */}
      {/* ========================================= */}
      <section className="block lg:hidden w-full relative bg-[#FDFDFD] h-[100dvh] flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: customEase }}
          className="flex-1 flex flex-col w-full pt-8 pb-4 justify-between min-h-0"
        >
          {/* Section title header */}
          <div className="px-5 shrink-0">
            <h2 className="text-[clamp(2rem,7.5vw,3.5rem)] uppercase tracking-tighter leading-none text-black flex items-center gap-2">
              <span className="font-light opacity-90">New</span>
              <span className="font-bold">_Collection</span>
            </h2>
          </div>

          {/* Native Horizontal Scroll Container */}
          <div className="flex-1 flex flex-col justify-center min-h-0 w-full my-2">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              data-lenis-prevent="true"
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-5 py-4 items-center
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {MOCK_COLLECTION.map((item) => (
                <div
                  key={item.id}
                  className="snap-center shrink-0 w-[75vw] sm:w-[55vw] md:w-[45vw] aspect-3/4 relative active:scale-[0.98] transition-transform duration-300"
                >
                  <CollectionCard item={item} isHero={true} />
                </div>
              ))}
            </div>

            {/* Premium Scroll Progress Indicator */}
            <div className="w-[60px] h-[3px] bg-black/10 rounded-full mx-auto mt-10 relative overflow-hidden shrink-0">
              <div
                className="absolute top-0 left-0 h-full w-[20px] bg-black rounded-full transition-transform duration-100 ease-out"
                style={{ transform: `translateX(${mobileProgress * 40}px)` }}
              />
            </div>
          </div>

          {/* Bottom navigation area */}
          <div className="shrink-0 w-full px-5 pt-4 flex flex-row items-center justify-center gap-3 border-t border-black/15 max-w-[90%] mx-auto">
            <span className="text-[1.5rem] font-bold uppercase tracking-tighter leading-none">
              FOR_MORE
            </span>
            <button
              onClick={() => router.push("/shop")}
              className="flex shrink-0 items-center justify-center w-[2.5rem] h-[2.5rem] rounded-full border border-black hover:bg-black hover:text-white transition-all duration-500"
            >
              <span className="text-xl font-light leading-none transition-transform duration-500 hover:rotate-90">
                +
              </span>
            </button>
          </div>
        </motion.div>

        {/* Footer slider component */}
        <div className="shrink-0 w-full">
          <Slider theme="light" />
        </div>
      </section>
    </div>
  );
};

export default CollectionSection;
