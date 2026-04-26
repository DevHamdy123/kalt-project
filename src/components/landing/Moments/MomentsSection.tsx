import Image from "next/image";
import { BaseCardWrapper } from "../Collection/BaseCardWrapper";

const products = [
  { id: 1, name: "Jacket Momento", price: "120$", img: "/images/img1.webp" },
  { id: 2, name: "Velour Hoodie", price: "95$", img: "/images/img2.webp" },
  { id: 3, name: "Street Tee", price: "45$", img: "/images/img3.webp" },
  { id: 4, name: "Cargo Pants", price: "110$", img: "/images/img4.webp" },
];

const MomentsSection = () => {
  return (
    <section className="w-full min-h-dvh bg-white py-20 flex flex-col overflow-hidden">
      {/* 1. الهيدر بستايل الريفرنس */}
      <div className="px-5 md:px-[clamp(20px,5vw,80px)] mb-12 flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-sm font-mono uppercase opacity-60">
            ©velour -
          </span>
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold uppercase tracking-tighter leading-none">
            jacket momento
          </h2>
        </div>

        {/* زراير التنقل (الدوائر) */}
        <div className="hidden md:flex gap-4">
          <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            ←
          </button>
          <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            →
          </button>
        </div>
      </div>

      {/* 2. الـ Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto px-5 md:px-[clamp(20px,5vw,80px)] no-scrollbar cursor-grab active:cursor-grabbing">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-70 md:min-w-87.5 flex flex-col gap-4 group"
          >
            <BaseCardWrapper className="w-full! aspect-3/4">
              <div className="w-full h-full relative bg-gray-100">
                {/* هنا هتحط الـ Image بـ fill و object-cover */}
                <Image
                  src={product.img}
                  alt="KALT Piece"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] bg-white px-2 py-1 rounded-full uppercase font-bold">
                    Wear the Moment
                  </span>
                </div>
              </div>
            </BaseCardWrapper>

            {/* تفاصيل المنتج */}
            <div className="flex justify-between items-start mt-2">
              <h3 className="text-sm font-bold uppercase tracking-tight">
                {product.name}
              </h3>
              <span className="text-sm font-mono opacity-60">
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MomentsSection;
