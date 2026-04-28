export interface AboutSlide {
  id: string;
  label: string;
  titleLine1: string;
  titleLine2: string;
  paragraph: string;
  img: string;
  details: string[];
}

export const ABOUT_SLIDES_DATA: AboutSlide[] = [
  {
    id: "01",
    label: "Philosophy",
    titleLine1: "Notjust",
    titleLine2: "_Clothing.",
    paragraph:
      "KALT is a silent statement of urban precision. We strip away the noise to leave only what matters: sharp cuts, raw aesthetics, and an unapologetic attitude.",
    img: "/images/img5.webp",
    details: ["[ Est. 2026 ]", "[ Berlin / Global ]"],
  },
  {
    id: "02",
    label: "Quality",
    titleLine1: "Technical",
    titleLine2: "Precision.",
    paragraph:
      "Every piece is engineered. Premium fabrics, precision stitching, and flawless construction. We believe in quality that feels silent yet speaks volumes.",
    img: "/images/img6.webp",
    details: ["[ Raw Finish ]", "[ Premium Cuts ]"],
  },
  {
    id: "03",
    label: "Origin",
    titleLine1: "Urban",
    titleLine2: "Pulse.",
    paragraph:
      "Born from the streets of Berlin, inspired by raw architecture and the precise beat of the urban pulse. KALT carries the rhythm of city life.",
    img: "/images/img7.webp",
    details: ["[ Street Legacy ]", "[ Berlin Bound ]"],
  },
];
