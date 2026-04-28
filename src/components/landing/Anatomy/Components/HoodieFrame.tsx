"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      <motion.div
        style={{ opacity: cardOpacity }}
        className="absolute w-[50vw] sm:w-[40vw] md:w-[28vw] lg:w-[300px] aspect-[3/4] bg-bg-outer brutalist-mask z-30 shadow-2xl"
      />
      <motion.div
        style={{ scale }}
        className="absolute w-[50vw] sm:w-[40vw] md:w-[28vw] lg:w-[300px] aspect-[3/4] z-40 flex items-center justify-center"
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
