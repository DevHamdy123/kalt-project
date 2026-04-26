import HeroLabels from "./HeroLabels";
import RenderDesktopLayout from "./RenderDesktopLayout";
import RenderMobileLayout from "./RenderMobileLayout";

export default function HeroContent() {
  return (
    <div className="flex-1 flex flex-col relative z-10 w-full h-full overflow-hidden">
      <HeroLabels />
      <RenderMobileLayout />
      <RenderDesktopLayout />
    </div>
  );
}
