import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScroll/SmoothScrollProvider";
import QueryProvider from "@/providers/QueryProvider";
// 1. استيراد مزود المصادقة
import AuthProvider from "@/providers/AuthProvider";
// 2. استيراد التوستر
import { Toaster } from "sonner";
// استيراد الثيم
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KALT | Live Style Now",
  description: "Modern Streetwear & Elegance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={geistSans.variable}>
      <body className="antialiased font-sans relative text-foreground selection:bg-black selection:text-white">
        {/* تغليف المشروع بمزود الثيم لحل مشكلة السكريبت */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {/* تغليف الموقع بالكامل بمزود المصادقة */}
          <AuthProvider>
            <QueryProvider>
              <SmoothScrollProvider>
                <div className="fixed inset-0 pointer-events-none z-50" />

                <main>{children}</main>
              </SmoothScrollProvider>
            </QueryProvider>
          </AuthProvider>

          {/* 3. إضافة التوستر هنا عشان يشتغل على مستوى المشروع كله */}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
