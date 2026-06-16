"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
  category: { name: string };
  imageAspect?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  images,
  category,
  imageAspect = "aspect-[4/5]",
}: ProductCardProps) {
  const [qty, setQty] = useState<number | string>(1);

  const addItem = useCartStore((state) => state.addItem);

  const CARD_CLIP_PATH =
    "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)";

  // const IMAGE_CLIP_PATH = "polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)";

  const validQty = Number(qty) || 1;
  const displayPrice = (price * validQty).toFixed(2);

  const handleAddToCart = () => {
    addItem({
      id: id,
      name: name,
      price: price,
      image: images?.[0]?.url || "/images/placeholder.webp",
      quantity: validQty,
    });

    toast.success(`${validQty}x ${name} ADDED TO ARCHIVE`);

    setQty(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col w-full"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="flex flex-col w-full bg-white/30 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 relative"
        style={{ clipPath: CARD_CLIP_PATH, WebkitClipPath: CARD_CLIP_PATH }}
      >
        <Link
          href={`/shop/${id}`}
          className={`relative w-full block overflow-hidden ${imageAspect}`}
        >
          <Image
            src={images?.[0]?.url || "/images/placeholder.webp"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain object-top group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          />
        </Link>

        <div className="flex flex-col p-6 bg-white/20 border-t-2 border-white/40">
          <div className="flex flex-col mb-6">
            <span className="text-[10px] font-bold text-black/50 uppercase tracking-[0.2em]">
              {category?.name || "CATEGORY"}
            </span>
            <h3 className="font-black text-xl uppercase tracking-tighter leading-[0.9] mt-2 text-black line-clamp-1">
              {name}
            </h3>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-bold text-lg text-black">
              ${displayPrice}
            </span>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-1 bg-black/5 p-1 backdrop-blur-sm border border-black/10">
                <button
                  onClick={() => setQty(Math.max(1, validQty - 1))}
                  className="px-3 py-1 font-bold hover:bg-black/10"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setQty("");
                    else setQty(parseInt(val));
                  }}
                  onBlur={() => {
                    if (qty === "" || Number(qty) < 1) setQty(1);
                  }}
                  className="w-10 text-center font-black text-sm bg-transparent outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQty(validQty + 1)}
                  className="px-3 py-1 font-bold hover:bg-black/10"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-black/80 transition-colors w-full"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
