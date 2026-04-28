"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

interface Props {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <>{children}</>
    </ReactLenis>
  );
}
