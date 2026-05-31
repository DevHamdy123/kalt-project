"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";

const customEase = [0.22, 1, 0.36, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: customDelay, ease: customEase },
  }),
};

export default function StoreMobileLayout() {
  const lenis = useLenis();

  const scrollToCatalog = () => {
    // 3. الحركة السحرية: سكرول ناعم للـ ID بتاع السكشن
    lenis?.scrollTo("#shop-catalog", {
      offset: -100, // عشان النافبار ميبقاش فوق العنوان
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };
  return (
    // تم تقليل المساحات العلوية والسفلية لضمان عدم وجود تمرير
    <div className="flex flex-col md:grid md:grid-cols-2 xl:hidden w-full h-full px-5 py-6 md:p-8 md:pb-0 gap-4 md:gap-6 min-h-0">
      {/* 1. قسم النصوص والكارت */}
      <div className="flex flex-col justify-center md:justify-between h-full order-1 z-10 w-full md:pb-6 min-h-0 gap-6 md:gap-0">
        {/* النصوص */}
        <div className="flex flex-col justify-start items-start">
          <motion.div
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-black text-[clamp(3.5rem,12vw,4.5rem)] md:text-[clamp(3rem,5vw,4.5rem)]">
              KALT. <br />
              The Syndicate <br />
              <span>Urban Precision</span>
            </h1>
          </motion.div>
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="mt-3 md:mt-4"
          >
            <p className="text-black/70 font-medium leading-relaxed text-[13px] md:text-sm max-w-[90%]">
              A silent statement of urban precision. We strip away the noise.
            </p>
          </motion.div>
        </div>

        {/* الكارت */}
        <div className="flex flex-col justify-center items-center md:items-start w-full">
          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="w-full max-w-[360px] md:max-w-[340px]"
          >
            <motion.div
              // التعديل 1: زيادة مدى الحركة من -8 إلى -15
              animate={{ y: [0, -15, 0] }}
              // التعديل 2: زيادة السرعة بتقليل المدة من 3.5 إلى 2.5
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              // التعديل 3: تقوية التأثير الزجاجي بشكل يبرز الكارت
              className="bg-white/40 backdrop-blur-xl border border-white/50 p-5 md:p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] w-full will-change-transform"
            >
              {/* ... باقي محتوى الكارت كما هو ... */}
              <h3 className="text-black/60 text-[11px] md:text-xs font-bold uppercase tracking-widest mb-2">
                Exclusive Offer
              </h3>
              <p className="text-black font-black uppercase tracking-tight leading-none mb-4 md:mb-5 text-[1.4rem] md:text-[clamp(1.2rem,3vw,1.8rem)]">
                20% Off <br /> First Order
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-black/70 text-[13px] md:text-sm font-medium">
                  Code:
                </span>
                <span className="bg-black/10 px-3 py-1 rounded-md text-black font-bold tracking-wider text-[13px] md:text-sm">
                  KALT20
                </span>
              </div>
              <button
                onClick={scrollToCatalog} // 4. ربط الدالة بالزرار
                className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest  hover:bg-neutral-800 transition-all"
              >
                SHOP NOW →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 2. صورة الموديل */}
      <motion.div
        custom={0.3}
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="hidden md:flex relative justify-center items-end z-0 order-2 h-full min-h-0"
      >
        <div className="relative w-full h-[90%] lg:h-[95%] md:max-w-[420px] lg:max-w-[460px]">
          <Image
            src="/images/img10.webp"
            alt="KALT New Drop Model"
            fill
            className="object-contain object-bottom drop-shadow-2xl md:scale-[1.25] lg:scale-[1.05] origin-bottom transition-transform duration-500"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
