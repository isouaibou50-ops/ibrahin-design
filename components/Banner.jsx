"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";

const ACCENT = "#C9A35A";
const WHATSAPP_NUMBER = "27837212432"; // Cape Town localized 083 721 2432083 721 2432

const Banner = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello Ibrahim Design, I’d like to inquire about your bespoke alteration and repair services.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section className="relative overflow-hidden bg-white my-24 border-y border-neutral-100">
      {/* Refined Brand Ambient Glow */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-20 rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="relative flex flex-col md:flex-row items-stretch justify-between min-h-[450px]">
        
        {/* Left Image - The Craft */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-1 relative min-h-[300px] md:min-h-auto overflow-hidden"
        >
          <Image
            src={assets.tailor_craft_image}
            alt="Tailoring workshop"
            fill
            className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Center Content - The Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-[1.2] flex flex-col items-center md:items-start justify-center text-center md:text-left px-8 md:px-16 py-16 md:py-20 bg-white z-10"
        >
          <span className="text-[10px] tracking-[0.4em] text-[#C9A35A] uppercase font-bold mb-4">
            Atelier Services
          </span>

          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 leading-[1.1] mb-6">
            Perfecting the <br />
            <span className="italic font-light">Art of the Fit</span>
          </h2>

          <p className="text-neutral-500 text-sm md:text-base max-w-md leading-relaxed mb-10 font-light">
            Every stitch tells a story. From precise bespoke tailoring to flawless restorations, we ensure your garments reflect the character and sophistication you deserve.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <Link
              href="/alterations-and-repairs"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[#1A1A1A] text-white text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#C9A35A] transition-all duration-300"
            >
              Explore Services <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={handleWhatsApp}
              className="group flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-900 hover:text-[#C9A35A] transition-colors"
            >
              <PhoneCall size={14} className="text-[#C9A35A]" />
              <span className="border-b border-neutral-200 group-hover:border-[#C9A35A] pb-1 transition-all">
                Book a Fitting
              </span>
            </button>
          </div>
        </motion.div>

        {/* Right Image - The Heritage */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="hidden lg:flex flex-1 relative overflow-hidden border-l border-neutral-50"
        >
          <Image
            src={assets.traditional_fabric_image}
            alt="African fabric artistry"
            fill
            className="object-cover"
          />
          {/* Subtle overlay to pull text focus to the center */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
