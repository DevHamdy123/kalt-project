import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";

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
        <div className="overflow-x-auto p-6">
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
                          <button className="p-2 rounded-lg text-[#7d8da1] hover:text-[#ff5c00] hover:bg-[#ff5c00]/10 transition-colors">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="p-2 rounded-lg text-[#7d8da1] hover:text-[#ff7782] hover:bg-[#ff7782]/10 transition-colors">
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
