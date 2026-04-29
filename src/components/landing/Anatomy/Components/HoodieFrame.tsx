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
    const handleResize = () => setScreenWidth(window.innerWidth);
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

  const frameScale = useTransform(progress, [0, 0.15], [1, 1.1], {
    clamp: true,
  });

  const maxScale =
    screenWidth >= 1536
      ? 2.4
      : screenWidth >= 1280
        ? 2.0
        : screenWidth >= 1024
          ? 1.6
          : screenWidth >= 768
            ? 1.4
            : 1.2;

  const scale = useTransform(
    progress,
    [0, 0.05, 0.2, 0.85, 0.98, 1],
    [1, 1, maxScale, maxScale, 1, 1],
    { clamp: true },
  );

  const yOffset = useTransform(progress, [0, 0.2], [0, -20], { clamp: true });

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center w-full h-full pointer-events-none z-10"
    >
      <motion.div
        style={{ opacity: cardOpacity, scale: frameScale }}
        className="absolute w-[55vw] sm:w-[45vw] md:w-[32vw] lg:w-[320px] aspect-3/4 z-30
                before:content-[''] before:absolute before:top-0 before:left-0 
                before:border-l before:border-t before:border-black/60 before:w-6 before:h-6 transition-all
                after:content-[''] after:absolute after:bottom-0 after:right-0 
                after:border-r after:border-b after:border-black/60 after:w-6 after:h-6"
      >
        <div className="absolute top-0 right-0 border-r border-t border-black/60 w-6 h-6" />
        <div className="absolute bottom-0 left-0 border-l border-b border-black/60 w-6 h-6" />
      </motion.div>

      <motion.div
        style={{ scale, y: yOffset }}
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
    </motion.div>
  );
}
