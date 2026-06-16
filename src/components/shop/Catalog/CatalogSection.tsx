"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CatalogHeader from "./CatalogHeader";
import CatalogGrid from "./CatalogGrid";
import CatalogPagination from "./CatalogPagination";
import { useProducts } from "@/hooks/queries/useProducts";
import { useLenis } from "lenis/react";

export default function CatalogSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category") || undefined;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError } = useProducts(activeCategory, currentPage);
  const lenis = useLenis();

  useEffect(() => {
    setCurrentPage(1);

    if (window.location.hash === "#shop-catalog") {
      const timer = setTimeout(() => {
        if (lenis) {
          lenis.scrollTo("#shop-catalog", {
            offset: -100,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          const element = document.getElementById("shop-catalog");
          if (element) {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100,
              behavior: "smooth",
            });
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [activeCategory, lenis]);
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);

    if (lenis) {
      lenis.scrollTo("#shop-catalog", {
        offset: -100,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.getElementById("shop-catalog");
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 100,
          behavior: "auto",
        });
      }
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    const slug =
      newCategory === "ALL ARCHIVE"
        ? undefined
        : newCategory.toLowerCase().replace(/\s+/g, "-");

    if (slug !== activeCategory) {
      setCurrentPage(1);

      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }

      router.push(`${pathname}?${params.toString()}#shop-catalog`, {
        scroll: false,
      });

      if (lenis) {
        lenis.scrollTo("#shop-catalog", { offset: -100, duration: 1.2 });
      }
    }
  };

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section
      id="shop-catalog"
      className="relative w-full min-h-screen px-4 md:px-8 lg:px-12 pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #E5E5E5 0%, #D4D4D4 50%, #9CA3AF 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('/images/grain.png')" }}
      />

      <div className="max-w-400 mx-auto w-full relative z-10">
        <CatalogHeader
          activeCategory={activeCategory || "ALL ARCHIVE"}
          setCategory={handleCategoryChange}
        />

        {isError ? (
          <div className="w-full py-20 text-center font-bold uppercase text-red-500">
            Error Loading Archive
          </div>
        ) : (
          <CatalogGrid products={products} isLoading={isLoading} />
        )}

        {totalPages > 1 && (
          <CatalogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
