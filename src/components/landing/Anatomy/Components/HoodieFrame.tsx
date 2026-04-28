"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SharedAnimationProps } from "../types";

export default function HoodieFrame({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const [mounted, setMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardOpacity = useTransform(
    progress,
    [0, 0.05, 0.15, 0.9, 0.98, 1],
    [1, 1, 0, 0, 1, 1],
    { clamp: true },
  );

  // التدرج الدقيق للـ Scale حسب حجم الشاشة لمنع أي تداخل
  const maxScale =
    screenWidth >= 1536
      ? 2.4 // شاشات الـ 4K والديسكتوب
      : screenWidth >= 1280
        ? 2.0 // لابتوب عادي (xl)
        : screenWidth >= 1024
          ? 1.6 // لابتوب صغير / ايباد برو (lg)
          : screenWidth >= 768
            ? 1.4 // تابلت (md)
            : 1.2; // موبايل (sm)

  const scale = useTransform(
    progress,
    [0, 0.05, 0.15, 0.9, 0.98, 1],
    [1, 1, maxScale, maxScale, 1, 1],
    { clamp: true },
  );

  if (!mounted) return null;

  return (
    <div className="relative flex items-center justify-center w-full h-full pointer-events-none z-10">
      {/* ===================== الـ Technical Brackets [ ] ===================== */}
      <motion.div
        style={{ opacity: cardOpacity }}
        // زودنا الحجم بسيط (w-[320px]) عشان الـ Brackets تكون "برا" الهودي مش تحته
        className="absolute w-[55vw] sm:w-[45vw] md:w-[32vw] lg:w-[320px] aspect-3/4 z-30
                
                before:content-[''] before:absolute before:top-0 before:left-0 
                before:border-l before:border-t before:border-black/60 before:w-6 before:h-6
                
                after:content-[''] after:absolute after:bottom-0 after:right-0 
                after:border-r after:border-b after:border-black/60 after:w-6 after:h-6"
      >
        {/* ضفنا زوايا إضافية لو حبيت تكمل الـ 4 أركان (اختياري بس بيخليها أفخم) */}
        <div className="absolute top-0 right-0 border-r border-t border-black/60 w-6 h-6" />
        <div className="absolute bottom-0 left-0 border-l border-b border-black/60 w-6 h-6" />
      </motion.div>

      {/* ===================== الهودي ===================== */}
      <motion.div
        style={{ scale }}
        // هنا الـ lg:w-[300px] أصغر من الـ Brackets بشوية عشان يظهروا حواليه
        className="absolute w-[50vw] sm:w-[40vw] md:w-[28vw] lg:w-75 aspect-3/4 z-40 flex items-center justify-center"
      >
        <Image
          src="/images/img15.webp"
          alt="Anatomy"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </motion.div>
    </div>
  );
}
