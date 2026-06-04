import ProductForm from "@/components/admin/products/ProductForm";
import { getCategories } from "@/actions/categories";

export default async function NewProductPage() {
  // استدعاء البيانات من الخارج للحفاظ على نظافة الكود
  const categories = await getCategories();

  return (
    <div className="w-full">
      <ProductForm categories={categories} />
    </div>
  );
}
