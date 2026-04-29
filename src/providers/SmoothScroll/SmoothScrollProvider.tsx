"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode, ComponentProps } from "react";

// هنا بنجيب الـ Props الأصلية بتاعة المكتبة وبنعدل الـ children يدوي
// عشان نضمن إنها تمشي مع React 18/19
type LenisProps = ComponentProps<typeof ReactLenis> & {
  children: ReactNode;
};

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 0.8,
      }}
      // بنعمل Type Casting للـ Component نفسه مش للـ children
      // ده حل أنضف بكتير وبيحل المشكلة من جدرها
      {...({ children } as LenisProps)}
    />
  );
}
