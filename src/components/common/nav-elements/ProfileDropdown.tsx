"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onClose,
}: ProfileDropdownProps) {
  // 1. هنعمل Reference للـ div بتاع المنيو
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. دالة عشان نكتشف الضغطة بره المنيو
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    // 3. بنضيف الـ listener لما المنيو تكون مفتوحة
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 4. بنمسح الـ listener لما المنيو تقفل (Cleanup) عشان الـ Performance
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef} // 5. ربطنا الـ Ref بالعنصر
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-14 right-0 w-48 bg-white border border-black/10 rounded-xl shadow-xl z-50 p-2 overflow-hidden"
        >
          {/* رابط صفحة البروفايل */}
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-lg text-sm font-medium transition-colors"
          >
            <User size={16} /> My Account
          </Link>

          {/* زر تسجيل الخروج */}
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut size={16} /> Log Out
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
