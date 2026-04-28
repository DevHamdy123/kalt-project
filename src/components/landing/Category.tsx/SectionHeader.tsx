export default function SectionHeader() {
  return (
    <div className="w-full lg:w-62.5 xl:w-75 shrink-0 flex flex-col z-20 text-center lg:text-left mb-2 lg:mb-0">
      <h2 className="text-[clamp(2rem,4vw,3.5rem)] uppercase tracking-tighter leading-none text-black wrap-break-word mb-3 lg:mb-0 lg:absolute lg:top-20 lg:left-20 z-30 font-light">
        <span className="font-light opacity-90">Urban</span>
        <span className="font-bold">_Catalog</span>
      </h2>
      <p className="text-[11px] lg:text-[13px] leading-relaxed tracking-widest font-medium opacity-50 uppercase max-w-62.5 mx-auto lg:mx-0">
        Every piece carries rhythm beyond clothing it's motion and meaning where
        street energy meets
      </p>
    </div>
  );
}
