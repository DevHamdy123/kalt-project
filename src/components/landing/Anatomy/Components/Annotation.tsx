"use client";
import { motion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
// استدعاء التايبس اللي عرفناها في الملف المنفصل
import { AnatomyStep, SharedAnimationProps } from "../types";

// تعريف الـ Props الخاصة بالـ Component ده بناءً على التايبس الأساسية
interface AnnotationProps extends SharedAnimationProps {
  step: AnatomyStep;
}

export default function Annotation({ step, progress }: AnnotationProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // هنا الفريمر موشن دلوقتى عارف إن step.range عبارة عن [number, number, number, number]
  const opacity = useTransform(
    progress,
    [0, step.range[0], step.range[1], step.range[2], step.range[3], 1],
    [0, 0, 1, 1, 0, 0],
    { clamp: true },
  );

  const pathLength = useTransform(
    progress,
    [0, step.range[0], step.range[1], step.range[2], step.range[3], 1],
    [0, 0, 1, 1, 0, 0],
    { clamp: true },
  );

  const isRight = step.position.side === "right";

  if (!mounted) return null;

  return (
    <motion.div
      style={{ opacity, top: step.position.top }}
      className={`absolute z-[100] flex flex-col gap-1 w-[110px] sm:w-[160px] lg:w-[200px] xl:w-[280px] -translate-y-1/2 ${
        isRight
          ? "right-[1%] sm:right-[3%] lg:right-[4%] xl:right-[10%]"
          : "left-[1%] sm:left-[3%] lg:left-[4%] xl:left-[10%]"
      }`}
    >
      <svg
        className={`absolute top-1/2 -translate-y-1/2 w-3 sm:w-10 lg:w-14 xl:w-24 h-2 overflow-visible ${
          isRight
            ? "right-full mr-1 lg:mr-3 xl:mr-4"
            : "left-full ml-1 lg:ml-3 xl:ml-4"
        }`}
      >
        <motion.path
          d={isRight ? "M 100 0 L 0 0" : "M 0 0 L 100 0"}
          stroke="black"
          strokeWidth="1.5"
          style={{ pathLength }}
          className="opacity-30"
        />
      </svg>
      <div
        className={`flex flex-col ${
          isRight ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <span className="font-mono text-[8px] lg:text-[10px] text-accent-orange font-bold uppercase tracking-widest mb-1">
          Spec // 0{step.id}
        </span>
        <h4 className="text-sm sm:text-lg lg:text-2xl xl:text-3xl font-black uppercase tracking-tighter leading-none text-black drop-shadow-md">
          {step.title}
        </h4>
        <p className="text-[8px] sm:text-[10px] lg:text-xs xl:text-sm uppercase opacity-80 leading-tight font-medium drop-shadow-sm mt-1">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
