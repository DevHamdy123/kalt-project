"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProfileForm() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 md:p-12 rounded-[2.5rem] w-full max-w-lg shadow-2xl flex flex-col items-center"
      >
        {/* الصورة الشخصية */}
        <div className="mb-8">
          <div className="w-28 h-28 rounded-full border-4 border-white/20 shadow-lg overflow-hidden bg-neutral-800 flex items-center justify-center relative">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              /* التعديل: هنا المنطق لو مفيش صورة */
              <div className="w-full h-full flex items-center justify-center bg-neutral-700 text-white text-4xl font-black uppercase">
                {session?.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tighter mb-10 text-white">
          MY ACCOUNT
        </h2>

        {/* بيانات العرض (عرض فقط) */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/50">
              FULL NAME
            </label>
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-5 text-base font-bold text-white shadow-sm">
              {session?.user?.name || "Zoroo"}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/50">
              EMAIL ADDRESS
            </label>
            <div className="w-full bg-white/5 border border-transparent rounded-2xl py-5 px-5 text-base font-bold text-white/70 shadow-sm">
              {session?.user?.email || "dzoroo402@gmail.com"}
            </div>
          </div>

          {/* زرار الرجوع */}
          <Link
            href="/shop"
            className="w-full bg-white text-black py-5 rounded-2xl mt-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <ArrowLeft size={16} />
            BACK TO STORE
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
