"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import FooterSection from "@/components/landing/Footer/FooterSection";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef(null);

  const isFooterVisible = useInView(scrollRef, {
    amount: 0.2,
  });

  return (
    <main className="relative w-full">
      <div className="relative z-20 bg-bg-inner shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        {children}

        <div ref={scrollRef} className="h-10 w-full bg-transparent" />
      </div>

      <FooterSection isVisible={isFooterVisible} />
    </main>
  );
}
