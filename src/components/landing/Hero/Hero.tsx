import Navbar from "@/components/layout/Navbar/Navbar";
import Slider from "@/components/common/Slider";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col relative bg-bg-inner overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/images/grain.png')] bg-repeat opacity-[0.04] mix-blend-multiply" />
      <div className="flex-1 flex flex-col pt-6 md:pt-8 px-6 md:px-10 pb-6 md:pb-0 relative z-10">
        {" "}
        {/* Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>
        {/* Content & Images */}
        <HeroContent />
        <div className="absolute inset-0 flex items-center justify-center -z-10 select-none pointer-events-none">
          <h1 className="text-[22vw] font-black text-black/2 tracking-tighter uppercase italic">
            KALT
          </h1>
        </div>
      </div>

      {/* Slider */}
      <div className="relative z-30">
        <Slider />
      </div>
    </section>
  );
}
