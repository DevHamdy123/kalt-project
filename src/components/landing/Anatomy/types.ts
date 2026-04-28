import { MotionValue } from "framer-motion";

export type Side = "left" | "right";

export interface AnatomyStep {
  id: number;
  range: [number, number, number, number];
  title: string;
  description: string;
  position: {
    top: string;
    side: Side;
  };
}

export interface SharedAnimationProps {
  progress: MotionValue<number>;
}
