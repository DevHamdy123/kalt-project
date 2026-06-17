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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-14 right-0 w-48 bg-white dark:bg-[#202528] border border-black/10 dark:border-[#313338] rounded-xl shadow-xl dark:shadow-[0_2rem_3rem_rgba(0,0,0,0.4)] z-50 p-2 overflow-hidden"
        >
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-[#363949] dark:text-[#edeffd] hover:bg-neutral-50 dark:hover:bg-[#181a1e] rounded-lg text-sm font-medium transition-colors"
          >
            <User size={16} /> My Account
          </Link>

          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut size={16} /> Log Out
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
