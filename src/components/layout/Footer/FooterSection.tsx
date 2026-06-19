"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Reveal } from "@/components/common/Reveal";

interface IFooterLink {
  name: string;
  href: string;
}

interface IFooterSection {
  title: string;
  links: IFooterLink[];
  active: boolean;
  delay?: number;
}

const FOOTER_LINKS = [
  {
    title: "Navigation",
    links: [
      { name: "Shop_All", href: "/#" },
      { name: "Collections", href: "/#" },
      { name: "Product_Anatomy", href: "#" },
      { name: "The_Bridge", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "FAQ", href: "/#" },
      { name: "Shipping_&_Returns", href: "/#" },
      { name: "Size_Guide", href: "/#" },
      { name: "Contact_Us", href: "/#" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Instagram", href: "#" },
      { name: "Twitter_X", href: "#" },
      { name: "TikTok", href: "#" },
      { name: "Discord", href: "#" },
    ],
  },
];

const Newsletter = ({ active }: { active: boolean }) => (
  <div className="lg:col-span-2 flex flex-col gap-6">
    <Reveal active={active} delay={0.1}>
      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter italic">
        Join The Syndicate.
      </h3>
    </Reveal>
    <Reveal active={active} delay={0.2}>
      <p className="max-w-sm text-[0.625rem] md:text-[0.75rem] font-mono text-neutral-500 uppercase leading-relaxed">
        Gain early access to exclusive drops, limited collaborations, and
        insider intelligence.
      </p>
    </Reveal>
    <Reveal active={active} delay={0.3} width="100%">
      <form className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-0 w-full max-w-md group">
        <input
          type="email"
          placeholder="ENTER YOUR EMAIL..."
          className="bg-transparent border-b border-white/20 text-white placeholder-neutral-700 font-mono text-[0.625rem] uppercase py-3 outline-none focus:border-white transition-all duration-500 w-full"
        />
        <button className="sm:ml-4 border border-white px-8 py-3 text-[0.625rem] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
          Subscribe
        </button>
      </form>
    </Reveal>
  </div>
);

const NavGroup = ({ title, links, active, delay = 0.1 }: IFooterSection) => (
  <div className="flex flex-col gap-6">
    <Reveal active={active} delay={delay}>
      <h4 className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-neutral-600">
        [{title}]
      </h4>
    </Reveal>
    <ul className="flex flex-col gap-3">
      {links.map((link, idx) => (
        <li key={idx}>
          <Reveal active={active} delay={delay + idx * 0.05}>
            <Link
              href={link.href}
              className="text-[0.8125rem] font-medium text-neutral-400 hover:text-white transition-all relative group flex items-center w-fit"
            >
              <span className="absolute -left-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[0.625rem]">
                ›
              </span>
              {link.name}
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  </div>
);

const LegalLinks = ({ active }: { active: boolean }) => (
  <div className="w-full px-5 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[0.5625rem] uppercase text-neutral-600 tracking-widest border-t border-white/5 pt-10">
    <Reveal active={active} delay={0.6}>
      <span>
        © {new Date().getFullYear()} KALT Studios. All Rights Reserved.
      </span>
    </Reveal>
    <div className="flex gap-8">
      <Reveal active={active} delay={0.7}>
        <Link href="#" className="hover:text-white transition-colors">
          Privacy Policy
        </Link>
      </Reveal>
      <Reveal active={active} delay={0.8}>
        <Link href="#" className="hover:text-white transition-colors">
          Terms of Service
        </Link>
      </Reveal>
    </div>
  </div>
);

const BrandSignature = () => (
  <div className="w-full overflow-hidden flex justify-center items-end leading-[0.75] select-none pointer-events-none mt-10 md:mt-0">
    <div
      aria-hidden="true"
      className="text-[28vw] md:text-[24vw] font-black tracking-tighter text-white uppercase"
    >
      KALT
    </div>
  </div>
);

export default function FooterSection() {
  const [holdVisible, setHoldVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHoldVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative lg:sticky bottom-0 left-0 w-full bg-[#080808] text-white overflow-hidden z-10 flex flex-col"
    >
      <div className="flex-1 flex flex-col justify-between pt-24 pb-6 min-h-[85vh] lg:min-h-162.5">
        {" "}
        <div className="px-5 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-10">
          <Newsletter active={holdVisible} />

          {FOOTER_LINKS.map((group, idx) => (
            <NavGroup
              key={idx}
              title={group.title}
              links={group.links}
              active={holdVisible}
              delay={0.3 + idx * 0.1}
            />
          ))}
        </div>
        <div className="flex flex-col items-center mt-16 lg:mt-0">
          <LegalLinks active={holdVisible} />
          <BrandSignature />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </footer>
  );
}
