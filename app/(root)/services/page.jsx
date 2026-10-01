"use client";
import { trackWhatsAppConversion } from "@/utils/analytics";
import React, { useState } from "react";
import { motion } from "framer-motion";
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
    gradient: "from-amber-500/20 via-orange-600/5 to-transparent",
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
    gradient: "from-violet-500/20 via-fuchsia-600/5 to-transparent",
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
    gradient: "from-blue-500/20 via-cyan-600/5 to-transparent",
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
    gradient: "from-stone-500/20 via-neutral-600/5 to-transparent",
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
    gradient: "from-slate-500/20 via-blue-600/5 to-transparent",
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
    gradient: "from-emerald-500/20 via-teal-600/5 to-transparent",
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
    gradient: "from-cyan-500/20 via-sky-600/5 to-transparent",
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
    gradient: "from-amber-500/20 via-yellow-600/5 to-transparent",
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
    gradient: "from-indigo-500/20 via-blue-600/5 to-transparent",
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
    gradient: "from-rose-500/20 via-pink-600/5 to-transparent",
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
    gradient: "from-pink-500/20 via-rose-600/5 to-transparent",
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
    gradient: "from-fuchsia-500/20 via-purple-600/5 to-transparent",
  },
];

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "tailoring", label: "Tailoring" },
  { id: "alterations", label: "Alterations" },
  { id: "repairs", label: "Repairs" },
  { id: "bridal", label: "Bridal" },
];

// ─────────────────────────────────────────────────────────────
// WHATSAPP HELPER
// ─────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "27837212432";



// 2. Update your openWhatsApp function to look exactly like this:
function openWhatsApp(serviceTitle) {
  const message = serviceTitle
    ? `Hello Ibrahim Design, I am on your website and would like to book an appointment or request a quote for: ${serviceTitle}.`
    : "Hello Ibrahim Design, I am on your website and would like to inquire about your tailoring and alteration services.";

  // Execute Google Ads conversion script safely on client interaction
  trackWhatsAppConversion(serviceTitle || "Main Chat Floating Widget");

  const url = `https://wa.me{WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}


// ─────────────────────────────────────────────────────────────
// MAIN PAGE RENDERING
// ─────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices = SERVICES_DATA.filter(
    (service) => activeTab === "all" || service.category === activeTab
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050507] px-4 py-24 select-none sm:px-6 lg:px-8">
      {/* Background Interactive Ambient Overlay */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#c9a35a]/5 blur-[100px]" />

        <div className="absolute right-10 top-1/3 h-96 w-96 rounded-full bg-violet-600/5 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a35a]/30 bg-[#c9a35a]/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#c9a35a]"
          >
            <Sparkles size={10} />
            Bespoke Tailor Shop Long Street
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 font-serif text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Premium Suit Alterations &{" "}
            <span className="font-normal italic text-[#c9a35a]">
              Custom Styling
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-xs font-light leading-relaxed text-neutral-400 sm:text-sm"
          >
            Welcome to Ibrahim Design. Tap any atelier service below to connect
            with us directly on WhatsApp for real-time answers, instant quotes,
            or custom fittings in Cape Town CBD.
          </motion.p>
        </div>

        {/* Tab Selection Filter System */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative cursor-pointer rounded-lg px-4 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-300 ${
                  isActive
                    ? "font-semibold text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 rounded-lg bg-[#c9a35a] shadow-lg shadow-[#c9a35a]/20"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Services Grid */}
        <motion.div
          layout
          className="mb-16 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2"
        >
          {filteredServices.map((service) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={service.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-[#0b0b0f] p-6 transition-all duration-300 hover:border-[#c9a35a]/30 hover:shadow-2xl hover:shadow-[#c9a35a]/5 sm:p-8"
              >
                {/* Hover Gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Top Meta */}
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a35a]/20 bg-[#c9a35a]/5 text-[#c9a35a]">
                      <IconComponent size={20} strokeWidth={1.5} />
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9a35a]">
                        {service.price}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-wide text-neutral-500">
                        {service.timeframe}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {service.title}
                  </h2>

                  {/* Tagline */}
                  <p className="mb-6 text-sm font-light leading-relaxed text-neutral-400">
                    {service.tagline}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feat, idx) => (
                      <div
                        key={`${service.id}-feature-${idx}`}
                        className="flex items-start gap-3 text-xs text-neutral-300"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#c9a35a]/10 text-[#c9a35a]">
                          <Check size={10} strokeWidth={2.5} />
                        </span>

                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="relative z-10 mt-8">
                  <button
                    onClick={() => openWhatsApp(service.title)}
                    className="group/btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-600/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 shadow-md transition-all duration-300 hover:bg-emerald-600 hover:text-white"
                  >
                    <PhoneCall size={14} />

                    <span>Discuss on WhatsApp</span>

                    <ChevronRight
                      size={14}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Master Micro-Conversion Layout Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-[#c9a35a]/20 bg-[#0b0b0f] p-8 text-center sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c9a35a]/10 via-transparent to-emerald-500/5" />

          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a35a]/20 bg-[#c9a35a]/5 text-[#c9a35a]">
              <Scissors size={20} />
            </div>

            <h2 className="mb-4 font-serif text-2xl text-white sm:text-3xl">
              Have a Specific Garment Request?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-sm font-light leading-relaxed text-neutral-400">
              Connect instantly with our master tailors. We specialize in
              custom African heritage cuts, fine suit restructuring, and fast
              same-day corrections right here at Greenmarket Square.
            </p>

            <button
              onClick={() => openWhatsApp(null)}
              className="mx-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-xl shadow-emerald-950/20 transition-all duration-200 hover:bg-emerald-500 sm:w-auto"
            >
              <PhoneCall size={14} />
              Start Main WhatsApp Booking
            </button>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              <PhoneCall size={12} />
              Direct Studio Line
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

