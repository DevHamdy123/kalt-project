import Image from "next/image";
import { BaseCardWrapper } from "./BaseCardWrapper";
import { CollectionCardProps } from "./Collection-data";

export const CollectionCard = ({ item, isHero }: CollectionCardProps) => {
  return (
    <BaseCardWrapper
      id={isHero ? "dropzone" : undefined}
      className="w-full! h-full! relative block"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/5">
        <Image
          src={item.img}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover object-center transition-transform duration-1000 ease-out ${
            isHero ? "scale-105" : "scale-100 group-hover:scale-105"
          }`}
        />

        <div
          className={`absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-700 ${
            isHero ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />

        <div
          className={`absolute top-4 right-4 z-10 flex flex-col transition-all duration-700 ${
            isHero
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          <span className="text-[9px] text-black/90 bg-white/90 px-2 py-0.5 backdrop-blur-sm font-mono uppercase tracking-widest">
            [ {item.id} ]
          </span>
        </div>

        <div
          className={`absolute bottom-4 left-4 z-10 w-full pr-8 transition-all duration-700 ${
            isHero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          <p className="text-xs text-white font-bold uppercase tracking-tighter drop-shadow-md">
            {item.name}
          </p>
        </div>
      </div>
    </BaseCardWrapper>
  );
};
