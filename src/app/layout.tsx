import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScroll/SmoothScrollProvider";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "sonner";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <AuthProvider>
            <QueryProvider>
              <SmoothScrollProvider>
                <div className="fixed inset-0 pointer-events-none z-50" />
                <main className="relative">{children}</main>
              </SmoothScrollProvider>
            </QueryProvider>
          </AuthProvider>

          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
