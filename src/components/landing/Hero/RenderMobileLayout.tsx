import Image from "next/image";

const RenderMobileLayout = () => {
  return (
    <div className="flex md:hidden flex-col w-full h-full pt-20 pb-16 px-6 z-20 justify-between items-center relative">
      <div className="w-full text-center flex flex-col items-center z-20">
        <h2 className="text-[clamp(1.2rem,6vw,1.8rem)] font-black tracking-[0.3em] uppercase leading-none text-black/90 whitespace-nowrap">
          where - style
        </h2>
        <p className="mt-3 text-[10px] font-medium text-black/40 max-w-[80%] leading-relaxed uppercase tracking-widest">
          Crafting the future of urban essentials. Blending raw street culture
          with high-end aesthetics.
        </p>
      </div>

      <div className="relative flex-1 w-full min-h-[45vh] my-4 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src="/images/img6.webp"
            alt="Model"
            fill
            priority
            className="object-contain object-center drop-shadow-2xl"
          />
        </div>

        <button className="absolute right-3 bottom-[15%] z-30 group">
          <div className="w-24 h-24 border border-black/50 rounded-full  backdrop-blur-sm flex items-center justify-center  active:scale-95 transition-transform group-hover:border-black group-hover:bg-black cursor-pointer">
            <span className="text-[9px] font-bold text-black uppercase tracking-tighter leading-tight text-center group-hover:text-white">
              Shop '26 <br /> Collection
            </span>
          </div>
        </button>
      </div>

      <div className="w-full text-center relative z-30">
        <h2 className="text-[clamp(1.2rem,6vw,1.8rem)] font-black tracking-[0.3em] uppercase leading-none text-black/90 whitespace-nowrap">
          lives - now
        </h2>
      </div>
    </div>
  );
};

export default RenderMobileLayout;
