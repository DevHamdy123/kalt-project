"use client";
import { useState } from "react";
import { CATEGORIES_DATA } from "./category-data";
import SectionHeader from "./SectionHeader";
import ModelDropzone from "./ModelDropzone";
import CategoryMenu from "./CategoryMenu";
import PeripheralDecorations from "./PeripheralDecorations";
import { motion } from "framer-motion";

export default function CategoryShowcase() {
  const [activeCat, setActiveCat] = useState(CATEGORIES_DATA[0]);

  return (
    <section className="relative w-full h-dvh bg-white flex flex-col lg:flex-row items-center justify-between px-5 md:px-10 lg:px-20 pt-20 pb-8 lg:py-0 overflow-hidden">
      {/* تم تعديل كثافة اللون هنا:
        - "99" تعني أن اللون سيظهر بقوة 60% (بدلاً من 40 السابقة).
        - "85%" تعني أن اللون سيغطي مساحة أكبر من الشاشة قبل أن يندمج مع الأبيض.
      */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${activeCat.color}99 0%, rgba(255,255,255,1) 85%)`,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <SectionHeader />

      <ModelDropzone activeCat={activeCat} />

      <CategoryMenu
        categories={CATEGORIES_DATA}
        activeCat={activeCat}
        onSelect={setActiveCat}
      />

      <PeripheralDecorations />
    </section>
  );
}
