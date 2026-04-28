"use client";

interface SliderControlsProps {
  handlePrev: () => void;
  handleNext: () => void;
}

export default function SliderControls({
  handlePrev,
  handleNext,
}: SliderControlsProps) {
  return (
    <div className="shrink-0 mt-4 lg:mt-0 pt-4 lg:pt-8 border-t border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-3 lg:gap-4 z-20">
      <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-widest opacity-70 font-medium text-black/90">
        KALT Philosophy Journey // The Precise Pulse
      </span>

      <div className="flex flex-row items-center gap-3 self-end md:self-auto">
        <button
          onClick={handlePrev}
          className="flex shrink-0 items-center justify-center w-9 lg:w-12 h-9 lg:h-12 rounded-full border border-black hover:bg-black hover:text-white transition-all duration-500 cursor-pointer group"
        >
          <span className="text-lg lg:text-2xl font-light leading-none text-black group-hover:text-white transition-all duration-500 ">
            ←
          </span>
        </button>

        <button
          onClick={handleNext}
          className="flex shrink-0 items-center justify-center w-9 lg:w-12 h-9 lg:h-12 rounded-full border border-black hover:bg-black hover:text-white transition-all duration-500 cursor-pointer group"
        >
          <span className="text-lg lg:text-2xl font-light leading-none text-black group-hover:text-white transition-all duration-500 ">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
