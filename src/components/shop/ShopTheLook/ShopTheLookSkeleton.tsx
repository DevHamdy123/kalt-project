export default function ShopTheLookSkeleton() {
  // Section Wrapper
  return (
    <section className="w-full bg-[#fdfdfd] py-20 px-6 md:px-12 lg:px-20">
      {/* Main Grid Layout */}
      <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-10 items-center min-h-[80vh]">
        {/* Typography Skeleton */}
        <div className="lg:col-span-6 flex flex-col justify-start w-full">
          <div className="flex flex-col gap-4">
            <div className="h-12 sm:h-16 md:h-24 w-3/4 bg-neutral-200 animate-pulse rounded-md" />
            <div className="h-12 sm:h-16 md:h-24 w-1/2 bg-neutral-200 animate-pulse rounded-md" />
          </div>
          <div className="mt-8 flex flex-col gap-2 max-w-sm">
            <div className="h-3 w-full bg-neutral-200 animate-pulse rounded-sm" />
            <div className="h-3 w-5/6 bg-neutral-200 animate-pulse rounded-sm" />
            <div className="h-3 w-4/6 bg-neutral-200 animate-pulse rounded-sm" />
          </div>
        </div>

        {/* Visuals Skeleton */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="w-full max-w-lg aspect-3/4 bg-neutral-200 animate-pulse rounded-lg shadow-xl border border-black/5" />
        </div>

        {/* CTA Skeleton */}
        <div className="lg:col-span-12 flex justify-end mt-4 lg:mt-0">
          <div className="w-64 h-16 bg-neutral-200 animate-pulse rounded-none" />
        </div>
      </div>
    </section>
  );
}
