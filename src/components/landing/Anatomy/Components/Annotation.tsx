"use client";
import { motion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { AnatomyStep, SharedAnimationProps } from "../types";

interface AnnotationProps extends SharedAnimationProps {
  step: AnatomyStep;
}

export default function Annotation({ step, progress }: AnnotationProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const opacity = useTransform(
    progress,
    [
      0,
      step.range[0],
      step.range[1] - 0.02,
      step.range[2] + 0.02,
      step.range[3],
      1,
    ],
    [0, 0, 1, 1, 0, 0],
    { clamp: true },
  );

  const pathLength = useTransform(
    progress,
    [0, step.range[0], step.range[1], step.range[2], step.range[3], 1],
    [0, 0, 1, 1, 0, 0],
    { clamp: true },
  );

  const yOffset = useTransform(
    progress,
    [step.range[0], step.range[1]],
    [20, 0],
    { clamp: true },
  );

  const isRight = step.position.side === "right";

  if (!mounted) return null;

  return (
    <motion.div
      style={{ opacity, top: step.position.top }}
      className={`absolute z-100 flex flex-col gap-1 w-27.5 sm:w-40 lg:w-50 xl:w-70 -translate-y-1/2 ${
        isRight
          ? "right-[1%] sm:right-[3%] lg:right-[4%] xl:right-[10%]"
          : "left-[1%] sm:left-[3%] lg:left-[4%] xl:left-[10%]"
      }`}
    >
      <svg
        className={`absolute top-1/2 -translate-y-1/2 w-8 sm:w-16 lg:w-20 xl:w-32 h-2 overflow-visible ${
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
          className="opacity-40"
        />
        <motion.circle
          cx={isRight ? "0" : "100"}
          cy="0"
          r="3"
          fill="black"
          style={{ opacity: pathLength }}
        />
      </svg>

      <motion.div
        style={{ y: yOffset }}
        className={`flex flex-col ${
          isRight ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <span className="font-mono text-[8px] lg:text-[10px] text-[#FF5A00] font-bold uppercase tracking-widest mb-1">
          Spec // 0{step.id}
        </span>
        <h4 className="text-sm sm:text-lg lg:text-2xl xl:text-3xl font-black uppercase tracking-tighter leading-none text-black drop-shadow-md">
          {step.title}
        </h4>
        <p className="text-[8px] sm:text-[10px] lg:text-xs xl:text-sm uppercase opacity-80 leading-tight font-medium drop-shadow-sm mt-1">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
