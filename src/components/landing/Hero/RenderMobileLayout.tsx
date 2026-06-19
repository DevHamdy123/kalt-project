"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CUSTOM_EASE = [0.22, 1, 0.36, 1] as const;

const RenderMobileLayout = () => {
  return (
    <div className="flex md:hidden flex-col w-full h-full pt-24 pb-16 px-6 z-20 justify-start items-center relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full text-center flex flex-col items-center z-30 mb-8"
      >
        <h2 className="text-[clamp(1.8rem,8vw,2.5rem)] font-black tracking-[0.15em] uppercase leading-tight text-black/90">
          WHERE STYLE <br /> LIVES NOW
        </h2>

        <p className="mt-4 text-[0.6875rem] sm:text-xs font-bold text-black/70 max-w-[90%] leading-relaxed uppercase tracking-widest">
          Crafting the future of urban essentials. Blending raw street culture
          with high-end aesthetics.
        </p>
      </motion.div>

      <div
        className="relative flex-1 w-full flex items-center justify-center mt-4"
        style={{ contain: "layout paint" }}
      >
        <div className="relative w-full aspect-[4/5] max-w-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: CUSTOM_EASE }}
            className="absolute inset-0 will-change-transform transform-gpu"
          >
            <Image
              src="/images/img6.webp"
              alt="Model"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-bottom scale-[1.15] origin-bottom"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute right-3 bottom-[25%] z-40 group"
          >
            <Link href="/shop">
              <div className="w-[7.5rem] h-[7.5rem] bg-white/40 border border-black/50 rounded-full backdrop-blur-md flex items-center justify-center active:scale-95 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:shadow-xl cursor-pointer">
                <span className="text-[0.7rem] font-bold text-black uppercase tracking-tighter leading-tight text-center transition-colors group-hover:text-white">
                  Shop '26 <br /> Collection
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RenderMobileLayout;
