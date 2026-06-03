"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react"; // ضفنا أيقونة Menu
import { useEffect, useState } from "react";
import { useSidebar } from "@/providers/SidebarProvider"; // استدعاء حالة القائمة

export function AdminNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toggle } = useSidebar(); // استخدام دالة الفتح والقفل

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-20 w-full"></div>;

  return (
    // خلينا الـ justify-between عشان الزرار ييجي يمين وباقي الحاجات شمال
    <div className="h-20 w-full flex items-center justify-between lg:justify-end px-4 md:px-8 gap-6">
      {/* زرار القائمة الجانبية (يظهر فقط في الموبايل والتابلت) */}
      <button
        onClick={toggle}
        className="lg:hidden p-2 bg-card rounded-lg border border-border/50 text-foreground hover:bg-muted transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* مجمع الثيم والبروفايل */}
      <div className="flex items-center gap-4 md:gap-6">
        <div
          className="bg-card w-16 h-8 rounded-xl flex items-center justify-between px-1 cursor-pointer shadow-sm border border-border/50"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${theme === "light" ? "bg-primary text-white" : "text-muted-foreground"}`}
          >
            <Sun className="w-4 h-4" />
          </div>
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${theme === "dark" ? "bg-primary text-white" : "text-muted-foreground"}`}
          >
            <Moon className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-foreground">
              Hey, <span className="font-bold">Admin</span>
            </p>
            <p className="text-xs text-muted-foreground">KALT_OS</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=KaltAdmin"
              alt="Admin Profile"
              className="w-full h-full object-cover bg-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
