import { ReactNode } from "react";

export interface CollectionItem {
  id: string;
  name: string;
  img: string;
}

export interface MomentItem {
  id: number;
  title: string;
  year: string;
  image: string;
  size: "large" | "medium" | "small";
}

export interface CollectionCardProps {
  item: CollectionItem;
  isHero: boolean;
}

export interface BaseCardWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const MOMENTS_DATA: MomentItem[] = [
  {
    id: 1,
    title: "URBAN SILHOUETTE",
    year: "©26",
    image: "/images/moment-1.webp",
    size: "large",
  },
  {
    id: 2,
    title: "RAW TEXTURE",
    year: "©26",
    image: "/images/moment-2.webp",
    size: "medium",
  },
  {
    id: 3,
    title: "STREET LEGACY",
    year: "©26",
    image: "/images/moment-3.webp",
    size: "small",
  },
];

export const MOCK_COLLECTION: CollectionItem[] = [
  { id: "01", name: "Essential Hoodie", img: "/images/img7.webp" },
  { id: "05", name: "Limited Shoes", img: "/images/img2.webp" },
  { id: "03", name: "Street Jeans", img: "/images/img6.webp" },
  { id: "04", name: "Raw Outer", img: "/images/img1.webp" },
  { id: "02", name: "Urban Jacket", img: "/images/img3.webp" },
  { id: "06", name: "Archive Piece", img: "/images/img4.webp" },
  { id: "07", name: "Signature Hat", img: "/images/img5.webp" },
];

export const SLOT_CLASSES: string[] = [
  "!w-[90%] lg:!w-[21%] lg:translate-y-8 aspect-[3/4]",
  "!w-[90%] lg:!w-[21%] lg:-translate-y-4 aspect-[3/4]",
  "!w-full lg:!w-[26%] z-20 drop-shadow-2xl scale-105 lg:scale-100 lg:-translate-y-8 aspect-[3/4]",
  "!w-[90%] lg:!w-[21%] lg:translate-y-12 aspect-[3/4]",
];
