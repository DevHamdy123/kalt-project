import Hero from "@/components/landing/Hero";
import Moments from "@/components/landing/Moments";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Moments />
    </div>
  );
}
