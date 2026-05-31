import ConditionalFooter from "@/components/layout/Footer/ConditionalFooter";
import StoreNavbar from "@/components/shop/StoreNavbar/StoreNavbar";
// 1. استدعاء التوستر هنا
import { Toaster } from "sonner";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. الحاوية الأساسية: بدون خلفية بيضاء لكي لا تغطي الفوتر
    <div className="relative w-full min-h-screen">
      {/* 2. طبقة المحتوى: تأخذ الخلفية البيضاء والظل وتغطي الفوتر */}
      <div className="relative z-20 bg-white antialiased flex flex-col min-h-screen shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <StoreNavbar />
        <main className="pt-24 grow w-full">{children}</main>
      </div>

      {/* 3. الفوتر: مستقر في الخلف وينكشف عند الوصول لنهاية طبقة المحتوى */}
      <ConditionalFooter />

      {/* 4. حاوية الإشعارات: تضاف هنا لتكون متاحة في كل صفحات المتجر */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "black",
            color: "white",
            border: "1px solid #333",
            borderRadius: "0px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontSize: "12px",
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
}
