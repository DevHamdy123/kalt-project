import StoreHero from "@/components/shop/Hero/StoreHero";
import CatalogSection from "@/components/shop/Catalog/CatalogSection";
import ManifestoSection from "@/components/shop/Manifesto/ManifestoSection";
import ShopTheLook from "@/components/shop/ShopTheLook/ShopTheLook";

export default function ShopPage() {
  return (
    <>
      <StoreHero />
      <ShopTheLook />
      <CatalogSection />
      <ManifestoSection />
    </>
  );
}
