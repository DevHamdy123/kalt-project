"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, LogIn } from "lucide-react";
import Link from "next/link";

export default function AuthButton() {
  const { status } = useSession();

  // لو لسه بيحمل، ممكن نرجع null أو skeleton بسيط
  if (status === "loading") return null;

  if (status === "authenticated") {
    return (
      <button
        onClick={() => signOut()}
        className="w-full bg-[#b91c1c] text-white py-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:bg-red-700 transition-colors group active:scale-[0.98]"
      >
        <LogOut size={20} />
        <span className="font-bold uppercase tracking-tight">Log Out</span>
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 shadow-sm hover:scale-103 transition-all group active:scale-[0.98]"
    >
      <LogIn size={20} />
      <span className="font-bold uppercase tracking-tight">Log In</span>
    </Link>
  );
}
