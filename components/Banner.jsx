"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

const ACCENT = "#C5A34A";
const WHATSAPP_NUMBER = "27641234567"; 

const Banner = () => {
  const handleWhatsApp = (service) => {
    const message = encodeURIComponent(
      `Hello Ibrahim Design, I’d like to inquire about your alteration services.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };
  return (
    <section className="relative overflow-hidden bg-white rounded-2xl my-20 border border-gray-100 shadow-sm">
      {/* Soft Accent Glow */}
      <div
        className="absolute top-0 left-0 w-72 h-72 bg-[color:var(--accent)]/10 rounded-full blur-3xl"
        style={{ backgroundColor: `${ACCENT}30` }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 bg-[color:var(--accent)]/10 rounded-full blur-3xl"
        style={{ backgroundColor: `${ACCENT}30` }}
        aria-hidden
      />

      <div className="relative flex flex-col md:flex-row items-center justify-between">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 flex justify-center items-center bg-gradient-to-tr from-gray-50 to-white py-8 md:py-0"
        >
          <Image
            src={assets.tailor_craft_image}
            alt="Tailoring workshop"
            width={400}
            height={400}
            className="w-4/5 md:w-[80%] lg:w-[70%] rounded-xl object-cover shadow-sm"
          />
        </motion.div>

        {/* Center Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 md:px-12 py-10 md:py-16 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 leading-snug max-w-md">
            Alterations And
            <br />
            <span style={{ color: ACCENT }}>Custom Repairs.</span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-sm leading-relaxed">
            Every stitch tells a story — from precise tailoring to flawless restorations, we ensure your garments fit your lifestyle perfectly.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2 px-8 py-2.5 rounded-full text-white text-sm md:text-base font-medium shadow-md transition"
              style={{ backgroundColor: ACCENT }}
            >
              <Link
                href="/alterations-and-repairs"
                className="text-white shadow-sm hover:opacity-90 transition"
                style={{ background: ACCENT }}
              >
                Explore Services
              </Link>
              <Image
                src={assets.arrow_icon_white}
                alt="arrow_icon_white"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWhatsApp()}
              className="flex gap-2 items-center px-8 py-2.5 border rounded-full text-sm md:text-base font-medium transition"
              style={{
                borderColor: ACCENT,
                color: ACCENT,
              }}
            >
              <PhoneCall size={16} />
              Book a Fitting
            </motion.button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden md:flex flex-1 justify-center items-center bg-gradient-to-tl from-gray-50 to-white py-8"
        >
          <Image
            src={assets.traditional_fabric_image}
            alt="African fabric"
            width={400}
            height={400}
            className="w-[70%] rounded-xl object-cover shadow-sm"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
