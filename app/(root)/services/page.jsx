
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
// SERVICES DATA (Optimized with Local Cape Town Search Keywords)
// ─────────────────────────────────────────────────────────────

const SERVICES_DATA = [
  {
    id: "suit-tailoring",
    category: "tailoring",
    title: "Bespoke Suit Tailoring",
    tagline:
      "Expert custom suit tailoring and precise alterations designed around your silhouette by Cape Town's premier artisans.",
    price: "Request a Quote",
    timeframe: "Consultation Required",
    features: [
      "Premium custom suit tailoring",
      "Jacket fit and shoulder adjustments",
      "Trouser alterations & leg tapering",
      "Complete bespoke suit fitting",
    ],
    icon: Ruler,
    gradient: "from-amber-500/20 via-yellow-600/5 to-transparent",
  },
  {
    id: "traditional-wear",
    category: "tailoring",
    title: "Traditional African Wear & Agbadas",
    tagline:
      "Custom traditional wear design specializing in Ankara prints, custom Shweshwe dresses, and bespoke Agbadas.",
    price: "Request a Quote",
    timeframe: "Fast Turnaround",
    features: [
      "Custom traditional dresses & shirts",
      "Ankara, Shweshwe & Kente custom styling",
      "Bespoke Agbada and Yoruba cap design",
      "On-the-spot material co-designing",
    ],
    icon: Shirt,
    gradient: "from-orange-500/20 via-red-600/5 to-transparent",
  },
  {
    id: "general-repairs",
    category: "repairs",
    title: "Clothing Alterations & Repairs",
    tagline:
      "Professional garment repairs and same-day clothing alterations carefully executed in Cape Town CBD.",
    price: "Request a Quote",
    timeframe: "Same-Day Options Available",
    features: [
      "Precision pants & jeans hemming",
      "Zipper replacement and jacket repair",
      "Seam structural reinforcement",
      "Careful structural dress hemming",
    ],
    icon: Scissors,
    gradient: "from-amber-500/20 via-orange-600/5 to-transparent",
  },
  {
    id: "trouser-alterations",
    category: "alterations",
    title: "Trouser & Suit Alterations",
    tagline:
      "Precision trouser adjustments designed to achieve a clean, comfortable, and balanced fit.",
    price: "Request a Quote",
    timeframe: "12 to 24 Hour Turnaround",
    features: [
      "Trouser length & waist adjustments",
      "Seat and fit refinements",
      "Leg tapering & narrowing",
      "Fast, high-quality finishing",
    ],
    icon: Ruler,
    gradient: "from-emerald-500/20 via-teal-600/5 to-transparent",
  },
  {
    id: "wedding-dress-alterations",
    category: "bridal",
    title: "Wedding Dress Alterations",
    tagline:
      "Delicate bridal alterations performed with supreme attention to fit, detail, and the character of your gown.",
    price: "Consultation Required",
    timeframe: "Appointment Required",
    features: [
      "Bridal fitting consultations",
      "Length, bust, and silhouette adjustments",
      "Bodice adjustments & delicate lace work",
      "Maid of honor & bridesmaid tailoring",
    ],
    icon: Sparkles,
    gradient: "from-pink-500/20 via-rose-600/5 to-transparent",
  },
  {
    id: "invisible-seams",
    category: "repairs",
    title: "Invisible Seam Work",
    tagline:
      "Discreet seam restorations designed to preserve the original retail appearance of your finest garments.",
    price: "Request a Quote",
    timeframe: "Precision Finish",
    features: [
      "Discreet structural restoration",
      "Minimal visible stitching lines",
      "Exact matching thread selection",
      "High-end luxury fabric handling",
    ],
    icon: Sparkles,
    gradient: "from-violet-500/20 via-fuchsia-600/5 to-transparent",
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
// WHATSAPP CONFIGURATION
// ─────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "27837212432";

function openWhatsApp(serviceTitle) {
  const message = serviceTitle
    ? `Hello Ibrahim Design, I am on your website and would like to book an appointment or request a quote for: ${serviceTitle}.`
    : "Hello Ibrahim Design, I am on your website and would like to inquire about your tailoring and alteration services.";

  if (typeof trackWhatsAppConversion === "function") {
    trackWhatsAppConversion(serviceTitle || "Main Mobile Sticky Tracker");
  }

  // FIXED: Added missing '$' for correct variable parsing
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE RENDERING COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices = SERVICES_DATA.filter(
    (service) =>
      activeTab === "all" || service.category === activeTab
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050507] px-4 py-24 select-none pb-32 sm:px-6 md:pb-24 lg:px-8">
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
            Welcome to Ibrahim Design. Tap any atelier service below to
            connect with us directly on WhatsApp for real-time answers,
            instant quotes, or custom fittings in Cape Town CBD.
          </motion.p>
        </div>

        {/* Tab Selection Filter System */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                aria-pressed={isActive}
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
                {/* Service Card Gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative z-10">
                  {/* Service Icon and Pricing */}
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a35a]/20 bg-[#c9a35a]/10 text-[#c9a35a]">
                      <IconComponent size={22} strokeWidth={1.5} />
                    </div>

                    <div className="text-right">
                      <span className="inline-block rounded-full border border-[#c9a35a]/20 bg-[#c9a35a]/5 px-3 py-1 text-[10px] font-medium text-[#c9a35a]">
                        {service.price}
                      </span>

                      <p className="mt-2 text-[10px] text-neutral-500">
                        {service.timeframe}
                      </p>
                    </div>
                  </div>

                  {/* Service Details */}
                  <h2 className="mb-3 font-serif text-xl font-medium text-white sm:text-2xl">
                    {service.title}
                  </h2>

                  <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                    {service.tagline}
                  </p>

                  {/* Service Features */}
                  <div className="mb-8 space-y-3">
                    {service.features.map((feat, idx) => (
                      <div
                        key={`${service.id}-feature-${idx}`}
                        className="flex items-start gap-3 text-xs text-neutral-300"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-[#c9a35a]"
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service WhatsApp CTA */}
                <button
                  type="button"
                  onClick={() => openWhatsApp(service.title)}
                  className="group/btn relative z-10 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-600/10 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-emerald-400 shadow-md transition-all duration-300 hover:bg-emerald-600 hover:text-white"
                >
                  <PhoneCall size={15} />
                  Discuss on WhatsApp
                  <ChevronRight
                    size={15}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </button>
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
          className="relative mb-12 overflow-hidden rounded-2xl border border-[#c9a35a]/20 bg-[#0b0b0f] p-8 text-center sm:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c9a35a]/5 blur-[80px]" />

          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c9a35a]/20 bg-[#c9a35a]/10 text-[#c9a35a]">
              <Scissors size={25} strokeWidth={1.5} />
            </div>

            <h2 className="mb-4 font-serif text-2xl font-medium text-white sm:text-3xl">
              Have a Specific Garment Request?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-neutral-400">
              Connect instantly with our master tailors. We specialize in
              custom African heritage cuts, fine suit restructuring, and
              fast same-day corrections right here at Greenmarket Square.
            </p>

            <button
              type="button"
              onClick={() => openWhatsApp(null)}
              className="mx-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-xl shadow-emerald-950/20 transition-all duration-200 hover:bg-emerald-500 sm:w-auto"
            >
              <PhoneCall size={16} />
              Start Main WhatsApp Booking
              <ChevronRight size={16} />
            </button>

            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-xs text-neutral-500 sm:flex-row sm:gap-3">
              <PhoneCall size={14} className="text-[#c9a35a]" />
              <span>Direct Studio Line</span>
              <a
                href="tel:+27837212432"
                className="font-medium text-neutral-300 transition-colors hover:text-[#c9a35a]"
              >
                +27 83 721 2432
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FIXED MOBILE STICKY FOOTER */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#08080b]/95 px-4 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Ibrahim Design
            </p>
            <p className="text-[10px] text-neutral-400">
              Instant Booking & Quotes
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              openWhatsApp("your services")
            }
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-950/40 transition-transform active:scale-95"
          >
            <PhoneCall size={15} />
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
