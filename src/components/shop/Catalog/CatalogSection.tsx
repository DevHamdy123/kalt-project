"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CatalogHeader from "./CatalogHeader";
import CatalogGrid from "./CatalogGrid";
import CatalogPagination from "./CatalogPagination";
import { useProducts } from "@/hooks/queries/useProducts";
import { useLenis } from "lenis/react";

// Component Types
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: { url: string }[];
  category: { name: string };
}

// Inner component containing the searchParams logic
function CatalogContent() {
  // Routing & State
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category") || undefined;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Queries & Hooks
  const { data, isLoading, isError } = useProducts(activeCategory, currentPage);
  const lenis = useLenis();

  // Effects
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
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeCategory, lenis]);

  // Handlers
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);

    if (lenis) {
      lenis.scrollTo("#shop-catalog", {
        offset: -100,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
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

  // Derived State
  const products: Product[] = data?.products || [];
  const totalPages = data?.totalPages || 1;

  // Section Wrapper
  return (
    <section
      id="shop-catalog"
      className="relative w-full min-h-screen px-6 md:px-12 lg:px-20 pt-12 pb-12 md:pt-16 md:pb-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #E5E5E5 0%, #D4D4D4 50%, #9CA3AF 100%)",
      }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" />

      {/* Main Container */}
      <div className="max-w-375 mx-auto w-full relative z-10">
        {/* Header Section */}
        <CatalogHeader
          activeCategory={activeCategory || "ALL ARCHIVE"}
          setCategory={handleCategoryChange}
        />

        {/* Grid & States */}
        {isError ? (
          <div className="w-full py-20 text-center font-bold uppercase text-red-500">
            Error Loading Archive
          </div>
        ) : (
          <CatalogGrid products={products} isLoading={isLoading} />
        )}

        {/* Pagination */}
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

// Export the wrapper component with Suspense boundary
export default function CatalogSection() {
  return (
    <Suspense
      fallback={
        <section
          className="relative w-full min-h-screen px-6 md:px-12 lg:px-20 pt-12 pb-12 md:pt-16 md:pb-16 overflow-hidden flex items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, #E5E5E5 0%, #D4D4D4 50%, #9CA3AF 100%)",
          }}
        >
          <div className="text-black/50 font-bold uppercase tracking-widest animate-pulse">
            Loading Catalog...
          </div>
        </section>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
