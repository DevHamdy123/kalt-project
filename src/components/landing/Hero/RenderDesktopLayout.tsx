import Image from "next/image";

const RenderDesktopLayout = () => {
  return (
    <div className="hidden md:flex flex-1 w-full items-center justify-center relative z-20">
      <div className="relative z-20 flex items-end h-[70vh] lg:h-[75vh] w-[clamp(28%,40vw,60%)]">
        {" "}
        <div className="absolute right-[clamp(82%,10vw,90%)] top-[clamp(15%,20vh,25%)] flex flex-col items-end w-max z-30">
          <h2 className="text-[clamp(3rem,6.5vw,8rem)] font-black tracking-tighter uppercase leading-[0.75] text-right text-black/90 select-none drop-shadow-sm">
            where <br /> - style
          </h2>

          <p className="mt-10 mr-5 text-right text-[10px] xl:text-[11px] font-medium text-black/50 max-w-70 xl:max-w-90 leading-relaxed uppercase tracking-widest">
            Crafting the future of urban essentials. We blend raw street culture
            with high-end aesthetics, delivering uncompromising quality for
            those who dictate tomorrow's trends.
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
        <div className="absolute left-[clamp(82%,10vw,90%)] top-[clamp(15%,20vh,25%)] flex flex-col items-start w-max z-30">
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
  );
};

export default RenderDesktopLayout;
