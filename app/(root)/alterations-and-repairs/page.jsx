"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, PhoneCall, X, Scissors } from "lucide-react";

const ACCENT = "#C5A34A";
const WHATSAPP_NUMBER = "27641234567"; // replace with your number

// // ✅ SEO Metadata
// export const metadata = {
//   title: "Alterations & Repairs | Ibrahim Design",
//   description:
//     "Tailoring, alterations, and repairs for jeans, dresses, suits, and more. Crafted with precision and elegance.",
//   openGraph: {
//     title: "Alterations & Repairs | Ibrahim Design",
//     description:
//       "Expert alterations for pants, dresses, jackets, shirts, and sportswear — Cape Town's finest craftsmanship.",
//     url: "https://yourdomain.com/alterations-and-repairs",
//     siteName: "Ibrahim Design",
//   },
// };

// ✅ Tailoring Services Data
const SERVICE_DATA = [
  {
    id: "pants",
    title: "Pants, Trousers & Jeans Alterations",
    short:
      "Professional shortening, tapering, waist adjustments, and zip replacements for all pant styles.",
    items: [
      "Shorten jeans with original hems",
      "Shorten pants/trousers with or without a cuff",
      "Lengthen pants/trousers",
      "Taper pant legs (bootleg → skinny)",
      "Take in or let out waists",
      "Replace broken zips & rivets",
      "Replace buttons & jean buttons",
      "Darn/repair denim (distressed look)",
    ],
    basePrice: 120,
  },
  {
    id: "dresses",
    title: "Dresses & Skirts Alterations",
    short:
      "Restyle, shorten, taper, replace zips, adjust shoulders & sleeves for all types of dresses.",
    items: [
      "Re-style outdated dress/skirt",
      "Shorten any dress (sun frocks → wedding dresses)",
      "Taper dress for a better fit",
      "Lift shoulders & shorten sleeves",
      "Change necklines",
    ],
    basePrice: 220,
  },
  {
    id: "shirts",
    title: "Shirts & Blouses Alterations",
    short:
      "Shorten length, taper, adjust sleeves, and replace buttons or collars for a perfect fit.",
    items: [
      "Shorten shirt length (straight/curved cut)",
      "Taper shirts for a snug fit",
      "Shorten sleeves (with/without cuffs)",
      "Replace buttons or add buttonholes",
      "Turn/repair collar",
    ],
    basePrice: 90,
  },
  {
    id: "jackets",
    title: "Jackets & Suits Alterations",
    short:
      "Re-style, taper, replace lining, and modify sleeves for tailored precision and comfort.",
    items: [
      "Re-style jackets",
      "Shorten/lengthen sleeves (with/without flap & buttons)",
      "Shorten jackets",
      "Taper jackets for a closer fit",
      "Replace lining & add inner pockets",
      "Convert double-breasted to single-breasted",
    ],
    basePrice: 450,
  },
  {
    id: "sports",
    title: "Swimwear & Sportswear Alterations",
    short:
      "Custom alterations for swimwear, tracksuits, and gymwear — repair, re-cut, and resize.",
    items: [
      "Replace broken clips on swimwear",
      "Re-cut bikini bottoms (smaller/Brazilian)",
      "Shorten/alter tracksuits & stretchy gym pants",
    ],
    basePrice: 80,
  },
];

export default function AlterationsAndRepairsPage() {
  const [selected, setSelected] = useState(null);

  const handleWhatsApp = (service) => {
    const message = encodeURIComponent(
      `Hello Ibrahim Design, I’d like to inquire about your "${service}" alteration services.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
              <motion.section
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl sm:text-4xl font-bold">About Ibrahim Design</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Based in the heart of Cape Town, we are your bespoke African tailoring studio — crafting elegance, comfort and cultural pride for men & women.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="about-bg.webp"
                      alt="Ibrahim Design tailoring studio Cape Town"
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                </div>
      </motion.section>
      <section className="relative text-center py-20 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 mb-4">
            Expert Alterations & Repairs
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Every stitch tells a story — from precise tailoring to flawless
            restorations, we ensure your garments fit your lifestyle perfectly.
          </p>
        </motion.div>

        {/* Animated Background Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.07, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
        >
          <Scissors size={280} />
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_DATA.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{service.short}</p>
                <p className="text-xs text-gray-400">From R{service.basePrice}</p>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setSelected(service)}
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-800 border border-gray-200 rounded-full py-2 hover:bg-gray-50 transition"
                >
                  <Info size={16} />
                  View Details
                </button>

                <button
                  onClick={() => handleWhatsApp(service.title)}
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-white rounded-full py-2 shadow-sm hover:shadow transition"
                  style={{ background: ACCENT }}
                >
                  <PhoneCall size={16} />
                  WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              >
                <X size={22} />
              </button>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {selected.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{selected.short}</p>

              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-6">
                {selected.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-400 mb-1">
                  Base price: <span className="font-medium text-gray-700">R{selected.basePrice}</span>
                </p>
                <button
                  onClick={() => handleWhatsApp(selected.title)}
                  className="flex items-center justify-center gap-2 w-full rounded-full py-3 font-medium text-white hover:opacity-90 transition"
                  style={{ background: ACCENT }}
                >
                  <PhoneCall size={18} />
                  Message on WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
