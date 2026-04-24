import Image from "next/image";
import HeroLabels from "./HeroLabels";

export default function HeroContent() {
  return (
    <div className="flex-1 flex flex-col relative z-10 w-full h-full overflow-hidden">
      <HeroLabels />

      {/* Mobile Designe */}
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

        <div className="relative flex-1 w-full min-h-[45vh] my-8 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/images/img6.webp"
              alt="Model"
              fill
              priority
              className="object-contain object-center drop-shadow-xl"
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
      {/* PC & TABLET Designe */}
      <div className="hidden md:flex flex-1 w-full items-center justify-center relative z-20">
        <div className="relative z-20 flex items-end h-[70vh] lg:h-[75vh] w-[clamp(28%,40vw,60%)]">
          {" "}
          <div className="absolute right-[clamp(82%,85%,90%)] top-[clamp(15%,20vh,25%)] flex flex-col items-end w-max z-30">
            <h2 className="text-[clamp(3rem,6.5vw,8rem)] font-black tracking-tighter uppercase leading-[0.75] text-right text-black/90 select-none drop-shadow-sm">
              where <br /> - style
            </h2>

            <p className="mt-10 mr-5 text-right text-[10px] xl:text-[11px] font-medium text-black/50 max-w-50 xl:max-w-60 leading-relaxed uppercase tracking-widest">
              Crafting the future of urban essentials. We blend raw street
              culture with high-end aesthetics, delivering uncompromising
              quality for those who dictate tomorrow's trends.
            </p>
          </div>
          <div className="relative w-full h-full">
            <Image
              src="/images/img6.webp"
              alt="Model"
              fill
              priority
              quality={100}
              className="object-contain object-bottom scale-[clamp(1.1,1.15,1.2)] drop-shadow-2xl"
            />
          </div>
          <div className="absolute left-[clamp(82%,85%,90%)] top-[clamp(15%,20vh,25%)] flex flex-col items-start w-max z-30">
            <h2 className="text-[clamp(3rem,6.5vw,8rem)] font-black tracking-tighter uppercase leading-[0.75] text-left text-black/90 select-none drop-shadow-sm">
              lives <br /> - now
            </h2>

            <button className="mt-8 group relative flex items-center justify-center">
              <div className="w-[clamp(100px,10vw,140px)] h-[clamp(100px,10vw,140px)] border border-black/70 rounded-full flex items-center justify-center transition-all duration-500 group-hover:border-black group-hover:bg-black cursor-pointer">
                <span className="text-[10px] xl:text-[11px] font-bold text-black group-hover:text-white transition-colors duration-500 uppercase tracking-widest leading-tight text-center">
                  Shop '26 <br /> Collection
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
