"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useLenis } from "lenis/react";
import TypewriterEffect from "./TypewriterEffect";

const customEase = [0.22, 1, 0.36, 1] as const;

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: customDelay, ease: customEase },
  }),
};

export default function StoreMobileLayout() {
  const lenis = useLenis();

  const scrollToCatalog = (): void => {
    lenis?.scrollTo("#shop-catalog", {
      offset: -100,
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    // تكبير المسافات الداخلية والفراغات لتعويض التصغير
    <div className="flex flex-col md:grid md:grid-cols-2 xl:hidden w-full h-full px-[1.5625rem] py-[1.875rem] md:p-[2.5rem] md:pb-0 gap-[1.25rem] md:gap-[1.875rem] min-h-0 relative">
      {/* Content Column */}
      <div className="flex flex-col justify-center md:justify-between h-full order-1 z-10 w-full md:pb-[1.875rem] min-h-0 gap-[1.875rem] md:gap-0">
        {/* Typography */}
        <div className="flex flex-col justify-start items-start">
          <motion.div
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            {/* تكبير الخط الرئيسي ليواكب الشاشة بعد التعويض */}
            <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-black text-[clamp(4.375rem,15vw,5.625rem)] md:text-[clamp(3.75rem,6.25vw,5.625rem)]">
              <TypewriterEffect /> <br />
              The Syndicate <br />
              <span>Urban Precision</span>
            </h1>
          </motion.div>
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="mt-3.75 md:mt-5"
          >
            {/* تكبير الفقرة لتبدو بحجمها الطبيعي */}
            <p className="text-black/70 font-medium leading-relaxed text-[1rem] md:text-[1.125rem] max-w-full ">
              KALT is a silent statement of urban precision. <br />
              We strip away the noise...
            </p>
          </motion.div>
        </div>

        {/* Promo Card */}
        <div className="flex flex-col justify-center items-center md:items-start w-full">
          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            // زيادة الحد الأقصى لعرض الكارت
            className="w-full max-w-112.5 md:max-w-106.25"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              // تكبير المسافات الداخلية للكارت
              className="bg-white/40 backdrop-blur-xl border border-white/50 p-5 md:p-7.5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] w-full will-change-transform"
            >
              <h3 className="text-black/60 text-[0.85rem] md:text-[0.9375rem] font-bold uppercase tracking-widest mb-[0.625rem]">
                Exclusive Offer
              </h3>
              <p className="text-black font-black uppercase tracking-tight leading-none mb-[1.25rem] md:mb-[1.5625rem] text-[1.75rem] md:text-[clamp(1.5rem,3.75vw,2.25rem)]">
                20% Off <br /> First Order
              </p>
              <div className="flex flex-wrap items-center gap-[0.625rem] mb-[1.5625rem]">
                <span className="text-black/70 text-[1rem] md:text-[1.125rem] font-medium">
                  Code:
                </span>
                <span className="bg-black/10 px-[0.9375rem] py-[0.3125rem] rounded-md text-black font-bold tracking-wider text-[1rem] md:text-[1.125rem]">
                  KALT20
                </span>
              </div>
              <button
                onClick={scrollToCatalog}
                className="bg-black text-white px-[2.5rem] py-[1.25rem] text-[0.85rem] md:text-[1rem] font-bold uppercase tracking-widest rounded-xl cursor-pointer hover:bg-neutral-800 transition-all"
              >
                SHOP NOW →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        custom={0.3}
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="hidden md:flex relative justify-center items-end z-0 order-2 h-full min-h-0"
      >
        {/* تكبير مساحة الصورة للتابلت */}
        <div className="relative w-full h-[90%] lg:h-[95%] md:max-w-[32.8125rem] lg:max-w-[35.9375rem]">
          <Image
            src="/images/img10.webp"
            alt="KALT New Drop Model"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 420px, 460px"
            className="object-contain object-bottom drop-shadow-2xl md:scale-[1.25] lg:scale-[1.05] origin-bottom transition-transform duration-500"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
