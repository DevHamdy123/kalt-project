import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseCardWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

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
          "polygon(30px 0%, 100% 0%, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0% 100%, 0% 30px)",
      }}
    >
      <div className="w-full h-full relative">{children}</div>
    </div>
  );
};
