// تم حذف "use client" ليصبح التخطيط Server Component سريع جداً
import FooterSection from "@/components/layout/Footer/FooterSection";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full">
      {/* طبقة المحتوى الأساسي 
        تحتفظ بالظل العالي وتغطي الفوتر 
      */}
      <div className="relative z-20 bg-bg-inner shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        {children}
      </div>

      {/* الفوتر هنا يعتمد على نفسه في الأنيميشن 
        وموجود في طبقة سفلية لينگشف عند التمرير 
      */}
      <FooterSection />
    </main>
  );
}
