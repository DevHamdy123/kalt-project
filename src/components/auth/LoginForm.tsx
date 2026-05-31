"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <main className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      {/* الجانب الأيسر: الهوية البصرية */}
      <div className="hidden md:flex md:w-1/2 bg-[#fcfcfc] border-r border-black/10 relative items-center justify-center overflow-hidden p-12">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('/images/noise.png')" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 text-center"
        >
          <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-black/5 mb-4">
            KALT
          </h2>
          <p className="text-black/40 font-bold uppercase tracking-[0.3em] text-xs">
            Restricted Access // Syndicate Members Only
          </p>
        </motion.div>
      </div>

      {/* الجانب الأيمن: نموذج تسجيل الدخول */}
      <div className="w-full md:w-1/2 flex flex-col px-6 py-12 md:px-16 lg:px-24 justify-center relative min-h-screen">
        <Link
          href="/"
          className="absolute top-8 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} /> Return to Base
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md mx-auto mt-12 md:mt-0"
        >
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Identify
            </h1>
            <p className="text-black/50 text-sm font-medium uppercase tracking-widest">
              Enter your credentials to access the archive.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full border-b-2 border-black/20 bg-transparent py-3 text-base font-medium outline-none transition-colors focus:border-black placeholder:text-black/20"
                placeholder="agent@kalt.com"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black underline transition-colors"
                >
                  Lost Key?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full border-b-2 border-black/20 bg-transparent py-3 text-base font-medium outline-none transition-colors focus:border-black placeholder:text-black/20 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-5 mt-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors duration-300 shadow-xl"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-black/10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-black/50">
              No access code yet?{" "}
              <Link
                href="/register"
                className="text-black hover:underline ml-2"
              >
                Enlist Now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
