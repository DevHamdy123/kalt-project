"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AboutSlide } from "./about-data";

interface SlideImageProps {
  currentSlide: AboutSlide;
}

export default function SlideImage({ currentSlide }: SlideImageProps) {
  // الكيرف السينمائي: طلقة في الأول عشان الـ LCP، وانزلاق بطيء في الآخر عشان الفخامة
  const premiumEase = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="flex-1 min-h-0 relative w-full flex items-center justify-center mt-2 lg:mt-0 z-10">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentSlide.id}
          // الدخول: بيبدأ بـ Scale كبير سنة وبلور خفيف، وبينزل بـ "تقل"
          initial={{ opacity: 0, scale: 1.04, x: 25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.96, x: -25, filter: "blur(4px)" }}
          transition={{
            duration: 0.7, // رجعنا للتقل المحترم
            ease: premiumEase,
          }}
          className="relative h-[85%] lg:h-auto w-auto lg:w-[80%] xl:w-[70%] max-w-md aspect-4/5 flex justify-center items-end"
        >
          <div
            className="absolute inset-0 scale-[1.03] origin-bottom bg-black/10 z-0 bg-linear-to-t from-black/40 via-transparent to-transparent drop-shadow-2xl"
            style={{
              clipPath:
                "polygon(20% 13%, 100% 12%, 100% 70%, 83% 70%, 100% 88%, 100% 100%, 17% 100%, 7% 84%, 7% 28%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 bottom-0 z-10 flex justify-center items-end drop-shadow-2xl">
            <Image
              src={currentSlide.img}
              alt={`KALT ${currentSlide.label}`}
              fill
              priority
              fetchPriority="high"
              quality={80}
              sizes="(max-width: 1024px) 80vw, 450px"
              className="object-contain object-bottom scale-[0.98] origin-bottom drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
