import ConditionalFooter from "@/components/layout/Footer/ConditionalFooter";
import StoreNavbar from "@/components/shop/StoreNavbar/StoreNavbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen">
      <div className="relative z-20 bg-white antialiased flex flex-col min-h-screen shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <StoreNavbar />
        <main className="pt-24 grow w-full">{children}</main>
      </div>

      <ConditionalFooter />
    </div>
  );
}
