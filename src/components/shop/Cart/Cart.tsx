"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import CheckoutDrawer from "@/components/shop/Checkout/CheckoutDrawer";

// ==========================================
// تعريف الـ Types
// ==========================================

interface CartItemType {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

interface OrderSummaryProps {
  subtotal: number;
  onCheckoutClick: () => void;
}

// ==========================================
// 1. مكون عرض المنتج في السلة (Cart Item)
// ==========================================
const CartItemCard = ({
  item,
  updateQuantity,
  removeItem,
}: CartItemCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row gap-6 border-b border-black/15 pb-8"
    >
      <div className="w-full sm:w-40 aspect-[4/5] relative bg-neutral-50 border border-black/15 shrink-0 flex items-center justify-center overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-contain object-bottom p-4 drop-shadow-sm"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-black/40 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
              ID // {item.id.slice(-6)}
            </span>
            <Link
              href={`/shop/${item.id}`}
              className="hover:opacity-70 transition-opacity"
            >
              <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter leading-none mb-2">
                {item.name}
              </h3>
            </Link>
          </div>
          <p className="text-lg lg:text-xl font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-end justify-between mt-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 block mb-2">
              Quantity
            </span>
            <div className="flex items-center border border-black/30 h-10">
              <button
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                className="w-10 h-full flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <Minus size={14} />
              </button>

              <input
                type="number"
                min="1"
                value={item.quantity === 0 ? "" : item.quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    updateQuantity(item.id, 0);
                  } else {
                    updateQuantity(item.id, parseInt(val));
                  }
                }}
                className="w-10 text-center text-xs font-bold bg-transparent outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none m-0"
                style={{ MozAppearance: "textfield" }}
              />

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-10 h-full flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              removeItem(item.id);
              toast.error(`${item.name} REMOVED FROM ARCHIVE`);
            }}
            className="text-black/60 hover:text-red-600 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. مكون ملخص الطلب (Order Summary)
// ==========================================
const OrderSummary = ({ subtotal, onCheckoutClick }: OrderSummaryProps) => {
  return (
    <div className="w-full lg:w-[380px] shrink-0">
      <div className="bg-white border border-black/20 p-8 sticky top-32 shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-black/20 pb-4">
          Summary
        </h2>

        <div className="flex flex-col gap-4 text-sm font-medium mb-8">
          <div className="flex justify-between items-center">
            <span className="text-black/60 uppercase tracking-widest text-xs">
              Subtotal
            </span>
            <span className="text-base">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black/60 uppercase tracking-widest text-xs">
              Shipping
            </span>
            <span className="text-black/40 text-xs italic uppercase">
              Calculated at checkout
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-black/20 pt-6 mb-8">
          <span className="font-bold uppercase tracking-widest text-sm">
            Total
          </span>
          <span className="text-3xl font-black">${subtotal.toFixed(2)}</span>
        </div>

        <button
          onClick={onCheckoutClick}
          className="w-full bg-black text-white py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors duration-300 shadow-lg flex items-center justify-center cursor-pointer"
        >
          Checkout Securely
        </button>

        <div className="mt-6 flex items-center justify-center gap-4 text-black/40">
          <span className="text-[10px] font-bold uppercase tracking-widest">
            SSL Encrypted
          </span>
          <span className="w-1 h-1 bg-black/30 rounded-full"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Free Returns
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. المكون الرئيسي (Main Cart Component)
// ==========================================
export default function Cart() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white pt-32 px-5 flex justify-center">
        <p className="text-sm font-bold uppercase tracking-widest animate-pulse text-black/50">
          Loading Archive...
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-white pt-32 pb-12 px-5 md:px-10 flex flex-col items-center justify-center font-sans">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center">
          Cart is Empty
        </h1>
        <p className="text-black/50 text-sm md:text-base font-medium uppercase tracking-widest mb-10 text-center max-w-md">
          Your urban archive currently holds no items.
        </p>
        <Link
          href="/shop"
          className="flex items-center gap-3 bg-black text-white px-8 py-4 text-xs lg:text-sm font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors duration-300"
        >
          Explore Catalog <ArrowRight size={16} />
        </Link>
      </section>
    );
  }

  const subtotal = getTotalPrice();

  return (
    <section className="min-h-screen bg-white pt-32 pb-20 px-5 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors mb-8 shrink-0"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-12 border-b border-black/20 pb-6">
          Your Archive
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* حاوية المنتجات */}
          <div className="flex-1 flex flex-col gap-8">
            <AnimatePresence>
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* حاوية ملخص الطلب */}
          <OrderSummary
            subtotal={subtotal}
            onCheckoutClick={() => setIsDrawerOpen(true)}
          />
        </div>
      </div>

      <CheckoutDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
}
