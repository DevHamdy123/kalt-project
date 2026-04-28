import Image from "next/image";
import { BaseCardWrapper } from "./BaseCardWrapper";
import { CollectionCardProps } from "./Collection-data";

export const CollectionCard = ({ item, isHero }: CollectionCardProps) => {
  return (
    <BaseCardWrapper
      id={isHero ? "dropzone" : undefined}
      className="w-full! h-full! relative block"
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent group-hover:opacity-100 transition-opacity duration-500">
        <Image
          src={item.img}
          alt="KALT Piece"
          fill
          className="object-cover object-center"
        />
        <div className="absolute top-4 right-4 z-10 flex flex-col">
          <span className="text-[9px] text-black/70 bg-white/80 px-2 py-0.5 backdrop-blur-sm font-mono uppercase tracking-widest">
            [ {item.id} ]
          </span>
        </div>
        <div className="absolute bottom-4 left-4 z-10 w-full pr-8">
          <p className="text-xs text-white font-bold uppercase tracking-tighter mix-blend-difference">
            {item.name}
          </p>
        </div>
        {isHero && <div className="absolute inset-0 bg-black/5" />}
      </div>
    </BaseCardWrapper>
  );
};
