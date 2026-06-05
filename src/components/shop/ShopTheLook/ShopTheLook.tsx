"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner"; // عشان الإشعارات
import axios from "axios";

// ID المنتج الحقيقي من الداتا بيز
const PRODUCT_ID = "cmpm4qr9y000k1oujdr5hs7x3";

export default function ShopTheLook() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // استدعاء الـ addItem من الستور
  const addItem = useCartStore((state) => state.addItem);

  // جلب الداتا من الـ API
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", PRODUCT_ID],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products/${PRODUCT_ID}`);
      return data;
    },
  });

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || "/images/img17.webp",
      quantity: 1,
    });

    toast.success(`1x ${product.name} ADDED TO ARCHIVE`);
    setIsOpen(false);
  };

  // إغلاق الكارت عند الضغط خارجه
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading)
    return (
      <div className="py-20 text-center text-black/50">LOADING ARCHIVE...</div>
    );
  if (!product) return null;

  return (
    <section className="w-full bg-[#fdfdfd] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-10 items-center min-h-[80vh]">
        {/* العنوان */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-[0.9]"
          >
            ACQUIRE THE <br />
            FULL ARMOR.
          </motion.h2>
          <p className="mt-6 text-sm font-medium text-black/60 uppercase tracking-widest max-w-sm">
            {product.description}
          </p>
        </div>

        {/* حاوية الصورة */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg aspect-[3/4] bg-neutral-200 rounded-lg overflow-hidden shadow-2xl border border-black/5"
          >
            <Link href={`/shop/${product.id}`} className="block w-full h-full">
              <Image
                src={product.images?.[0]?.url || "/images/img17.webp"}
                alt={product.name}
                fill
                className="object-contain p-4 md:p-8 hover:scale-[1.02] transition-transform duration-500"
              />
            </Link>

            {/* Hotspot */}
            <div
              ref={containerRef}
              className="absolute top-1/2 right-4 z-30 -translate-y-1/2"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 group cursor-pointer flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-40" />
                <div className="relative w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {isOpen ? (
                    <X size={20} />
                  ) : (
                    <Plus size={24} className="text-black" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-full mt-4 right-0 w-64 bg-white border-2 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-zinc-100 relative flex-shrink-0">
                        <Image
                          src={product.images?.[0]?.url || "/images/img17.webp"}
                          alt="thumb"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div>
                          <p className="font-black text-sm uppercase leading-tight">
                            {product.name}
                          </p>
                          <p className="font-mono text-[#FF5A00] font-bold mt-1">
                            ${product.price}
                          </p>
                        </div>
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-black text-white text-[10px] uppercase font-bold py-2 hover:bg-[#FF5A00] transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* زرار الشراء الخارجي */}
        <div className="lg:col-span-12 flex justify-end">
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            className="group flex items-center gap-4 bg-black text-white px-10 py-5 uppercase font-black text-sm tracking-[0.2em]"
          >
            Acquire Full Set <span className="text-[#FF5A00]">[-15%]</span>
            <ShoppingBag size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
