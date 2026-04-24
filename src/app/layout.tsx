import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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
      <body className="antialiased font-sans flex flex-col min-h-screen relative bg-bg-inner text-foreground">
        <div className="fixed inset-0 pointer-events-none z-9999 border-2 md:border-4 border-border-white" />

        <main className="flex-1 w-full flex flex-col">{children}</main>
      </body>
    </html>
  );
}
