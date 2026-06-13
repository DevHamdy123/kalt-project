"use client";
import { useState } from "react";
import { CATEGORIES_DATA } from "./category-data";
import SectionHeader from "./SectionHeader";
import ModelDropzone from "./ModelDropzone";
import CategoryMenu from "./CategoryMenu";
import PeripheralDecorations from "./PeripheralDecorations";
import { motion } from "framer-motion";
import Slider from "@/components/common/Slider";

export default function CategoryShowcase() {
  const [activeCat, setActiveCat] = useState(CATEGORIES_DATA[0]);

  return (
    <section className="relative w-full h-dvh bg-white flex flex-col lg:flex-row items-center justify-between px-5 md:px-10 lg:px-20 pt-20 pb-8 lg:py-0 overflow-hidden">
      {/* الخلفية */}
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

      <div className="absolute bottom-0 left-0 w-full z-20">
        <Slider theme="light" />
      </div>

      <PeripheralDecorations />
    </section>
  );
}
