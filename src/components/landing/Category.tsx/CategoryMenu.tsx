"use client";
import { CategoryData } from "./category-data";

interface CategoryMenuProps {
  categories: CategoryData[];
  activeCat: CategoryData;
  onSelect: (cat: CategoryData) => void;
}

export default function CategoryMenu({
  categories,
  activeCat,
  onSelect,
}: CategoryMenuProps) {
  return (
    <div
      className="w-fit self-end lg:w-75 lg:self-auto shrink-0 flex flex-col items-end gap-2 h-[25vh] lg:h-87.5 overflow-y-auto overscroll-contain no-scrollbar pr-2 lg:pr-5 z-20 mt-2 lg:mt-0"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
    >
      {categories.map((cat) => {
        const isActive = activeCat.id === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className={`flex items-start justify-end w-full gap-2 transition-all duration-500 group ${
              isActive ? "opacity-100" : "opacity-30 hover:opacity-60"
            }`}
          >
            <span className="text-[9px] font-mono mt-2 md:mt-3 opacity-60">
              [{cat.id}]
            </span>
            <div className="flex items-baseline gap-2">
              <h3
                className={`text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter transition-all duration-500 ${
                  isActive
                    ? "font-bold text-black"
                    : "font-normal text-gray-500"
                }`}
              >
                {cat.name}
              </h3>
              <span
                className={`text-lg lg:text-xl transition-all duration-500 ${
                  isActive
                    ? "font-medium text-black"
                    : "font-light text-gray-400"
                }`}
              >
                {cat.count}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
