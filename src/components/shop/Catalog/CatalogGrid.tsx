import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Product {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
  category: { name: string };
}

interface CatalogGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function CatalogGrid({ products, isLoading }: CatalogGridProps) {
  const getLayoutStyles = (index: number) => {
    const position = index % 4;

    switch (position) {
      case 0:
        return {
          gridClass: "col-span-12 lg:col-span-7",
          imageAspect: "aspect-[4/5] lg:aspect-[3/4]",
        };
      case 1:
        return {
          gridClass: "col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-40",
          imageAspect: "aspect-[4/5]",
        };
      case 2:
        return {
          gridClass: "col-span-12 lg:col-span-5",
          imageAspect: "aspect-square",
        };
      case 3:
        return {
          gridClass: "col-span-12 lg:col-span-6 lg:col-start-7 lg:-mt-24",
          imageAspect: "aspect-video",
        };
      default:
        return {
          gridClass: "col-span-12 lg:col-span-7",
          imageAspect: "aspect-[4/5] lg:aspect-[3/4]",
        };
    }
  };

  return (
    <div className="grid grid-cols-12 gap-y-20 md:gap-y-32 gap-x-6 md:gap-x-10 w-full mt-10 relative">
      {isLoading ? (
        [...Array(4)].map((_, i) => {
          const { gridClass, imageAspect } = getLayoutStyles(i);
          return (
            <div key={`skeleton-${i}`} className={gridClass}>
              <ProductCardSkeleton imageAspect={imageAspect} />
            </div>
          );
        })
      ) : (
        <>
          {products.map((product, index) => {
            const { gridClass, imageAspect } = getLayoutStyles(index);

            return (
              <div key={product.id} className={gridClass}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  images={product.images}
                  category={product.category}
                  imageAspect={imageAspect}
                />
              </div>
            );
          })}

          {products.length === 0 && (
            <div className="col-span-12 py-20 text-center text-black/40 font-bold uppercase tracking-widest text-sm">
              No items found in this archive.
            </div>
          )}
        </>
      )}
    </div>
  );
}
