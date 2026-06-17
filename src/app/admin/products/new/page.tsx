import ProductForm from "@/components/admin/products/ProductForm";
import { getCategories } from "@/actions/categories";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="w-full">
      <ProductForm categories={categories} />
    </div>
  );
}
