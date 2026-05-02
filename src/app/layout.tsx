import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScroll/SmoothScrollProvider";

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
        <SmoothScrollProvider>
          <div className="fixed inset-0 pointer-events-none z-50" />

          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
