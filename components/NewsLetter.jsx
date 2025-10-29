"use client";
import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-b from-neutral-50 via-white to-neutral-100 border-t border-gray-100 overflow-hidden">
      {/* Animated background accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03),transparent_70%)]"
      />

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-serif font-semibold text-gray-900 mb-3 relative z-10"
      >
        Join the Ibrahim Design Circle
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-sm md:text-base text-gray-600 max-w-lg mb-8 relative z-10"
      >
        Subscribe to receive exclusive tailoring insights, early access to new
        collections, and members-only offers — crafted with passion in the
        heart of Cape Town.
      </motion.p>

      {/* Input and Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center w-full max-w-md md:max-w-2xl border border-gray-200 rounded-full overflow-hidden shadow-sm backdrop-blur-sm bg-white/60 relative z-10"
      >
        <input
          className="flex-1 px-4 py-3 text-sm md:text-base text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="bg-gray-900 hover:bg-gray-800 transition-colors text-white font-medium px-8 md:px-12 py-3 rounded-full">
          Subscribe
        </button>
      </motion.div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-xs text-gray-400 mt-4 relative z-10"
      >
        We respect your privacy — unsubscribe anytime.
      </motion.p>
    </section>
  );
};

export default NewsLetter;
