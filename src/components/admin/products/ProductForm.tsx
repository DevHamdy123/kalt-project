"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { productSchema, ProductFormValues } from "@/lib/validations/product";
// استيراد دالة الإضافة ودالة التحديث مع بعض
import { createProduct, updateProduct } from "@/actions/products";

import ImageUpload from "../ImageUpload";

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];
const AVAILABLE_COLORS = [
  "Black",
  "White",
  "Grey",
  "Navy",
  "Beige",
  "Red",
  "Olive",
];

interface ProductFormProps {
  categories?: {
    id: string;
    name: string;
  }[];
  // 1. إضافة الـ Types الخاصة ببيانات التعديل
  initialData?: (ProductFormValues & { id: string }) | null;
}

interface CustomSelectProps {
  options: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select Category",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.id === value)?.name || placeholder;

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 border border-zinc-300 dark:border-[#313338] rounded-md cursor-pointer flex justify-between items-center bg-white dark:bg-[#181a1e] hover:border-zinc-400 dark:hover:border-zinc-500 transition focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-[#ff5c00]"
      >
        <span
          className={
            value
              ? "text-[#363949] dark:text-[#edeffd]"
              : "text-[#7d8da1] dark:text-zinc-500"
          }
        >
          {selectedLabel}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#7d8da1] dark:text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-[#202528] border border-zinc-200 dark:border-[#313338] rounded-md shadow-lg z-50 py-1 max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-[#181a1e] cursor-pointer text-sm text-[#7d8da1] dark:text-zinc-400 hover:text-[#ff5c00] dark:hover:text-[#ff5c00] transition-colors"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 2. استقبال initialData ضمن الـ Props
export default function ProductForm({
  categories = [],
  initialData,
}: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // تحديد العنوان والنصوص بناءً على وجود بيانات سابقة
  const title = initialData ? "Edit Product" : "Add New Product";
  const actionText = initialData ? "Update Product" : "Save Product";
  const loadingText = initialData ? "Updating..." : "Saving...";

  // 3. ربط البيانات القديمة بالفورم
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      stock: 0,
      categoryId: "",
      images: [],
      sizes: [],
      colors: [],
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      const formattedData = {
        ...data,
        sizes: Array.isArray(data.sizes) ? data.sizes : [data.sizes],
        colors: Array.isArray(data.colors)
          ? data.colors
          : data.colors
            ? [data.colors]
            : [],
      };

      if (initialData) {
        // تنفيذ عملية التحديث الفعلية
        await updateProduct(initialData.id, formattedData);
      } else {
        // تنفيذ عملية الإضافة
        await createProduct(formattedData);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-[#202528] rounded-md shadow-sm border border-zinc-200 dark:border-[#313338] transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-[#363949] dark:text-[#edeffd]">
        {title}
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#7d8da1] dark:text-zinc-400">
            Product Images
          </label>
          <ImageUpload
            disabled={loading}
            value={form.watch("images").map((image) => image.url)}
            onChange={(url) => {
              const currentImages = form.getValues("images");
              form.setValue("images", [...currentImages, { url }], {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            onRemove={(url) => {
              const currentImages = form.getValues("images");
              form.setValue(
                "images",
                currentImages.filter((image) => image.url !== url),
                { shouldValidate: true, shouldDirty: true },
              );
            }}
          />
          {form.formState.errors.images && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.images.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#7d8da1] dark:text-zinc-400">
              Product Name
            </label>
            <input
              disabled={loading}
              {...form.register("name")}
              className="w-full p-2.5 border border-zinc-300 dark:border-[#313338] bg-white dark:bg-[#181a1e] text-[#363949] dark:text-[#edeffd] rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-[#ff5c00] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              placeholder="e.g., Classic Black Hoodie"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#7d8da1] dark:text-zinc-400">
              Price
            </label>
            <input
              type="number"
              disabled={loading}
              {...form.register("price", { valueAsNumber: true })}
              className="w-full p-2.5 border border-zinc-300 dark:border-[#313338] bg-white dark:bg-[#181a1e] text-[#363949] dark:text-[#edeffd] rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-[#ff5c00] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              placeholder="0.00"
            />
            {form.formState.errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#7d8da1] dark:text-zinc-400">
              Stock
            </label>
            <input
              type="number"
              disabled={loading}
              {...form.register("stock", { valueAsNumber: true })}
              className="w-full p-2.5 border border-zinc-300 dark:border-[#313338] bg-white dark:bg-[#181a1e] text-[#363949] dark:text-[#edeffd] rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-[#ff5c00] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              placeholder="0"
            />
            {form.formState.errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.stock.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#7d8da1] dark:text-zinc-400">
              Category
            </label>
            <Controller
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <CustomSelect
                  options={categories}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {form.formState.errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-[#313338]">
          <div>
            <label className="block text-sm font-medium mb-3 text-[#7d8da1] dark:text-zinc-400">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_SIZES.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 border border-zinc-200 dark:border-[#313338] px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#181a1e] transition-colors"
                >
                  <input
                    type="checkbox"
                    value={size}
                    disabled={loading}
                    {...form.register("sizes")}
                    className="appearance-none w-4 h-4 border border-zinc-300 rounded-sm bg-white checked:bg-zinc-900 checked:border-zinc-900 dark:bg-[#181a1e] dark:border-[#313338] dark:checked:bg-[#ff5c00] dark:checked:border-[#ff5c00] cursor-pointer relative after:absolute after:hidden checked:after:block after:left-[4px] after:top-[1px] after:w-[5px] after:h-[10px] after:border-r-[2px] after:border-b-[2px] after:border-white after:rotate-45 transition-colors"
                  />
                  <span className="text-sm font-medium text-[#7d8da1] dark:text-zinc-400">
                    {size}
                  </span>
                </label>
              ))}
            </div>
            {form.formState.errors.sizes && (
              <p className="text-red-500 text-sm mt-2">
                {form.formState.errors.sizes.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-[#7d8da1] dark:text-zinc-400">
              Available Colors
            </label>
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_COLORS.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 border border-zinc-200 dark:border-[#313338] px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#181a1e] transition-colors"
                >
                  <input
                    type="checkbox"
                    value={color}
                    disabled={loading}
                    {...form.register("colors")}
                    className="appearance-none w-4 h-4 border border-zinc-300 rounded-sm bg-white checked:bg-zinc-900 checked:border-zinc-900 dark:bg-[#181a1e] dark:border-[#313338] dark:checked:bg-[#ff5c00] dark:checked:border-[#ff5c00] cursor-pointer relative after:absolute after:hidden checked:after:block after:left-[4px] after:top-[1px] after:w-[5px] after:h-[10px] after:border-r-[2px] after:border-b-[2px] after:border-white after:rotate-45 transition-colors"
                  />
                  <span className="text-sm font-medium text-[#7d8da1] dark:text-zinc-400">
                    {color}
                  </span>
                </label>
              ))}
            </div>
            {form.formState.errors.colors && (
              <p className="text-red-500 text-sm mt-2">
                {form.formState.errors.colors.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 dark:bg-[#ff5c00] text-white p-3.5 rounded-md hover:bg-zinc-800 dark:hover:bg-[#e05200] transition-colors disabled:opacity-50 font-bold mt-8"
        >
          {loading ? loadingText : actionText}
        </button>
      </form>
    </div>
  );
}
