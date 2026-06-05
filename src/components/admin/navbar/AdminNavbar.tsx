"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useSidebar } from "@/providers/SidebarProvider";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ProfileDropdown from "@/components/common/nav-elements/ProfileDropdown";

export function AdminNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toggle } = useSidebar();

  // حالة التحكم في القائمة المنسدلة
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // جلب بيانات المستخدم الحالي
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-20 w-full"></div>;

  // استخراج البيانات وتجهيز الحرف الأول كبديل للصورة
  const userName = session?.user?.name || "Admin";
  const userImage = session?.user?.image;
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="h-20 w-full flex items-center justify-between lg:justify-end px-4 md:px-8 gap-6">
      {/* زرار القائمة الجانبية */}
      <button
        onClick={toggle}
        className="lg:hidden p-2 bg-white dark:bg-[#202528] rounded-lg border border-zinc-200 dark:border-[#313338] text-[#363949] dark:text-[#edeffd] hover:bg-zinc-50 dark:hover:bg-[#181a1e] transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* مجمع الثيم والبروفايل */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* زر تغيير الثيم */}
        <div
          className="bg-white dark:bg-[#202528] w-16 h-8 rounded-xl flex items-center justify-between px-1 cursor-pointer shadow-sm border border-zinc-200 dark:border-[#313338] transition-colors"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
              theme === "light"
                ? "bg-[#ff5c00] text-white"
                : "text-[#7d8da1] dark:text-zinc-500 hover:text-[#363949] dark:hover:text-[#edeffd]"
            }`}
          >
            <Sun className="w-4 h-4" />
          </div>
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
              theme === "dark"
                ? "bg-[#ff5c00] text-white"
                : "text-[#7d8da1] dark:text-zinc-500 hover:text-[#363949] dark:hover:text-[#edeffd]"
            }`}
          >
            <Moon className="w-4 h-4" />
          </div>
        </div>

        {/* قسم البروفايل مع القائمة المنسدلة */}
        <div className="relative">
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm text-[#363949] dark:text-[#edeffd] transition-colors">
                Hey, <span className="font-bold">{userName}</span>
              </p>
              <p className="text-xs text-[#7d8da1] dark:text-zinc-400 transition-colors">
                KALT Admin
              </p>
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ff5c00]/20 group-hover:border-[#ff5c00] transition-colors bg-[#ff5c00]/10 flex items-center justify-center">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#ff5c00] font-bold text-lg">
                  {initial}
                </span>
              )}
            </div>
          </div>

          {/* استدعاء مكون القائمة المنسدلة */}
          <ProfileDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
