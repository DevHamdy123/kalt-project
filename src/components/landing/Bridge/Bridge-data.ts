export interface BridgeCollection {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
}

export const BRIDGE_COLLECTIONS: BridgeCollection[] = [
  {
    id: 1,
    title: "Statement Pieces",
    year: "2025",
    description:
      "Your go-to wardrobe staples, crafted for comfort and effortless style.",
    image: "/images/img15.webp", // حط مسار الصورة المناسبة
  },
  {
    id: 2,
    title: "Everyday Essentials",
    year: "2026",
    description:
      "Industrial seams that withstand the urban beat and daily grind.",
    image: "/images/img15.webp",
  },
  {
    id: 3,
    title: "Timeless Classics",
    year: "2026",
    description: "Enduring designs that transcend seasonal trends.",
    image: "/images/img15.webp",
  },
  {
    id: 4,
    title: "Seasonal Collections",
    year: "2025",
    description: "Limited drops designed for the current climate.",
    image: "/images/img15.webp",
  },
];
