const luxLabelStyle =
  "text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-mono text-black/50 select-none";

export default function HeroLabels() {
  return (
    <>
      <span className={`${luxLabelStyle} absolute top-3 left-0 pt-2`}>
        © KALT STUDIO / ©26
      </span>

      <span
        className={`${luxLabelStyle} absolute top-3 right-0 pt-2 text-right`}
      >
        URBAN / <br /> ESSENTIALS '26
      </span>

      <span className="absolute bottom-1 right-35 pb-2 text-white text-5xl ">
        ✦
      </span>

      <span
        className={`${luxLabelStyle} absolute bottom-0 md:bottom-8 left-0 pb-2`}
      >
        HIGH-END / STREETWEAR
      </span>

      <span
        className={`${luxLabelStyle} absolute bottom-0 md:bottom-8 right-0 pb-2 text-right`}
      >
        LIVE STYLE / <br /> NOW
      </span>
    </>
  );
}
