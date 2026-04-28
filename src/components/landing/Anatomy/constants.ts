import { AnatomyStep } from "./types";

export const ANATOMY_STEPS: AnatomyStep[] = [
  {
    id: 1,
    range: [0.15, 0.2, 0.35, 0.4],
    title: "450 GSM Heavy Cotton",
    description: "Engineered for the ultimate structural fit.",
    position: { top: "30%", side: "right" },
  },
  {
    id: 2,
    range: [0.4, 0.45, 0.6, 0.65],
    title: "Reinforced Overlock",
    description: "Industrial seams that withstand the urban beat.",
    position: { top: "50%", side: "left" },
  },
  {
    id: 3,
    range: [0.65, 0.7, 0.85, 0.9],
    title: "Hidden Utility Tech",
    description: "Seamless pockets integrated into the silhouette.",
    position: { top: "75%", side: "right" },
  },
];
