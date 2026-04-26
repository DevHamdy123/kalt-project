import Image from "next/image";

interface MomentCardProps {
  image: string;
  title: string;
  year: string;
  className?: string;
  priority?: boolean;
}

export const MomentCard = ({
  image,
  title,
  year,
  className,
  priority = false,
}: MomentCardProps) => (
  <div className={`relative overflow-hidden group w-full h-full ${className}`}>
    <Image
      src={image}
      alt={title}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] scale-110 group-hover:scale-100"
    />
    <div className="absolute bottom-6 left-6 text-white mix-blend-difference z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <p className="text-[10px] tracking-[0.3em] uppercase mb-1">{year}</p>
      <h3 className="text-lg font-bold uppercase tracking-tighter leading-none">
        {title}
      </h3>
    </div>
  </div>
);
