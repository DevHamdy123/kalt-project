import Navbar from "@/components/layout/Navbar";
import Slider from "../common/Slider";
import Image from "next/image";
import HeroLabels from "./HeroLabels";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col relative bg-bg-inner overflow-hidden">
      <div className="flex-1 flex flex-col pt-6 md:pt-8 px-6 md:px-10 pb-6 relative z-10">
        <div className="relative z-20">
          <Navbar />
        </div>

        <div className="flex-1 flex items-end justify-center relative z-10 mt-4 w-full">
          <HeroLabels />
          <div className="relative w-full h-full">
            <Image
              src="/images/img6.webp"
              alt="KALT Hoodie Collection"
              fill
              priority
              quality={100}
              sizes="(max-w-768px) 100vw, 100vw"
              className="object-contain object-bottom transition-transform duration-1000 ease-out scale-105 md:scale-110"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center -z-10 select-none">
            <h1 className="text-[22vw] font-black text-black/2 tracking-tighter uppercase italic">
              KALT
            </h1>
          </div>
        </div>
      </div>

      <div className="relative z-30">
        <Slider />
      </div>
    </section>
  );
}
