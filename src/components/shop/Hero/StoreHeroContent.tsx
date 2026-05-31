import StoreDesktopLayout from "./StoreDesktopLayout";
import StoreMobileLayout from "./StoreMobileLayout";

export default function StoreHeroContent() {
  return (
    <div className="relative w-full h-full">
      <StoreMobileLayout />
      <StoreDesktopLayout />
    </div>
  );
}
