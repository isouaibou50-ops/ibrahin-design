// app/alterations-and-repairs/page.jsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head"; // ✅ for additional SEO meta tags

const ACCENT = "#C5A34A";
const PLACEHOLDER ="about-bg.webp"
//   "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23c7c7c7' font-family='Arial, Helvetica, sans-serif' font-size='28'%3EImage placeholder%3C/text%3E%3C/svg%3E";

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

// ✅ SEO metadata (Next.js App Router style)
// export const metadata = {
//   title: "Alterations & Repairs | Tailor-Made Services in Cape Town",
//   description:
//     "Professional clothing alterations and repairs in Cape Town — from jeans to wedding dresses. Expert tailoring for pants, dresses, shirts, jackets, and sportswear. Same-day fittings available.",
//   keywords:
//     "tailor cape town, clothing alterations cape town, dress repair, suit alterations, jeans taper, bespoke tailoring, african tailor, clothing repair",
//   alternates: {
//     canonical: "https://ibrahimdesign.co.za/alterations-and-repairs",
//   },
//   openGraph: {
//     title: "Alterations & Repairs | Tailor-Made Services in Cape Town",
//     description:
//       "Trusted tailor in the heart of Cape Town offering expert alterations, repairs, and restyling. Book your fitting today.",
//     url: "https://ibrahimdesign.co.za/alterations-and-repairs",
//     siteName: "Ibrahim Design Atelier",
//     locale: "en_ZA",
//     type: "website",
//     images: [
//       {
//         url: "/images/alterations-cover.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Tailoring and alterations service in Cape Town",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Tailor Alterations & Repairs in Cape Town | Ibrahim Design Atelier",
//     description:
//       "Expert alterations and bespoke repairs for all garments — visit our Cape Town atelier for a perfect fit.",
//     images: ["/images/alterations-cover.jpg"],
//   },
// };

export default function AlterationsAndRepairsPage() {
  const [selectedService, setSelectedService] = useState(SERVICE_DATA[0].id);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const current = useMemo(
    () => SERVICE_DATA.find((s) => s.id === selectedService),
    [selectedService]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setShowSuccess(true);
    setSubmitting(false);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const estimate = () => current.basePrice + Math.max(0, selectedItems.size - 1) * 30;

  return (
    <main className="min-h-screen bg-white text-[#111827]">
      {/* ✅ Dynamic meta tags */}
      <Head>
        <meta name="robots" content="index, follow" />
        <meta
          property="og:image:alt"
          content="Professional tailoring and clothing alterations in Cape Town"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Ibrahim Design Atelier",
              description:
                "Professional tailor offering clothing alterations and repairs in Cape Town.",
              image: "about.webp",
              telephone: "+27 82 000 0000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Long Street",
                addressLocality: "Cape Town",
                postalCode: "8001",
                addressCountry: "ZA",
              },
              url: "https://yourdomain.com/alterations-and-repairs",
              sameAs: [
                "https://instagram.com/ibrahimdesign",
                "https://facebook.com/ibrahimdesignatelier",
              ],
              priceRange: "R80 - R600",
              openingHours: "Mo-Sa 09:00-18:00",
            }),
          }}
        />
      </Head>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-2xl sm:text-3xl font-serif font-semibold"
        >
          Alterations & Repairs
        </motion.h1>
        <p className="text-sm text-gray-600 mt-2 max-w-2xl">
          Expert tailoring, alterations, and repairs — perfectly fitted garments crafted
          with care in Cape Town’s city centre. Pants, dresses, jackets, and more.
        </p>
      </section>

      {/* Body: Service cards */}
      <section className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {SERVICE_DATA.map((service) => (
          <motion.article
            key={service.id}
            whileHover={{ y: -4 }}
            className="bg-white border rounded-2xl shadow-sm overflow-hidden"
          >
            <img
              src={PLACEHOLDER}
              alt={`${service.title} example`}
              className="w-full h-44 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-1">{service.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{service.short}</p>
              <button
                onClick={() => setSelectedService(service.id)}
                className="text-sm font-medium text-[#111827] border rounded-md px-3 py-1 hover:bg-[#f9f7f3]"
                style={{ borderColor: ACCENT }}
              >
                View Details
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      {/* Quick quote form */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white border shadow-sm rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Request a Quote</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select a service, upload a photo, and we’ll confirm your estimate.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col">
              <span className="text-xs text-gray-600 mb-1">Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-xs text-gray-600 mb-1">Phone</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-md px-3 py-2"
              />
            </label>

            <label className="sm:col-span-2 flex flex-col">
              <span className="text-xs text-gray-600 mb-1">Additional notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border rounded-md px-3 py-2 min-h-[90px]"
                placeholder="Describe alteration details..."
              />
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Estimated from: <strong>R {estimate()}</strong>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-white font-medium rounded"
              style={{ background: ACCENT }}
            >
              {submitting ? "Sending..." : "Send Request"}
            </button>
          </div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="mt-4 text-green-600 text-sm"
              >
                ✅ Request submitted successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </section>
    </main>
  );
}
