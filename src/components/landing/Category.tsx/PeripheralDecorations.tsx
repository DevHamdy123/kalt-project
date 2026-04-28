"use client";

export default function PeripheralDecorations() {
  return (
    <>
      {/* 1. زرار See Product - فوق شمال في الموبايل / تحت شمال في الديسكتوب */}
      <div className="absolute top-4 left-4 lg:top-auto lg:bottom-10 lg:left-10 border border-black rounded-full px-4 lg:px-6 py-1.5 lg:py-2 text-[10px] lg:text-xs uppercase font-bold cursor-pointer hover:bg-black hover:text-white transition-all z-30 bg-white/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none leading-none">
        See Product →
      </div>

      {/* 2. كلمة Categories - تحت شمال في الموبايل / تحت يمين في الديسكتوب */}
      {/* هنا التعديل الجوهري: بنصفر الـ right في الموبايل ونفعلها في الديسكتوب */}
      <div className="absolute bottom-4 left-5 right-auto lg:left-auto lg:bottom-10 lg:right-10 text-[8px] lg:text-[10px] uppercase font-mono tracking-[0.2em] z-30 leading-none">
        <span className="opacity-40">[Categories.....]</span>
      </div>

      {/* 3. الهوية FW // 2026 - فوق يمين دايماً */}
      <div className="absolute top-4 right-4 lg:top-20 lg:right-20 z-30 flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <span className="text-accent-orange text-sm lg:text-2xl leading-none">
            ✦
          </span>
          <span className="font-mono text-[9px] lg:text-[11px] uppercase tracking-widest opacity-80 font-medium text-black">
            [ FW // 2026 ]
          </span>
        </div>

        {/* رقم السيكشن - بيظهر تحت الهوية */}
        <span className="font-mono text-[8px] lg:text-[10px] uppercase tracking-[0.2em] opacity-40 text-black pr-1">
          SEC. 02 — 05
        </span>
      </div>
    </>
  );
}
