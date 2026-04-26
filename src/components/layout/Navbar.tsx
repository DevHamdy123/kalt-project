import { Menu, Search, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between relative z-20 pt-4">
      <div className="flex-1 flex justify-start">
        <button className="w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black">
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <h2 className="font-black text-xl md:text-2xl tracking-tighter uppercase text-black/90 -translate-y-1.5 md:-translate-y-2">
          KALT
        </h2>
      </div>

      <div className="flex-1 flex justify-end gap-2 md:gap-3">
        <button className="w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black">
          <Search size={18} strokeWidth={1.5} />
        </button>

        <button className="w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black">
          <ShoppingBag size={18} strokeWidth={1.5} />
        </button>

        <button className="w-10 h-10 md:w-11 md:h-11 bg-border-white rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:bg-black hover:text-border-white hover:scale-105 transition-all duration-300 border border-white text-black">
          <User size={18} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
