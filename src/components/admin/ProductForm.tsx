"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { productSchema, ProductFormValues } from "@/lib/validations/product";
import { createProduct } from "@/actions/products";
import ImageUpload from "./ImageUpload";

// المصفوفات الثابتة لخيارات البراند بالإنجليزية
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
  categories: {
    id: string;
    name: string;
  }[];
}

export default function ProductForm({ categories }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      categoryId: "",
      images: [],
      sizes: [],
      colors: [],
    },
  });

  const images = useWatch({
    control: form.control,
    name: "images",
    defaultValue: [],
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      await createProduct(data);
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-sm border border-zinc-200">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* قسم الصور */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Images
          </label>
          <ImageUpload
            disabled={loading}
            value={images.map((image) => image.url)}
            onChange={(url) => {
              const currentImages = form.getValues("images");
              form.setValue("images", [...currentImages, { url }]);
            }}
            onRemove={(url) => {
              const currentImages = form.getValues("images");
              form.setValue(
                "images",
                currentImages.filter((image) => image.url !== url),
              );
            }}
          />
          {form.formState.errors.images && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.images.message}
            </p>
          )}
        </div>

        {/* قسم البيانات الأساسية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              disabled={loading}
              {...form.register("name")}
              className="w-full p-2.5 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="e.g., Classic Black Hoodie"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              disabled={loading}
              {...form.register("price", { valueAsNumber: true })}
              className="w-full p-2.5 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="0.00"
            />
            {form.formState.errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              disabled={loading}
              {...form.register("categoryId")}
              className="w-full p-2.5 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {form.formState.errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        {/* قسم المقاسات والألوان */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
          {/* المقاسات */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_SIZES.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 border border-zinc-200 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-50 transition"
                >
                  <input
                    type="checkbox"
                    value={size}
                    disabled={loading}
                    {...form.register("sizes")}
                    className="w-4 h-4 accent-zinc-900"
                  />
                  <span className="text-sm font-medium">{size}</span>
                </label>
              ))}
            </div>
            {form.formState.errors.sizes && (
              <p className="text-red-500 text-sm mt-2">
                {form.formState.errors.sizes.message}
              </p>
            )}
          </div>

          {/* الألوان */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Available Colors
            </label>
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_COLORS.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 border border-zinc-200 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-50 transition"
                >
                  <input
                    type="checkbox"
                    value={color}
                    disabled={loading}
                    {...form.register("colors")}
                    className="w-4 h-4 accent-zinc-900"
                  />
                  <span className="text-sm font-medium">{color}</span>
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
          className="w-full bg-zinc-900 text-white p-3.5 rounded-md hover:bg-zinc-800 transition disabled:opacity-50 font-bold mt-8"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
