import StoreHeroContent from "./StoreHeroContent";

export default function StoreHero() {
  return (
    // رفعنا المسافات بنسبة بسيطة (نقطة وسط) عشان نرجع الإطار الأبيض الأنيق حوالين الكونتينر
    <section className="relative w-full h-[calc(100dvh-7rem)] pb-4 px-4 md:px-[1.25rem] flex flex-col overflow-hidden mt-[0.5rem]">
      {/* Main Container */}
      <div
        className="relative w-full flex-1 rounded-4xl overflow-hidden flex items-stretch"
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
