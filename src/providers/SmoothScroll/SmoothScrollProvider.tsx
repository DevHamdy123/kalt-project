"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useMemo } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisOptions = useMemo(
    () => ({
      lerp: 0.05,
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      syncTouch: true,
    }),
    [],
  );

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
