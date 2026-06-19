import { cn } from "@/lib/utils";
import { BaseCardWrapperProps } from "./Collection-data";

export const BaseCardWrapper = ({
  children,
  id,
  className = "",
}: BaseCardWrapperProps) => {
  return (
    <div
      id={id}
      className={cn(
        "w-full md:w-[23%] lg:w-[21%] xl:w-[18%] aspect-3/4 relative overflow-hidden group",
        className,
      )}
      style={{
        clipPath:
          "polygon(1.875rem 0%, 100% 0%, 100% calc(100% - 1.875rem), calc(100% - 1.875rem) 100%, 0% 100%, 0% 1.875rem)",
      }}
    >
      <div className="w-full h-full relative">{children}</div>
    </div>
  );
};
