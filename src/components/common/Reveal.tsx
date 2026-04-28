"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  active?: boolean;
  width?: "fit-content" | "100%";
  threshold?: number;
}

export const Reveal = ({
  children,
  delay = 0.2,
  active,
  width = "fit-content",
}: Props) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
