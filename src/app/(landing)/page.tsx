import Hero from "@/components/landing/Hero/Hero";
import CollectionSection from "@/components/landing/Collection/CollectionSection";
import MomentsSection from "@/components/landing/Moments/MomentsSection";
import CategoryShowcase from "@/components/landing/Category.tsx/CategoryShowcase";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <CategoryShowcase />
      <CollectionSection />
      {/* <MomentsSection /> */}
    </div>
  );
}
