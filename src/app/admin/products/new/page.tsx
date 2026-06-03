import ProductForm from "@/components/admin/ProductForm";
import { getCategories } from "@/actions/categories";

export default async function NewProductPage() {
  // استدعاء البيانات من الخارج للحفاظ على نظافة الكود
  const categories = await getCategories();

  return (
    <div className="p-6">
      <ProductForm categories={categories} />
    </div>
  );
}
