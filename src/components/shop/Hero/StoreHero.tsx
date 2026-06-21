import StoreHeroContent from "./StoreHeroContent";

export default function StoreHero() {
  return (
    // 1. قللنا الـ min-h لـ 550px للديسكتوب عشان يناسب شاشات اللابتوب
    // 2. ظبطنا حسبة الـ calc لـ 5.5rem عشان تستوعب الناف بار والمارجن بدقة
    <section className="relative w-full h-[calc(100svh-6.8rem)] lg:h-[calc(100vh-6.8rem)] min-h-[500px] lg:min-h-[550px] pb-4 px-4 md:px-[1.25rem] flex flex-col mt-[0.5rem]">
      {/* Main Container */}
      <div
        className="relative w-full h-full rounded-4xl overflow-hidden flex items-stretch"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #E2E2E2 40%, #9E9E9E 100%)",
        }}
      >
        {/* Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/grain.png')",
          }}
        />

        {/* Content Wrapper */}
        <StoreHeroContent />
      </div>
    </section>
  );
}
