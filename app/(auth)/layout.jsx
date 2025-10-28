"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";


const theme = {
  background: "#000",
  text: "#1A1A1A",
  accent: "#C9A35A",
};

export default function Layout({ children }) {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* ✅ Optional background image / gradient */}
      <Image
        src={assets.tailor_craft_image} // Add your light theme background in public/images/
        alt="Background"
        fill
        priority
        className="object-cover object-center opacity-40"
      />

      {/* ✅ Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-[#faf7f0]/70" />

      {/* ✅ Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-md text-center"
      >
        {/* Brand / Header */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-semibold tracking-tight"
            style={{ color: theme.text }}
          >
            Ibrahim Design
          </h1>
          <p className="text-sm mt-2" style={{ color: `${theme.text}99` }}>
            Welcome back — sign in to continue
          </p>
        </div>

        {/* ✅ Clerk Component Wrapper */}
        <div
          className="w-full rounded-2xl p-6 shadow-lg border"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderColor: `${theme.accent}33`,
          }}
        >
          {children}
        </div>
      </motion.div>

      {/* ✅ Decorative accent circles */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ backgroundColor: `${theme.accent}55` }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"
        style={{ backgroundColor: `${theme.text}20` }}
      />
    </div>
  );
}
