"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Ruler,
  Sparkles,
  Shirt,
  ChevronRight,
  PhoneCall,
  Check,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// SERVICES DATA
// ─────────────────────────────────────────────────────────────

const SERVICES_DATA = [
  {
    id: "general-repairs",
    category: "repairs",
    title: "General Repairs",
    tagline:
      "Professional garment repairs carefully executed to restore everyday pieces to their best condition.",
    price: "Request a Quote",
    timeframe: "Tailored to the repair",
    features: [
      "Garment damage assessment",
      "Professional stitching repairs",
      "Seam and fastening repairs",
      "Careful finishing and inspection",
    ],
    icon: Scissors,
    gradient:
      "from-amber-500/20 via-orange-600/5 to-transparent",
  },
  {
    id: "invisible-seams",
    category: "repairs",
    title: "Invisible Seams",
    tagline:
      "Discreet seam repairs designed to preserve the original appearance and finish of your garment.",
    price: "Request a Quote",
    timeframe: "Precision Finish",
    features: [
      "Discreet seam restoration",
      "Minimal visible stitching",
      "Matching thread selection",
      "Detailed finishing",
    ],
    icon: Sparkles,
    gradient:
      "from-violet-500/20 via-fuchsia-600/5 to-transparent",
  },
  {
    id: "childrens-alterations",
    category: "alterations",
    title: "Children's Clothing Alterations",
    tagline:
      "Careful alterations for children's garments, ensuring comfortable fits without compromising the original design.",
    price: "Request a Quote",
    timeframe: "Garment Dependent",
    features: [
      "Size adjustments",
      "Length alterations",
      "Waist adjustments",
      "Repairs and garment refinements",
    ],
    icon: Shirt,
    gradient:
      "from-blue-500/20 via-cyan-600/5 to-transparent",
  },
  {
    id: "leather-repair",
    category: "repairs",
    title: "Leather Repair",
    tagline:
      "Specialised repair work for leather garments and pieces requiring careful handling and durable finishing.",
    price: "Request a Quote",
    timeframe: "Assessment Required",
    features: [
      "Leather damage assessment",
      "Seam and stitching repairs",
      "Structural repairs",
      "Careful finishing",
    ],
    icon: Scissors,
    gradient:
      "from-stone-500/20 via-neutral-600/5 to-transparent",
  },
  {
    id: "mens-alterations",
    category: "alterations",
    title: "Men's Clothing Alterations",
    tagline:
      "Precision alterations for men's garments, from everyday clothing to formalwear.",
    price: "Request a Quote",
    timeframe: "Garment Dependent",
    features: [
      "Fit and silhouette adjustments",
      "Sleeve and length alterations",
      "Waist adjustments",
      "Professional finishing",
    ],
    icon: Ruler,
    gradient:
      "from-slate-500/20 via-blue-600/5 to-transparent",
  },
  {
    id: "trouser-alterations",
    category: "alterations",
    title: "Trouser Alterations",
    tagline:
      "Precision trouser adjustments designed to achieve a clean, comfortable and balanced fit.",
    price: "Request a Quote",
    timeframe: "Garment Dependent",
    features: [
      "Trouser length adjustments",
      "Waist adjustments",
      "Leg tapering",
      "Seat and fit refinements",
    ],
    icon: Ruler,
    gradient:
      "from-emerald-500/20 via-teal-600/5 to-transparent",
  },
  {
    id: "shirt-tailoring",
    category: "tailoring",
    title: "Shirt Tailoring",
    tagline:
      "Custom shirt tailoring and precision adjustments created around your preferred fit and style.",
    price: "Request a Quote",
    timeframe: "Consultation Required",
    features: [
      "Custom fit adjustments",
      "Sleeve alterations",
      "Collar refinements",
      "Professional tailored finishing",
    ],
    icon: Shirt,
    gradient:
      "from-cyan-500/20 via-sky-600/5 to-transparent",
  },
  {
    id: "suit-tailoring",
    category: "tailoring",
    title: "Suit Tailoring",
    tagline:
      "Expert suit tailoring and alterations designed to create a refined, confident and balanced silhouette.",
    price: "Request a Quote",
    timeframe: "Consultation Required",
    features: [
      "Jacket fit adjustments",
      "Trouser alterations",
      "Sleeve and length adjustments",
      "Complete suit fitting",
    ],
    icon: Ruler,
    gradient:
      "from-amber-500/20 via-yellow-600/5 to-transparent",
  },
  {
    id: "uniform-tailoring",
    category: "tailoring",
    title: "Uniform Tailoring",
    tagline:
      "Professional uniform tailoring and alterations for a consistent, comfortable and polished fit.",
    price: "Request a Quote",
    timeframe: "Order Dependent",
    features: [
      "Uniform sizing adjustments",
      "Professional fitting",
      "Length and waist alterations",
      "Bulk tailoring available",
    ],
    icon: Shirt,
    gradient:
      "from-indigo-500/20 via-blue-600/5 to-transparent",
  },
  {
    id: "waist-adjustments",
    category: "alterations",
    title: "Waist Adjustments",
    tagline:
      "Precise waist alterations that improve comfort and create a more natural garment fit.",
    price: "Request a Quote",
    timeframe: "Garment Dependent",
    features: [
      "Waist tightening",
      "Waist loosening",
      "Fit assessment",
      "Clean internal finishing",
    ],
    icon: Ruler,
    gradient:
      "from-rose-500/20 via-pink-600/5 to-transparent",
  },
  {
    id: "wedding-dress-alterations",
    category: "bridal",
    title: "Wedding Dress Alterations",
    tagline:
      "Delicate bridal alterations performed with attention to fit, detail and the character of the original gown.",
    price: "Consultation Required",
    timeframe: "Appointment Required",
    features: [
      "Bridal fitting consultations",
      "Length and silhouette adjustments",
      "Bodice and waist alterations",
      "Delicate detailing and finishing",
    ],
    icon: Sparkles,
    gradient:
      "from-pink-500/20 via-rose-600/5 to-transparent",
  },
  {
    id: "womens-alterations",
    category: "alterations",
    title: "Women's Clothing Alterations",
    tagline:
      "Thoughtful alterations for women's garments, from everyday pieces to special occasion wear.",
    price: "Request a Quote",
    timeframe: "Garment Dependent",
    features: [
      "Fit and silhouette adjustments",
      "Length alterations",
      "Waist and seam adjustments",
      "Professional finishing",
    ],
    icon: Scissors,
    gradient:
      "from-fuchsia-500/20 via-purple-600/5 to-transparent",
  },
];

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "all",
    label: "All Services",
  },
  {
    id: "tailoring",
    label: "Tailoring",
  },
  {
    id: "alterations",
    label: "Alterations",
  },
  {
    id: "repairs",
    label: "Repairs",
  },
  {
    id: "bridal",
    label: "Bridal",
  },
];

// ─────────────────────────────────────────────────────────────
// WHATSAPP
// ─────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "27837212432";

function openWhatsApp(service) {
  const message = service
    ? `Hello, I would like to enquire about ${service}.`
    : "Hello, I would like to enquire about your tailoring and alteration services.";

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices = SERVICES_DATA.filter(
    (service) =>
      activeTab === "all" || service.category === activeTab
  );

  return (
    <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* ─────────────────────────────────────────────────────
          BACKGROUND
      ───────────────────────────────────────────────────── */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#c9a35a]/5 blur-[100px]" />

        <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-violet-600/5 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* ─────────────────────────────────────────────────────
            HEADER
        ───────────────────────────────────────────────────── */}

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c9a35a]/30 bg-[#c9a35a]/5 text-[#c9a35a] text-xs font-medium tracking-widest uppercase mb-4"
          >
            <Sparkles size={12} />
            Long Street Atelier
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="text-4xl sm:text-6xl font-serif text-white mb-6 font-medium tracking-tight"
          >
            Precision{" "}
            <span className="text-[#c9a35a] font-normal italic">
              Tailoring
            </span>{" "}
            & Alterations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed"
          >
            From everyday repairs to bespoke tailoring and delicate
            bridal alterations, every garment receives careful attention
            and professional finishing.
          </motion.p>
        </div>

        {/* ─────────────────────────────────────────────────────
            FILTERS
        ───────────────────────────────────────────────────── */}

        <div className="flex justify-center mb-16 overflow-x-auto pb-4 max-w-full">
          <div className="flex gap-2 p-1.5 rounded-xl bg-[#0d0d12] border border-white/5 shadow-inner backdrop-blur-md whitespace-nowrap">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative px-4 py-2.5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-[#c9a35a] rounded-lg shadow-lg shadow-[#c9a35a]/20"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────
            SERVICE GRID
        ───────────────────────────────────────────────────── */}

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const IconComponent = service.icon;

              return (
                <motion.article
                  layout
                  key={service.id}
                  initial={{
                    opacity: 0,
                    scale: 0.98,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="group relative rounded-2xl border border-white/5 bg-[#0b0b0f] overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:border-[#c9a35a]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c9a35a]/5"
                >
                  {/* Gradient */}

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  {/* Content */}

                  <div className="relative z-10">

                    {/* Icon */}

                    <div className="flex justify-between items-start mb-6 gap-4">
                      <div className="p-3 rounded-xl bg-white/5 text-[#c9a35a] border border-white/5 group-hover:bg-[#c9a35a] group-hover:text-black transition-all duration-300">
                        <IconComponent
                          size={20}
                          strokeWidth={1.7}
                        />
                      </div>

                      <div className="text-right">
                        

                        <span className="block text-[10px] text-neutral-500 uppercase tracking-widest mt-1 group-hover:text-amber-400/80 transition-colors">
                          {service.timeframe}
                        </span>
                      </div>
                    </div>

                    {/* Title */}

                    <h2 className="text-xl font-serif font-medium text-white mb-2 tracking-wide group-hover:text-[#c9a35a] transition-colors">
                      {service.title}
                    </h2>

                    {/* Description */}

                    <p className="text-neutral-400 text-xs sm:text-sm font-light mb-6 leading-relaxed">
                      {service.tagline}
                    </p>

                    {/* Features */}

                    <ul className="space-y-3.5 mb-8">
                      {service.features.map((feature, index) => (
                        <li
                          key={`${service.id}-${index}`}
                          className="flex items-center gap-3 text-neutral-300 text-xs"
                        >
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c9a35a]/10 text-[#c9a35a] flex-shrink-0">
                            <Check size={9} strokeWidth={2.5} />
                          </span>

                          <span className="font-light">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}

                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp(service.title)
                      }
                      className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-[#c9a35a] border border-white/5 text-white hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-md"
                    >
                      <PhoneCall
                        size={14}
                        className="opacity-70 group-hover/btn:opacity-100"
                      />

                      <span>Enquire About This Service</span>

                      <ChevronRight
                        size={14}
                        className="transform group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ─────────────────────────────────────────────────────
            CONSULTATION CTA
        ───────────────────────────────────────────────────── */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative overflow-hidden rounded-3xl border border-[#c9a35a]/20 bg-[#0b0b0f] px-6 py-12 sm:px-12 sm:py-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a35a]/10 via-transparent to-violet-600/5 pointer-events-none" />

          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#c9a35a]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">

            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a35a]/30 bg-[#c9a35a]/5 text-[#c9a35a]">
              <Ruler
                size={20}
                strokeWidth={1.5}
              />
            </div>

            <p className="text-[#c9a35a] text-[10px] uppercase tracking-[0.3em] font-semibold mb-4">
              Private Atelier Consultation
            </p>

            <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
              Let us make your garment{" "}
              <span className="italic text-[#c9a35a]">
                fit perfectly.
              </span>
            </h2>

            <p className="text-neutral-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              Have a garment that needs attention? Speak directly with
              our tailoring team about your repair, alteration or
              custom tailoring requirements.
            </p>

            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#c9a35a] text-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#d8b76f] transition-all duration-300 shadow-xl shadow-[#c9a35a]/10 cursor-pointer"
            >
              <PhoneCall size={15} />

              Speak With Our Tailor

              <ChevronRight size={15} />
            </button>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────────────────
            FOOTER LABEL
        ───────────────────────────────────────────────────── */}

        <div className="text-center mt-12">
          <p className="text-[10px] text-neutral-600 uppercase tracking-[0.25em]">
            Cape Town CBD · Long Street Atelier · By Appointment
          </p>
        </div>
      </div>
    </main>
  );
}
