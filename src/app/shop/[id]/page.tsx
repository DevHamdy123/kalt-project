import ProductDetail from "@/components/shop/ProductDetail/ProductDetail"; // تأكد من صحة مسار الاستدعاء

// تعريف نوع البيانات كـ Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

// إضافة async للدالة
export default async function SingleProductPage({ params }: PageProps) {
  // فك الـ Promise باستخدام await
  const { id } = await params;

  // تمرير الـ id بعد فكه للكومبوننت
  return <ProductDetail productId={id} />;
}
