"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Scissors } from "lucide-react";

const ACCENT = "#C5A34A"; // your gold-accent color

export default function AlterationsPreview() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 px-5 md:py-24 overflow-hidden">
      {/* Background Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <Scissors size={320} />
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-4">
            Alterations & Repairs
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            From simple fixes to intricate redesigns, our experienced tailors bring precision and style to every stitch. 
            Whether it’s adjusting the fit of your jeans, restyling a dress, or repairing a suit, 
            we treat each garment with care and craftsmanship.
          </p>

          <Link
            href="/alterations-and-repairs"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-medium text-white shadow-sm hover:opacity-90 transition"
            style={{ background: ACCENT }}
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/about-bg.webp" // replace with your real image
            alt="Tailor performing alterations"
            width={600}
            height={400}
            className="object-cover w-full h-72 md:h-[400px]"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Tag Label */}
          <div className="absolute bottom-4 left-4 bg-white/90 text-gray-900 text-xs md:text-sm font-medium px-3 py-1 rounded-full shadow-sm">
            Handcrafted Precision
          </div>
        </motion.div>
      </div>
    </section>
  );
}
