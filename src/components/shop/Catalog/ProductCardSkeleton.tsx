interface ProductCardSkeletonProps {
  imageAspect?: string;
}

const CARD_CLIP_STYLE = {
  clipPath:
    "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
} as const;

export default function ProductCardSkeleton({
  imageAspect = "aspect-[4/5]",
}: ProductCardSkeletonProps) {
  return (
    <div
      className="group flex flex-col w-full bg-white/10 backdrop-blur-md border border-white/20 animate-pulse"
      style={CARD_CLIP_STYLE}
    >
      {/* Image Placeholder */}
      <div className={`w-full bg-black/5 ${imageAspect}`} />

      {/* Content Skeleton */}
      <div className="p-6 border-t border-white/20 flex flex-col justify-between">
        <div>
          <div className="w-1/3 h-3 bg-black/10 mb-4 rounded-2xs" />
          <div className="w-2/3 h-6 bg-black/20 mb-6 rounded-2xs" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="w-12 h-5 bg-black/10 rounded-2xs" />
          <div className="w-24 h-10 bg-black/10 rounded-2xs" />
        </div>
      </div>
    </div>
  );
}
