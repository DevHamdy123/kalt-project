import FooterSection from "@/components/layout/Footer/FooterSection";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full">
      <div className="relative z-20 bg-bg-inner shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        {children}
      </div>

      <FooterSection />
    </main>
  );
}
