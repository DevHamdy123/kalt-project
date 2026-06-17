"use client";

// Component Types
interface ProductCardSkeletonProps {
  imageAspect?: string;
}

export default function ProductCardSkeleton({
  imageAspect = "aspect-[4/5]",
}: ProductCardSkeletonProps) {
  // Custom Styles
  const clipPathStyle = {
    clipPath:
      "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
  };

  // Skeleton Wrapper
  return (
    <div
      className="group flex flex-col w-full bg-white/10 backdrop-blur-md border border-white/20 animate-pulse"
      style={clipPathStyle}
    >
      {/* Image Placeholder */}
      <div className={`w-full bg-black/5 ${imageAspect}`} />

      {/* Content Skeleton */}
      <div className="p-6 border-t border-white/20">
        {/* Header Lines */}
        <div className="w-1/3 h-3 bg-black/10 mb-4" />
        <div className="w-2/3 h-6 bg-black/20 mb-6" />

        {/* Bottom Section */}
        <div className="flex justify-between items-center">
          <div className="w-12 h-5 bg-black/10" />
          <div className="w-24 h-10 bg-black/10" />
        </div>
      </div>
    </div>
  );
}
