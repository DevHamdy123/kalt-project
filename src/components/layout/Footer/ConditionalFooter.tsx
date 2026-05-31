"use client";

import { usePathname } from "next/navigation";
import FooterSection from "./FooterSection";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // فحص إذا كان المسار يخص صفحة منتج فردي
  const isProductPage =
    /^\/shop\/[^\/]+$/.test(pathname) && pathname !== "/shop/cart";

  // فحص إذا كان المسار يخص صفحة السلة
  const isCartPage = pathname === "/shop/cart";

  // التعديل هنا: لو إحنا في صفحة المنتج "أو" صفحة السلة، متعملش ريندر للفوتر
  if (isProductPage || isCartPage) {
    return null;
  }

  return <FooterSection />;
}
