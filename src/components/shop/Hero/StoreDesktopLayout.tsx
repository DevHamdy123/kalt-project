"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";

const customEase = [0.22, 1, 0.36, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: customDelay, ease: customEase },
  }),
};

export default function StoreDesktopLayout() {
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
    // تم تقليل المساحة العلوية لتناسب شاشات اللابتوب العادية
    <div className="hidden xl:grid xl:grid-cols-[1fr_1.4fr_1fr] 2xl:grid-cols-[1fr_1.2fr_1fr] w-full h-full justify-between gap-4 px-[clamp(2rem,4vw,4rem)] pt-4 2xl:pt-12 pb-0 min-h-0 relative">
      {/* 1. النص الترحيبي (يسار) */}
      <div className="flex flex-col justify-center z-10 pb-4 2xl:pb-12 min-h-0">
        <motion.div
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-black text-[clamp(2.5rem,3.5vw,4.5rem)] 2xl:text-[5.5rem]">
            KALT. <br />
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
          className="mt-4 2xl:mt-8 max-w-sm"
        >
          <p className="text-black/70 font-medium leading-relaxed text-[clamp(0.75rem,0.9vw,1rem)] 2xl:text-[1.1rem]">
            KALT is a silent statement of urban precision. <br />
            We strip away the noise...
          </p>
        </motion.div>
      </div>

      {/* 2. صورة الموديل (وسط) */}
      <motion.div
        custom={0.1}
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="relative flex justify-center items-end h-full z-0 min-w-[300px] min-h-0"
      >
        <div className="relative w-full h-[95%] 2xl:h-full max-w-[500px] 2xl:max-w-[650px]">
          <Image
            src="/images/img10.webp"
            alt="KALT New Drop Model"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* 3. كارت الخصم (يمين) */}
      <div className="flex flex-col justify-center items-end z-10 w-full pb-4 2xl:pb-12 min-h-0">
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="w-full max-w-[300px] 2xl:max-w-[360px]"
        >
          <motion.div
            // التعديل 1: زيادة مدى الحركة من -12 إلى -20
            animate={{ y: [0, -20, 0] }}
            // التعديل 2: زيادة السرعة بتقليل المدة من 4 إلى 3
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            // التعديل 3: تقوية التأثير الزجاجي والظل ليفصل الكارت عن الخلفية
            className="bg-white/40 backdrop-blur-xl border border-white/50 p-5 2xl:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] w-full will-change-transform"
          >
            {/* ... باقي محتوى الكارت كما هو ... */}
            <h3 className="text-black/60 text-xs 2xl:text-sm font-bold uppercase tracking-widest mb-2 2xl:mb-3">
              Exclusive Offer
            </h3>
            <p className="text-black font-black uppercase tracking-tight leading-none mb-4 2xl:mb-6 text-[clamp(1.2rem,1.5vw,1.5rem)] 2xl:text-2xl">
              20% Off Your <br /> First Order
            </p>
            <div className="flex items-center gap-2 2xl:gap-3 mb-5 2xl:mb-8">
              <span className="text-black/70 text-xs 2xl:text-base font-medium">
                Code:
              </span>
              <span className="bg-black/10 px-2 2xl:px-4 py-1.5 2xl:py-2 rounded-md text-black font-bold tracking-wider text-xs 2xl:text-base">
                KALT20
              </span>
            </div>
            <button
              onClick={scrollToCatalog} // 4. ربط الدالة بالزرار
              className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all"
            >
              SHOP NOW →
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. مؤشر التمرير لأسفل */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 2xl:bottom-8 right-[clamp(2rem,4vw,4rem)] flex flex-col items-center gap-2 2xl:gap-3 z-20 pointer-events-none"
      >
        <span
          className="text-black/50 text-[9px] uppercase tracking-[0.3em] font-bold rotate-180"
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
