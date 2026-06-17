import ProductDetail from "@/components/shop/ProductDetail/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleProductPage({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetail productId={id} />;
}
