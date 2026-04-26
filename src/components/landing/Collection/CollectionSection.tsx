import Slider from "@/components/common/Slider";
import { BaseCardWrapper } from "./BaseCardWrapper";
import Image from "next/image";

const CollectionSection = () => {
  return (
    <section className="w-full h-dvh bg-[#FDFDFD] flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col w-full px-5 md:px-[clamp(20px,5vw,80px)] py-4 justify-between min-h-0">
        <div className="shrink-0">
          <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] font-bold uppercase tracking-tighter leading-none">
            NEW_COLLECTION -
          </h2>
        </div>

        <div className="flex-1 min-h-0 w-full flex items-center justify-center my-2 lg:my-0">
          <div className="w-full max-w-125 lg:max-w-full grid grid-cols-2 lg:flex lg:flex-row justify-items-center lg:justify-between items-center gap-4 lg:gap-0 h-full max-h-full">
            {/* كارت 1 */}
            <BaseCardWrapper className="w-[90%]! lg:w-[21%]! lg:translate-y-8">
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent  group-hover:opacity-100 transition-opacity duration-500">
                <Image
                  src="/images/img7.webp"
                  alt="KALT Piece"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-4 right-4 z-10 flex flex-col">
                  <span className="text-[9px] text-black/70 bg-white/80 px-2 py-0.5 backdrop-blur-sm font-mono uppercase tracking-widest">
                    [ 01 ]
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 z-10 w-full pr-8">
                  <p className="text-xs text-white font-bold uppercase tracking-tighter mix-blend-difference">
                    Essential Hoodie
                  </p>
                </div>
              </div>
            </BaseCardWrapper>

            {/* كارت 2 */}
            <BaseCardWrapper className="w-[90%]! lg:w-[21%]! lg:-translate-y-4">
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent  group-hover:opacity-100 transition-opacity duration-500">
                <Image
                  src="/images/img3.webp"
                  alt="KALT Piece"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-4 right-4 z-10 flex flex-col">
                  <span className="text-[9px] text-black/70 bg-white/80 px-2 py-0.5 backdrop-blur-sm font-mono uppercase tracking-widest">
                    [ 02 ]
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 z-10 w-full pr-8">
                  <p className="text-xs text-white font-bold uppercase tracking-tighter mix-blend-difference">
                    Essential Hoodie
                  </p>
                </div>
              </div>
            </BaseCardWrapper>

            {/* كارت 3 (Dropzone البطل) */}
            <BaseCardWrapper
              id="dropzone"
              className="w-full! lg:w-[26%]! z-20  shadow-2xl scale-105 lg:scale-100 lg:-translate-y-8"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent  group-hover:opacity-100 transition-opacity duration-500">
                <Image
                  src="/images/img6.webp"
                  alt="KALT Piece"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-4 right-4 z-10 flex flex-col">
                  <span className="text-[9px] text-black/70 bg-white/80 px-2 py-0.5 backdrop-blur-sm font-mono uppercase tracking-widest">
                    [ 03 ]
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 z-10 w-full pr-8">
                  <p className="text-xs text-white font-bold uppercase tracking-tighter mix-blend-difference">
                    Essential Hoodie
                  </p>
                </div>
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </BaseCardWrapper>

            <BaseCardWrapper className="w-[90%]! lg:w-[21%]! lg:translate-y-12">
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent  group-hover:opacity-100 transition-opacity duration-500">
                <Image
                  src="/images/img1.webp"
                  alt="KALT Piece"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-4 right-4 z-10 flex flex-col">
                  <span className="text-[9px] text-black/70 bg-white/80 px-2 py-0.5 backdrop-blur-sm font-mono uppercase tracking-widest">
                    [ 04 ]
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 z-10 w-full pr-8">
                  <p className="text-xs text-white font-bold uppercase tracking-tighter mix-blend-difference">
                    Essential Hoodie
                  </p>
                </div>
              </div>
            </BaseCardWrapper>
          </div>
        </div>

        {/* === زرار FOR_MORE === */}
        <div className="shrink-0 w-full pt-2 flex flex-row items-center justify-center gap-3 md:gap-5 border-t border-black/5">
          <span className="text-[clamp(1.2rem,4vw,2.5rem)] font-bold uppercase tracking-tighter leading-none">
            FOR_MORE
          </span>
          <button className="flex shrink-0 items-center justify-center w-[clamp(32px,4vw,48px)] h-[clamp(32px,4vw,48px)] rounded-full border border-black hover:bg-black hover:text-white transition-all duration-500 cursor-pointer group">
            <span className="text-xl md:text-2xl font-light leading-none transition-transform duration-500 ">
              +
            </span>
          </button>
        </div>
      </div>

      {/* === السلايدر === */}
      <Slider theme="light" />
    </section>
  );
};

export default CollectionSection;
