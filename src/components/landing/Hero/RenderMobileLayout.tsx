"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const RenderMobileLayout = () => {
  return (
    <div className="flex md:hidden flex-col w-full h-full pt-20 pb-16 px-6 z-20 justify-between items-center relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full text-center flex flex-col items-center z-20"
      >
        <h2 className="text-[clamp(1.2rem,6vw,1.8rem)] font-black tracking-[0.3em] uppercase leading-none text-black/90 whitespace-nowrap">
          where - style
        </h2>
        <p className="mt-3 text-[10px] font-medium text-black/40 max-w-[80%] leading-relaxed uppercase tracking-widest">
          Crafting the future of urban essentials. Blending raw street culture
          with high-end aesthetics.
        </p>
      </motion.div>

      <div className="relative flex-1 w-full min-h-[45vh] my-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/img6.webp"
            alt="Model"
            fill
            priority
            className="object-contain object-center drop-shadow-2xl"
          />
        </motion.div>

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="absolute right-3 bottom-[15%] z-30 group"
        >
          <div className="w-24 h-24 border border-black/50 rounded-full backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform group-hover:border-black group-hover:bg-black cursor-pointer">
            <span className="text-[9px] font-bold text-black uppercase tracking-tighter leading-tight text-center group-hover:text-white">
              Shop '26 <br /> Collection
            </span>
          </div>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="w-full text-center relative z-30"
      >
        <h2 className="text-[clamp(1.2rem,6vw,1.8rem)] font-black tracking-[0.3em] uppercase leading-none text-black/90 whitespace-nowrap">
          lives - now
        </h2>
      </motion.div>
    </div>
  );
};

export default RenderMobileLayout;
