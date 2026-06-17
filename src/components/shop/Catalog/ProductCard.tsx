"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAddToCartMutation } from "@/hooks/queries/useCartQuery";

// Component Types
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
  category: { name: string };
  imageAspect?: string;
  stock: number;
}

export default function ProductCard({
  id,
  name,
  price,
  images,
  category,
  imageAspect = "aspect-[4/5]",
  stock,
}: ProductCardProps) {
  // Local State
  const [qty, setQty] = useState<number | string>(1);

  // Mutations
  const { mutate: addToCart, isPending } = useAddToCartMutation();

  // Constants
  const CARD_CLIP_PATH =
    "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)";

  // Derived State
  const validQty = Number(qty) || 1;
  const displayPrice = (price * validQty).toFixed(2);
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 10;

  // Render Helpers
  const renderStockStatus = () => {
    if (isOutOfStock) {
      return (
        <span className="flex items-center gap-1.5 text-[9px] font-black text-red-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Out of Stock
        </span>
      );
    }
    if (isLowStock) {
      return (
        <span className="flex items-center gap-1.5 text-[9px] font-black text-orange-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          Low Stock
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-[9px] font-black text-green-600 uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
        In Stock
      </span>
    );
  };

  // Handlers
  const handleAddToCart = () => {
    if (isOutOfStock || isPending) return;

    addToCart({
      productId: id,
      quantity: validQty,
    });

    setQty(1);
  };

  // Card Wrapper
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col w-full"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Inner Container */}
      <div
        className={`flex flex-col w-full bg-white/30 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 relative ${
          isOutOfStock ? "grayscale-[50%] opacity-80" : ""
        }`}
        style={{ clipPath: CARD_CLIP_PATH, WebkitClipPath: CARD_CLIP_PATH }}
      >
        {/* Product Image */}
        <Link
          href={`/shop/${id}`}
          className={`relative w-full block overflow-hidden ${imageAspect} ${
            isOutOfStock ? "pointer-events-none" : ""
          }`}
        >
          <Image
            src={images?.[0]?.url || "/images/placeholder.webp"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain object-top group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          />
        </Link>

        {/* Content Section */}
        <div className="flex flex-col p-6 bg-white/20 border-t-2 border-white/40">
          {/* Header & Title */}
          <div className="flex flex-col mb-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-black/50 uppercase tracking-[0.2em]">
                {category?.name || "CATEGORY"}
              </span>
              {renderStockStatus()}
            </div>

            <h3 className="font-black text-xl uppercase tracking-tighter leading-[0.9] mt-1 text-black line-clamp-1">
              {name}
            </h3>
          </div>

          {/* Price & Actions */}
          <div className="flex items-end justify-between">
            <span className="font-bold text-lg text-black">
              ${displayPrice}
            </span>

            {/* Controls */}
            <div className="flex flex-col items-end gap-3">
              {/* Quantity Input */}
              <div
                className={`flex items-center gap-1 p-1 backdrop-blur-sm border transition-colors ${
                  isOutOfStock
                    ? "border-black/5 bg-black/5 pointer-events-none opacity-50"
                    : "border-black/10 bg-black/5"
                }`}
              >
                <button
                  onClick={() => setQty(Math.max(1, validQty - 1))}
                  disabled={isOutOfStock || isPending}
                  className="px-3 py-1 font-bold hover:bg-black/10 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={stock}
                  value={qty}
                  disabled={isOutOfStock || isPending}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setQty("");
                    else setQty(Math.min(parseInt(val), stock));
                  }}
                  onBlur={() => {
                    if (qty === "" || Number(qty) < 1) setQty(1);
                  }}
                  className="w-10 text-center font-black text-sm bg-transparent outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
                />
                <button
                  onClick={() => setQty(Math.min(validQty + 1, stock))}
                  disabled={isOutOfStock || validQty >= stock || isPending}
                  className="px-3 py-1 font-bold hover:bg-black/10 disabled:opacity-50"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isPending}
                className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors w-full flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? "bg-black/20 text-black/50 cursor-not-allowed"
                    : "bg-black text-white hover:bg-black/80"
                }`}
              >
                {isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    ADDING...
                  </>
                ) : isOutOfStock ? (
                  "OUT OF STOCK"
                ) : (
                  "ADD TO CART"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
