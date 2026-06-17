"use client";

import { motion } from "framer-motion";

// Component Types
interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CatalogPaginationProps) {
  // Custom Styles
  const clipPathStyle = {
    clipPath:
      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
  };

  if (totalPages <= 1) return null;

  // Pagination Wrapper
  return (
    <div className="w-full flex justify-center items-center gap-4 mt-20 md:mt-32">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="text-black/60 hover:text-black font-bold uppercase tracking-widest text-xs disabled:opacity-30 transition-colors"
      >
        ← Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          const isActive = currentPage === pageNum;

          return (
            <motion.button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={clipPathStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 flex items-center justify-center font-black text-xs transition-all duration-300 
                ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-white/50 text-black/60 border border-black/10 hover:bg-white/80"
                }`}
            >
              {pageNum}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="text-black/60 hover:text-black font-bold uppercase tracking-widest text-xs disabled:opacity-30 transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
