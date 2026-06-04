"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, AlertTriangle, X } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteProduct } from "@/actions/products";

// تعريف شكل البيانات اللي جاية من الداتا بيز
type ProductType = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

export default function ProductsList({
  products,
}: {
  products: ProductType[];
}) {
  const [isPending, startTransition] = useTransition();

  // حالات للتحكم في النافذة المنبثقة (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // دالة فتح النافذة
  const openDeleteModal = (id: string) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  // دالة إغلاق النافذة
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  // دالة الحذف الفعلية اللي بتشتغل لما ندوس تأكيد من النافذة
  const confirmDelete = () => {
    if (!productToDelete) return;

    startTransition(async () => {
      try {
        await deleteProduct(productToDelete);
        closeDeleteModal(); // نقفل النافذة بعد الحذف بنجاح
      } catch (error) {
        console.error(error);
        alert("Failed to delete the product"); // رسالة خطأ احتياطية لو حصلت مشكلة في السيرفر
      }
    });
  };

  // دالة لتحديد حالة المخزون ولون البادج أوتوماتيك
  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return {
        text: "Out of Stock",
        classes: "bg-[#ff7782]/10 text-[#ff7782]",
      };
    if (stock <= 10)
      return { text: "Low Stock", classes: "bg-[#ffbb55]/10 text-[#ffbb55]" };
    return { text: "In Stock", classes: "bg-[#41f1b6]/10 text-[#41f1b6]" };
  };

  return (
    <div className="pb-12 px-4 md:px-0">
      {/* ---------- بداية كود النافذة المنبثقة (Modal) ---------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="bg-white dark:bg-[#202528] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-zinc-100 dark:border-[#313338] animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-full bg-[#ff7782]/10 flex items-center justify-center text-[#ff7782]">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <button
                  onClick={closeDeleteModal}
                  disabled={isPending}
                  className="text-[#7d8da1] hover:bg-[#f6f6f9] dark:hover:bg-[#181a1e] p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-[#363949] dark:text-[#edeffd] mb-2">
                Delete Product
              </h3>
              <p className="text-[#7d8da1] dark:text-zinc-400">
                Are you sure you want to delete this product? This action cannot
                be undone and will remove it from your store permanently.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#f6f6f9] dark:bg-[#181a1e] border-t border-zinc-100 dark:border-[#313338]">
              <button
                onClick={closeDeleteModal}
                disabled={isPending}
                className="px-4 py-2 rounded-xl font-medium text-[#7d8da1] hover:text-[#363949] dark:hover:text-[#edeffd] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-white bg-[#ff7782] hover:bg-[#e06570] transition-colors disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ---------- نهاية كود النافذة المنبثقة ---------- */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#363949] dark:text-[#edeffd] transition-colors">
            Products
          </h1>
          <p className="text-sm text-[#7d8da1] dark:text-zinc-400 transition-colors mt-1">
            Manage your store products, pricing, and inventory.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#ff5c00] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#e65300] transition-colors shadow-md shadow-[#ff5c00]/20"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Link>
      </div>

      <div className="bg-white dark:bg-[#202528] rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] hover:shadow-none transition-all duration-300 overflow-hidden">
        {/* تصميم الموبايل - بطاقات */}
        <div className="block md:hidden p-4 space-y-4">
          {products.length === 0 ? (
            <div className="text-center py-8 text-[#7d8da1] dark:text-zinc-400">
              No products found. Add some!
            </div>
          ) : (
            products.map((product) => {
              const status = getStockStatus(product.stock);
              return (
                <div
                  key={product.id}
                  className="bg-[#f6f6f9] dark:bg-[#181a1e] rounded-2xl p-4 border border-zinc-100 dark:border-[#313338] flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white dark:bg-[#202528] flex-shrink-0 border border-zinc-100 dark:border-[#313338]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-[#363949] dark:text-[#edeffd]">
                        {product.name}
                      </span>
                      <span className="text-sm text-[#7d8da1] dark:text-zinc-400">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#7d8da1] dark:text-zinc-400 text-sm font-medium">
                      Price
                    </span>
                    <span className="font-bold text-[#363949] dark:text-[#edeffd]">
                      USD {product.price}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#7d8da1] dark:text-zinc-400 text-sm font-medium">
                      Stock
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-[#363949] dark:text-[#edeffd]">
                        {product.stock}
                      </span>
                      <span
                        className={`px-3 py-1 text-[11px] font-bold rounded-full ${status.classes}`}
                      >
                        {status.text}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2.5 rounded-lg text-[#7d8da1] hover:text-[#ff5c00] bg-white dark:bg-[#202528] hover:bg-[#ff5c00]/10 transition-colors border border-zinc-100 dark:border-[#313338] flex items-center justify-center"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => openDeleteModal(product.id)}
                      className="p-2.5 rounded-lg text-[#7d8da1] hover:text-[#ff7782] bg-white dark:bg-[#202528] hover:bg-[#ff7782]/10 transition-colors border border-zinc-100 dark:border-[#313338]"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* تصميم الشاشات الكبيرة - جدول */}
        <div className="hidden md:block overflow-x-auto p-6">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#f6f6f9] dark:border-[#313338] text-[#363949] dark:text-[#edeffd] font-bold transition-colors">
                <th className="py-4 px-4">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-[#7d8da1] dark:text-zinc-400"
                  >
                    No products found. Add some!
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const status = getStockStatus(product.stock);

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-[#f6f6f9] dark:border-[#313338] last:border-none text-[#7d8da1] dark:text-zinc-400 hover:bg-[#f6f6f9] dark:hover:bg-[#181a1e] transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#f6f6f9] dark:bg-[#181a1e] flex-shrink-0 border border-zinc-100 dark:border-[#313338]">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <span className="font-medium text-[#363949] dark:text-[#edeffd] transition-colors">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{product.category}</td>
                      <td className="py-4 px-4 font-medium text-[#363949] dark:text-[#edeffd]">
                        USD {product.price}
                      </td>
                      <td className="py-4 px-4">{product.stock}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${status.classes}`}
                        >
                          {status.text}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 rounded-lg text-[#7d8da1] hover:text-[#ff5c00] hover:bg-[#ff5c00]/10 transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => openDeleteModal(product.id)}
                            className="p-2 rounded-lg text-[#7d8da1] hover:text-[#ff7782] hover:bg-[#ff7782]/10 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
