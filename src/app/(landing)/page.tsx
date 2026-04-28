import Hero from "@/components/landing/Hero/Hero";
import CollectionSection from "@/components/landing/Collection/CollectionSection";
import CategoryShowcase from "@/components/landing/Category.tsx/CategoryShowcase";
import AboutSection from "@/components/landing/About/AboutSection";
import AnatomySection from "@/components/landing/Anatomy/AnatomySection";
import BridgeSection from "@/components/landing/Bridge/BridgeSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <CategoryShowcase />
      <CollectionSection />
      <AboutSection />
      <AnatomySection />
      <BridgeSection />
    </div>
  );
}
