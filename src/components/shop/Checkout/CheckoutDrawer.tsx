"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { createCheckoutOrder } from "@/actions/checkout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartQuery } from "@/hooks/queries/useCartQuery";
import { useQueryClient } from "@tanstack/react-query";

// --- تعريف التايبس لضمان الـ Type Safety ---
interface Product {
  price: number | string;
}

interface CartItem {
  productId: string;
  quantity: number;
  size?: string | null;
  product: Product;
}

interface CartData {
  items: CartItem[];
}

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutDrawer({
  isOpen,
  onClose,
}: CheckoutDrawerProps) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useCartQuery();
  const cart = data as CartData | undefined;

  const subtotal =
    cart?.items.reduce(
      (acc: number, item: CartItem) =>
        acc + Number(item.product.price) * item.quantity,
      0,
    ) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart) return;

    setIsProcessing(true);

    try {
      const checkoutData = {
        items: cart.items.map((item: CartItem) => ({
          id: item.productId,
          quantity: item.quantity,
          price: Number(item.product.price),
          size: item.size || undefined,
        })),
        totalPrice: subtotal,
        phone,
        address,
      };

      const result = await createCheckoutOrder(checkoutData);

      if (result.success) {
        toast.success("ORDER PLACED SUCCESSFULLY!");

        // تحديث الكاش وإفراغ السلة فوراً
        queryClient.setQueryData(["cart"], { items: [] });
        await queryClient.invalidateQueries({ queryKey: ["cart"] });

        onClose();
        router.push("/shop");
      } else {
        // رسالة الخطأ في حالة الـ Server Return
        toast.error(
          result.message || "FAILED TO PLACE ORDER. PLEASE TRY AGAIN.",
        );
      }
    } catch (error) {
      // التعامل مع أي خطأ غير متوقع
      toast.error("AN UNEXPECTED ERROR OCCURRED. PLEASE TRY AGAIN LATER.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h2 className="text-xl font-black uppercase tracking-tighter">
                Checkout
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-black/50 hover:text-black hover:bg-black/5 transition-colors rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-8 border-b border-black/10 pb-6">
                <span className="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">
                  Total Amount
                </span>
                {isLoading ? (
                  <span className="text-4xl font-black animate-pulse text-black/30">
                    Loading...
                  </span>
                ) : (
                  <span className="text-4xl font-black">
                    ${subtotal.toFixed(2)}
                  </span>
                )}
              </div>

              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 100 000 0000"
                    className="w-full p-4 border border-black/10 bg-[#fcfcfc] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="City, Area, Street, Building, Floor..."
                    className="w-full p-4 border border-black/10 bg-[#fcfcfc] focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-black/10 bg-[#fcfcfc]">
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing || isLoading || subtotal === 0}
                className="w-full bg-black text-white py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  "CONFIRM ORDER"
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
