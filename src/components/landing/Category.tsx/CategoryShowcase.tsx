"use client";
import { useState } from "react";
import { CATEGORIES_DATA } from "./category-data";
import SectionHeader from "./SectionHeader";
import ModelDropzone from "./ModelDropzone";
import CategoryMenu from "./CategoryMenu";
import PeripheralDecorations from "./PeripheralDecorations";

export default function CategoryShowcase() {
  const [activeCat, setActiveCat] = useState(CATEGORIES_DATA[4]);

  return (
    <section className="relative w-full h-dvh bg-white flex flex-col lg:flex-row items-center justify-between px-5 md:px-10 lg:px-20 pt-20 pb-8 lg:py-0 overflow-hidden">
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
