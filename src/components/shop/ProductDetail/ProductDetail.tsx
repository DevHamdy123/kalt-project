"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useProduct } from "@/hooks/queries/useProducts";
import {
  useAddToCartMutation,
  useCartQuery,
} from "@/hooks/queries/useCartQuery";

// Component Types
interface ProductImage {
  url: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: ProductImage[];
  description?: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

interface ProductDetailProps {
  productId: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  // Local State
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState<number | string>(1);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  // Queries & Mutations
  const { mutate: addToCart, isPending } = useAddToCartMutation();
  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(productId) as {
    data: Product | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  const { refetch } = useCartQuery();

  // Effects
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [productId]);

  // Loading State
  if (isLoading) {
    return (
      <div className="h-[calc(100vh)] bg-white pt-24 flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-widest animate-pulse text-black/50">
          Loading Archive...
        </p>
      </div>
    );
  }

  // Error State
  if (isError || !product) {
    return (
      <div className="h-[calc(100vh)] bg-white pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold uppercase tracking-widest text-red-500">
          Product Not Found
        </p>
        <Link
          href="/shop"
          className="underline text-sm font-medium uppercase tracking-widest"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Derived State
  const validQuantity = Number(quantity) || 1;
  const displayPrice = (product.price * validQuantity).toFixed(2);
  const isOutOfStock = product.stock <= 0;

  // Handlers
  const handleAddToCart = async () => {
    if (isOutOfStock || isPending) return;

    // Fetch fresh cart data
    const result = await refetch();
    const freshCartData = result.data as CartData | undefined;

    // Calculate current quantity in cart
    const existingItem = freshCartData?.items?.find(
      (item: CartItem) => item.productId === product.id,
    );
    const quantityInCart = existingItem ? existingItem.quantity : 0;
    const totalRequested = quantityInCart + validQuantity;

    // Stock validation guard
    if (totalRequested > product.stock) {
      toast.error(
        `Cannot add to cart. You have ${quantityInCart} in your cart, and only ${product.stock} available in total.`,
      );
      return;
    }

    // Submit to server
    addToCart(
      {
        productId: product.id,
        quantity: validQuantity,
        size: selectedSize,
      },
      {
        onSuccess: () => {
          toast.success(
            `${validQuantity}x ${product.name} (Size: ${selectedSize}) ADDED TO ARCHIVE`,
          );
          setQuantity(1);
        },
        onError: (error: unknown) => {
          // Type casting the error safely
          const apiError = error as ApiError;
          const errorMessage =
            apiError?.response?.data?.message || "Failed to add item to cart.";
          toast.error(errorMessage);
        },
      },
    );
  };

  // Section Wrapper
  return (
    <section className="lg:h-[calc(100vh)] min-h-screen bg-white pt-24 pb-8 px-5 md:px-10 lg:px-20 font-sans flex flex-col lg:overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors mb-6 shrink-0"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        {/* Product Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1 min-h-0">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative min-h-[40vh] lg:min-h-0 bg-neutral-300 border border-black/35 flex items-end justify-center overflow-hidden"
          >
            <Image
              src={product.images?.[0]?.url || "/images/img6.webp"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-bottom drop-shadow-xl"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-center overflow-y-auto pr-2"
          >
            {/* Header Details */}
            <div className="mb-6">
              <span className="text-black/40 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                ID // {product.id.slice(-6)}
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-none mb-3 text-black">
                {product.name}
              </h1>
              <p className="text-2xl lg:text-3xl font-light text-black/80">
                ${displayPrice}
              </p>
            </div>

            <p className="text-sm lg:text-base text-black/60 leading-relaxed font-medium mb-8 max-w-md uppercase tracking-widest">
              {product.description ||
                "Premium urban wear engineered for comfort and structure."}
            </p>

            <div className="flex flex-col xl:flex-row xl:items-end gap-6 mb-8">
              {/* Size Selector */}
              <div className="flex-1">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-black">
                    Select Size
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border text-xs lg:text-sm font-bold transition-all duration-300 ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-black/20 bg-transparent text-black hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-black block mb-3">
                  Quantity ({product.stock} available)
                </span>
                <div className="flex items-center border border-black/20 h-10 lg:h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, validQuantity - 1))}
                    disabled={isOutOfStock || isPending}
                    className="w-10 lg:w-12 h-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  >
                    <Minus size={14} />
                  </button>

                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    disabled={isOutOfStock || isPending}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (isNaN(val)) setQuantity("");
                      else setQuantity(Math.min(val, product.stock));
                    }}
                    onBlur={() => {
                      if (quantity === "" || Number(quantity) < 1)
                        setQuantity(1);
                    }}
                    className="w-10 lg:w-12 text-center text-xs lg:text-sm font-bold bg-transparent outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  <button
                    onClick={() =>
                      setQuantity(Math.min(validQuantity + 1, product.stock))
                    }
                    disabled={
                      isOutOfStock ||
                      validQuantity >= product.stock ||
                      isPending
                    }
                    className="w-10 lg:w-12 h-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isPending}
              className="w-full bg-black text-white py-4 lg:py-5 text-xs lg:text-sm font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors duration-300 shadow-lg shrink-0 disabled:opacity-50"
            >
              {isPending
                ? "ADDING..."
                : isOutOfStock
                  ? "OUT OF STOCK"
                  : "Add To Cart"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
