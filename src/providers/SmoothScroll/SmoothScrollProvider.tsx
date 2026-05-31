"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useMemo } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  // استخدام useMemo يضمن عدم إعادة إنشاء كائن الخصائص مع كل رندر للمشروع
  // هذا يمنع إعادة تهيئة المستمعين (Event Listeners) وهو السبب الرئيسي للاج
  const lenisOptions = useMemo(
    () => ({
      lerp: 0.05,
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    }),
    [],
  );

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
