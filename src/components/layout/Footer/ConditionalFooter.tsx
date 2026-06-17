"use client";

import { usePathname } from "next/navigation";
import FooterSection from "./FooterSection";

export default function ConditionalFooter() {
  const pathname = usePathname();

  const isProductPage =
    /^\/shop\/[^\/]+$/.test(pathname) && pathname !== "/shop/cart";

  const isCartPage = pathname === "/shop/cart";

  if (isProductPage || isCartPage) {
    return null;
  }

  return <FooterSection />;
}
