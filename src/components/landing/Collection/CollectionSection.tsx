"use client";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import Slider from "@/components/common/Slider";
import { CollectionCard } from "./CollectionCard";
import { MOCK_COLLECTION, SLOT_CLASSES } from "./Collection-data";

// TOTAL SCROLL STEPS
const TOTAL_STEPS = MOCK_COLLECTION.length;

const CollectionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Synchronize scroll progress with the collection's index (discrete steps)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newStart = Math.round(latest * TOTAL_STEPS);
    if (newStart !== startIndex && newStart >= 0 && newStart <= TOTAL_STEPS) {
      setStartIndex(newStart);
    }
  });

  //Maps the current startIndex to a sliding window of items.
  const visibleItems = [0, 1, 2, 3].map((offset) => {
    // 1. Calculate the linear position in the infinite sequence
    const absoluteIndex = startIndex + offset;
    // 2. Wrap around the collection using modulo (Circular Indexing)
    const actualItem = MOCK_COLLECTION[absoluteIndex % MOCK_COLLECTION.length];
    // 3. Track how many times we've looped through the collection
    const lap = Math.floor(absoluteIndex / MOCK_COLLECTION.length);

    return {
      ...actualItem,
      // 4. Create a key that identifies this specific instance in the loop
      uniqueKey: `${actualItem.id}-lap${lap}`,
    };
  });

  return (
    <section ref={containerRef} className="w-full h-[350vh] relative">
      <div className="sticky top-0 w-full h-dvh bg-[#FDFDFD] flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col w-full px-5 md:px-[clamp(20px,5vw,80px)] py-4 justify-between min-h-0">
          <div className="shrink-0">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] uppercase tracking-tighter leading-none text-black wrap-break-word mb-3 lg:mb-0 lg:absolute lg:top-20 lg:left-20 z-30 font-light">
              <span className="font-light opacity-90">New</span>
              <span className="font-bold">_Collection</span>
            </h2>
          </div>

          <div className="flex-1 min-h-0 w-full flex items-center justify-center my-2 lg:my-0">
            <div className="w-full max-w-125 lg:max-w-full grid grid-cols-2 lg:flex lg:flex-row justify-items-center lg:justify-between items-center gap-4 lg:gap-0 h-full max-h-full">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item, localIndex) => {
                  const isHero = localIndex === 2;

                  return (
                    <motion.div
                      layout
                      layoutId={item.uniqueKey}
                      key={item.uniqueKey}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                      className={`relative shrink-0 ${SLOT_CLASSES[localIndex]}`}
                    >
                      {/* CARDS STYLE */}
                      <CollectionCard item={item} isHero={isHero} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="shrink-0 w-full pt-2 flex flex-row items-center justify-center gap-3 md:gap-5 border-t border-black/5">
            <span className="text-[clamp(1.2rem,4vw,2.5rem)] font-bold uppercase tracking-tighter leading-none">
              FOR_MORE
            </span>
            <button className="flex shrink-0 items-center justify-center w-[clamp(32px,4vw,48px)] h-[clamp(32px,4vw,48px)] rounded-full border border-black hover:bg-black hover:text-white transition-all duration-500 cursor-pointer group">
              <span className="text-xl md:text-2xl font-light leading-none transition-transform duration-500 ">
                +
              </span>
            </button>
          </div>
        </div>

        <Slider theme="light" />
      </div>
    </section>
  );
};

export default CollectionSection;
