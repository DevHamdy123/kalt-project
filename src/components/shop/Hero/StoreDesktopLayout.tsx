"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import TypewriterEffect from "./TypewriterEffect";

// Animation Config
const customEase = [0.22, 1, 0.36, 1] as const;

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: customDelay, ease: customEase },
  }),
};

export default function StoreDesktopLayout() {
  const lenis = useLenis();

  // Scroll Handler
  const scrollToCatalog = (): void => {
    lenis?.scrollTo("#shop-catalog", {
      offset: -100,
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <div className="hidden xl:grid xl:grid-cols-[1fr_1.4fr_1fr] w-full h-full justify-between gap-1 px-[clamp(2.5rem,5vw,5rem)] pt-[1.25rem] 2xl:pt-[3rem] pb-0 min-h-0 relative">
      {/* Left Column: Typography */}
      <div className="flex flex-col justify-center z-10 pb-[1.25rem] 2xl:pb-[3rem] min-h-0">
        <motion.div
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          {/* تصغير العنوان لنسبة أنيقة ومتوازنة */}
          <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-black text-[clamp(3.25rem,4.5vw,5.75rem)] 2xl:text-[7rem]">
            <TypewriterEffect /> <br />
            The Syndicate <br />
            Urban Precision <br />
            Est. 2026 <br />
            Raw Aesthetics.
          </h1>
        </motion.div>

        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="mt-[1.5rem] 2xl:mt-[2rem] max-w-[26rem]"
        >
          {/* تصغير البراجراف ليكون دقيق وشيك */}
          <p className="text-black/70 font-medium leading-relaxed text-[clamp(0.85rem,1vw,1rem)] 2xl:text-[1.125rem]">
            KALT is a silent statement of urban precision. <br />
            We strip away the noise...
          </p>
        </motion.div>
      </div>

      {/* Center Column: Hero Image */}
      <motion.div
        custom={0.1}
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="relative flex justify-center items-end h-full z-0 min-w-[20rem] min-h-0"
      >
        <div className="relative w-full h-[95%] 2xl:h-full max-w-[36rem] 2xl:max-w-[45rem]">
          <Image
            src="/images/img10.webp"
            alt="KALT New Drop Model"
            fill
            sizes="(max-width: 500px) 100vw, (max-width: 1536px) 500px, 650px"
            className="object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* Right Column: Promo Card */}
      <div className="flex flex-col justify-center items-end z-10 w-full pb-[1.25rem] 2xl:pb-[3rem] min-h-0">
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          // عرض الكارت متناسق مش ضخم بزيادة
          className="w-full max-w-[22rem] 2xl:max-w-[25rem]"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            // رجعنا البادينج الكبير عشان المحتوى ميبقاش مالي الكارت (Airy Feel)
            className="bg-white/40 backdrop-blur-xl border border-white/50 p-[1.25rem] 2xl:p-[2rem] rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] w-full will-change-transform"
          >
            <h3 className="text-black/60 text-[0.75rem] 2xl:text-[0.875rem] font-bold uppercase tracking-widest mb-[0.75rem] 2xl:mb-[1rem]">
              Exclusive Offer
            </h3>
            <p className="text-black font-black uppercase tracking-tight leading-none mb-[1.5rem] text-[clamp(1.25rem,1.6vw,1.75rem)] 2xl:text-[2rem]">
              20% Off Your <br /> First Order
            </p>
            <div className="flex items-center gap-[0.75rem] mb-[1.75rem] 2xl:mb-[2.25rem]">
              <span className="text-black/70 text-[0.85rem] 2xl:text-[1rem] font-medium">
                Code:
              </span>
              <span className="bg-black/10 px-[1rem] py-[0.5rem] rounded-md text-black font-bold tracking-wider text-[0.85rem] 2xl:text-[1rem]">
                KALT20
              </span>
            </div>
            {/* الزرار حجمه متناسق مش عملاق */}
            <button
              onClick={scrollToCatalog}
              className="bg-black text-white px-[1rem] py-[1.25rem] text-[0.85rem] 2xl:text-[1rem] font-bold uppercase tracking-widest rounded-xl cursor-pointer hover:bg-neutral-800 transition-all w-full"
            >
              SHOP NOW →
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-[1.25rem] 2xl:bottom-[2.5rem] right-[clamp(2.5rem,5vw,5rem)] flex flex-col items-center gap-[0.75rem] z-20 pointer-events-none"
      >
        {/* تصغير كلمة السكرول لدرجة ناعمة جداً */}
        <span
          className="text-black/50 text-[0.55rem] 2xl:text-[0.65rem] uppercase tracking-[0.3em] font-bold rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-black/50" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}
