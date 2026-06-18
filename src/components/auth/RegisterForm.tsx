"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";

const GoogleIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "NAME IS REQUIRED" }),
    email: z.string().email({ message: "INVALID EMAIL FORMAT" }),
    password: z.string().min(6, { message: "MINIMUM 6 CHARACTERS" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "PASSWORDS DO NOT MATCH",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      const response = await axios.post("/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        toast.success("Identity Created. Proceed to login.");
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Registration failed. Try again.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch {
      toast.error(`Failed to connect with ${provider}.`);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-1/2 flex flex-col px-6 py-12 md:px-16 lg:px-24 justify-center relative min-h-screen bg-white z-10"
      >
        <div>
          <Link
            href="/"
            className="absolute top-8 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Return to Base
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md mx-auto mt-12 md:mt-0"
        >
          <motion.div variants={itemVariants} className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-black">
              Enlist
            </h1>
            <p className="text-black/50 text-xs md:text-sm font-medium uppercase tracking-widest leading-relaxed">
              Create your archive access or use a secure provider.
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mb-8"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 group"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 group-focus-within:text-black transition-colors">
                Agent Name
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full border-b bg-transparent py-3 text-base font-medium outline-none transition-all duration-300 placeholder:text-black/20 [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_50px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black] ${errors.name ? "border-[#b91c1c] text-[#b91c1c]" : "border-black/10 focus:border-black text-black"}`}
                placeholder="John Doe"
              />
              {errors.name && (
                <span className="text-[#b91c1c] text-[9px] font-bold uppercase tracking-widest mt-1">
                  {errors.name.message}
                </span>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 group"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 group-focus-within:text-black transition-colors">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full border-b bg-transparent py-3 text-base font-medium outline-none transition-all duration-300 placeholder:text-black/20 [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_50px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black] ${errors.email ? "border-[#b91c1c] text-[#b91c1c]" : "border-black/10 focus:border-black text-black"}`}
                placeholder="agent@kalt.com"
              />
              {errors.email && (
                <span className="text-[#b91c1c] text-[9px] font-bold uppercase tracking-widest mt-1">
                  {errors.email.message}
                </span>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 relative group"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 group-focus-within:text-black transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full border-b bg-transparent py-3 text-base font-medium outline-none transition-all duration-300 pr-10 [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_50px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black] ${errors.password ? "border-[#b91c1c] text-[#b91c1c]" : "border-black/10 focus:border-black text-black"}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-[#b91c1c] text-[9px] font-bold uppercase tracking-widest mt-1">
                  {errors.password.message}
                </span>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 relative group"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 group-focus-within:text-black transition-colors">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full border-b bg-transparent py-3 text-base font-medium outline-none transition-all duration-300 pr-10 [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_50px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black] ${errors.confirmPassword ? "border-[#b91c1c] text-[#b91c1c]" : "border-black/10 focus:border-black text-black"}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[#b91c1c] text-[9px] font-bold uppercase tracking-widest mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 mt-2 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Create Identity"}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-black/10" />
            </div>
            <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-widest">
              <span className="bg-white px-4 text-black/40">
                Or continue with
              </span>
            </div>
          </motion.div>

          <div className="flex flex-row items-center justify-center gap-6">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleOAuthSignIn("google")}
              title="Google"
              className="w-14 h-14 rounded-full bg-white border border-black/10 text-black flex items-center justify-center transition-all duration-300 hover:border-black hover:bg-black/5 shadow-sm"
            >
              <GoogleIcon size={20} />
            </motion.button>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleOAuthSignIn("github")}
              title="Github"
              className="w-14 h-14 rounded-full bg-[#24292e] text-white flex items-center justify-center transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
            >
              <GithubIcon size={20} />
            </motion.button>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-10 pt-8 border-t border-black/5 text-center"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
              Already enlisted?{" "}
              <Link
                href="/login"
                className="text-black hover:underline ml-2 transition-colors"
              >
                Identify
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex md:w-1/2 bg-[#050505] text-white relative items-center justify-center overflow-hidden p-12 z-20"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('/images/grain.png')" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="z-10 text-center flex flex-col items-center"
        >
          <h2 className="text-7xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-6 select-none">
            KALT
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mb-6" />
          <p className="text-white/40 font-bold uppercase tracking-[0.4em] text-[10px] lg:text-xs">
            Initiation // New Blood Protocol
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
