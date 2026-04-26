"use client";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Slider from "@/components/common/Slider";
import { BaseCardWrapper } from "./BaseCardWrapper";
import Image from "next/image";

const MOCK_COLLECTION = [
  { id: "01", name: "Essential Hoodie", img: "/images/img7.webp" },
  { id: "02", name: "Urban Jacket", img: "/images/img3.webp" },
  { id: "03", name: "Street Jeans", img: "/images/img6.webp" },
  { id: "04", name: "Raw Outer", img: "/images/img1.webp" },
  { id: "05", name: "Limited Shoes", img: "/images/img2.webp" },
  { id: "06", name: "Archive Piece", img: "/images/img4.webp" },
  { id: "07", name: "Signature Hat", img: "/images/img5.webp" },
];

const SLOT_CLASSES = [
  "w-[90%]! lg:w-[21%]! lg:translate-y-8 aspect-[3/4]",
  "w-[90%]! lg:w-[21%]! lg:-translate-y-4 aspect-[3/4]",
  "w-full! lg:w-[26%]! z-20 drop-shadow-2xl scale-105 lg:scale-100 lg:-translate-y-8 aspect-[3/4]",
  "w-[90%]! lg:w-[21%]! lg:translate-y-12 aspect-[3/4]",
];

// 🔥 حددنا عدد حركات السكرول الكلية عشان السيكشن يطول براحته
const TOTAL_STEPS = MOCK_COLLECTION.length;

const CollectionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 🔥 التعديل الأول: ربطنا السكرول بـ TOTAL_STEPS عشان يلف كتير
    const newStart = Math.round(latest * TOTAL_STEPS);
    if (newStart !== startIndex && newStart >= 0 && newStart <= TOTAL_STEPS) {
      setStartIndex(newStart);
    }
  });

  // 🔥 التعديل التاني: عملنا Loop للكروت وادينا لكل كارت ID فريد في كل لفة
  const visibleItems = [0, 1, 2, 3].map((offset) => {
    const absoluteIndex = startIndex + offset;
    const actualItem = MOCK_COLLECTION[absoluteIndex % MOCK_COLLECTION.length];
    const lap = Math.floor(absoluteIndex / MOCK_COLLECTION.length);

    return {
      ...actualItem,
      uniqueKey: `${actualItem.id}-lap${lap}`,
    };
  });

  return (
    <section ref={containerRef} className="w-full h-[350vh] relative">
      <div className="sticky top-0 w-full h-dvh bg-[#FDFDFD] flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col w-full px-5 md:px-[clamp(20px,5vw,80px)] py-4 justify-between min-h-0">
          <div className="shrink-0">
            <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] font-bold uppercase tracking-tighter leading-none">
              NEW_COLLECTION -
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
                      layoutId={item.uniqueKey} // 🔥 التعديل التالت: استخدمنا المفتاح الفريد
                      key={item.uniqueKey} // 🔥 التعديل الرابع: استخدمنا المفتاح الفريد
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                      className={`relative shrink-0 ${SLOT_CLASSES[localIndex]}`}
                    >
                      <BaseCardWrapper
                        id={isHero ? "dropzone" : undefined}
                        className="w-full! h-full! relative block"
                      >
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent group-hover:opacity-100 transition-opacity duration-500">
                          <Image
                            src={item.img}
                            alt="KALT Piece"
                            fill
                            className="object-cover object-center"
                          />
                          <div className="absolute top-4 right-4 z-10 flex flex-col">
                            <span className="text-[9px] text-black/70 bg-white/80 px-2 py-0.5 backdrop-blur-sm font-mono uppercase tracking-widest">
                              [ {item.id} ]
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 z-10 w-full pr-8">
                            <p className="text-xs text-white font-bold uppercase tracking-tighter mix-blend-difference">
                              {item.name}
                            </p>
                          </div>
                          {isHero && (
                            <div className="absolute inset-0 bg-black/5" />
                          )}
                        </div>
                      </BaseCardWrapper>
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
