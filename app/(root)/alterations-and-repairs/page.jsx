"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, PhoneCall, X, Scissors } from "lucide-react";

const ACCENT = "#C5A34A";
const WHATSAPP_NUMBER = "+27837212432"; // replace with your number083 721 2432

// ✅ SEO Metadata
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






// // app/alterations-and-repairs/page.jsx
// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Head from "next/head"; // ✅ for additional SEO meta tags

// const ACCENT = "#C5A34A";
// const PLACEHOLDER ="about-bg.webp"
// //   "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23c7c7c7' font-family='Arial, Helvetica, sans-serif' font-size='28'%3EImage placeholder%3C/text%3E%3C/svg%3E";

// const SERVICE_DATA = [
//   {
//     id: "pants",
//     title: "Pants, Trousers & Jeans Alterations",
//     short:
//       "Professional shortening, tapering, waist adjustments, and zip replacements for all pant styles.",
//     items: [
//       "Shorten jeans with original hems",
//       "Shorten pants/trousers with or without a cuff",
//       "Lengthen pants/trousers",
//       "Taper pant legs (bootleg → skinny)",
//       "Take in or let out waists",
//       "Replace broken zips & rivets",
//       "Replace buttons & jean buttons",
//       "Darn/repair denim (distressed look)",
//     ],
//     basePrice: 120,
//   },
//   {
//     id: "dresses",
//     title: "Dresses & Skirts Alterations",
//     short:
//       "Restyle, shorten, taper, replace zips, adjust shoulders & sleeves for all types of dresses.",
//     items: [
//       "Re-style outdated dress/skirt",
//       "Shorten any dress (sun frocks → wedding dresses)",
//       "Taper dress for a better fit",
//       "Lift shoulders & shorten sleeves",
//       "Change necklines",
//     ],
//     basePrice: 220,
//   },
//   {
//     id: "shirts",
//     title: "Shirts & Blouses Alterations",
//     short:
//       "Shorten length, taper, adjust sleeves, and replace buttons or collars for a perfect fit.",
//     items: [
//       "Shorten shirt length (straight/curved cut)",
//       "Taper shirts for a snug fit",
//       "Shorten sleeves (with/without cuffs)",
//       "Replace buttons or add buttonholes",
//       "Turn/repair collar",
//     ],
//     basePrice: 90,
//   },
//   {
//     id: "jackets",
//     title: "Jackets & Suits Alterations",
//     short:
//       "Re-style, taper, replace lining, and modify sleeves for tailored precision and comfort.",
//     items: [
//       "Re-style jackets",
//       "Shorten/lengthen sleeves (with/without flap & buttons)",
//       "Shorten jackets",
//       "Taper jackets for a closer fit",
//       "Replace lining & add inner pockets",
//       "Convert double-breasted to single-breasted",
//     ],
//     basePrice: 450,
//   },
//   {
//     id: "sports",
//     title: "Swimwear & Sportswear Alterations",
//     short:
//       "Custom alterations for swimwear, tracksuits, and gymwear — repair, re-cut, and resize.",
//     items: [
//       "Replace broken clips on swimwear",
//       "Re-cut bikini bottoms (smaller/Brazilian)",
//       "Shorten/alter tracksuits & stretchy gym pants",
//     ],
//     basePrice: 80,
//   },
// ];

// // ✅ SEO metadata (Next.js App Router style)
// // export const metadata = {
// //   title: "Alterations & Repairs | Tailor-Made Services in Cape Town",
// //   description:
// //     "Professional clothing alterations and repairs in Cape Town — from jeans to wedding dresses. Expert tailoring for pants, dresses, shirts, jackets, and sportswear. Same-day fittings available.",
// //   keywords:
// //     "tailor cape town, clothing alterations cape town, dress repair, suit alterations, jeans taper, bespoke tailoring, african tailor, clothing repair",
// //   alternates: {
// //     canonical: "https://ibrahimdesign.co.za/alterations-and-repairs",
// //   },
// //   openGraph: {
// //     title: "Alterations & Repairs | Tailor-Made Services in Cape Town",
// //     description:
// //       "Trusted tailor in the heart of Cape Town offering expert alterations, repairs, and restyling. Book your fitting today.",
// //     url: "https://ibrahimdesign.co.za/alterations-and-repairs",
// //     siteName: "Ibrahim Design Atelier",
// //     locale: "en_ZA",
// //     type: "website",
// //     images: [
// //       {
// //         url: "/images/alterations-cover.jpg",
// //         width: 1200,
// //         height: 630,
// //         alt: "Tailoring and alterations service in Cape Town",
// //       },
// //     ],
// //   },
// //   twitter: {
// //     card: "summary_large_image",
// //     title: "Tailor Alterations & Repairs in Cape Town | Ibrahim Design Atelier",
// //     description:
// //       "Expert alterations and bespoke repairs for all garments — visit our Cape Town atelier for a perfect fit.",
// //     images: ["/images/alterations-cover.jpg"],
// //   },
// // };

// export default function AlterationsAndRepairsPage() {
//   const [selectedService, setSelectedService] = useState(SERVICE_DATA[0].id);
//   const [selectedItems, setSelectedItems] = useState(new Set());
//   const [files, setFiles] = useState([]);
//   const [notes, setNotes] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const current = useMemo(
//     () => SERVICE_DATA.find((s) => s.id === selectedService),
//     [selectedService]
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     await new Promise((r) => setTimeout(r, 800));
//     setShowSuccess(true);
//     setSubmitting(false);
//     setTimeout(() => setShowSuccess(false), 2500);
//   };

//   const estimate = () => current.basePrice + Math.max(0, selectedItems.size - 1) * 30;

//   return (
//     <main className="min-h-screen bg-white text-[#111827]">
//       {/* ✅ Dynamic meta tags */}
//       <Head>
//         <meta name="robots" content="index, follow" />
//         <meta
//           property="og:image:alt"
//           content="Professional tailoring and clothing alterations in Cape Town"
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "LocalBusiness",
//               name: "Ibrahim Design Atelier",
//               description:
//                 "Professional tailor offering clothing alterations and repairs in Cape Town.",
//               image: "about.webp",
//               telephone: "+27 82 000 0000",
//               address: {
//                 "@type": "PostalAddress",
//                 streetAddress: "123 Long Street",
//                 addressLocality: "Cape Town",
//                 postalCode: "8001",
//                 addressCountry: "ZA",
//               },
//               url: "https://yourdomain.com/alterations-and-repairs",
//               sameAs: [
//                 "https://instagram.com/ibrahimdesign",
//                 "https://facebook.com/ibrahimdesignatelier",
//               ],
//               priceRange: "R80 - R600",
//               openingHours: "Mo-Sa 09:00-18:00",
//             }),
//           }}
//         />
//       </Head>

//       {/* Header */}
//       <section className="max-w-4xl mx-auto px-4 py-10">
//         <motion.h1
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//           className="text-2xl sm:text-3xl font-serif font-semibold"
//         >
//           Alterations & Repairs
//         </motion.h1>
//         <p className="text-sm text-gray-600 mt-2 max-w-2xl">
//           Expert tailoring, alterations, and repairs — perfectly fitted garments crafted
//           with care in Cape Town’s city centre. Pants, dresses, jackets, and more.
//         </p>
//       </section>

//       {/* Body: Service cards */}
//       <section className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-3 gap-5">
//         {SERVICE_DATA.map((service) => (
//           <motion.article
//             key={service.id}
//             whileHover={{ y: -4 }}
//             className="bg-white border rounded-2xl shadow-sm overflow-hidden"
//           >
//             <img
//               src={PLACEHOLDER}
//               alt={`${service.title} example`}
//               className="w-full h-44 object-cover"
//             />
//             <div className="p-5">
//               <h2 className="text-lg font-semibold mb-1">{service.title}</h2>
//               <p className="text-sm text-gray-600 mb-3">{service.short}</p>
//               <button
//                 onClick={() => setSelectedService(service.id)}
//                 className="text-sm font-medium text-[#111827] border rounded-md px-3 py-1 hover:bg-[#f9f7f3]"
//                 style={{ borderColor: ACCENT }}
//               >
//                 View Details
//               </button>
//             </div>
//           </motion.article>
//         ))}
//       </section>

//       {/* Quick quote form */}
//       <section className="max-w-3xl mx-auto px-4 pb-16">
//         <motion.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//           className="bg-white border shadow-sm rounded-2xl p-6"
//         >
//           <h3 className="text-lg font-semibold mb-2">Request a Quote</h3>
//           <p className="text-sm text-gray-600 mb-4">
//             Select a service, upload a photo, and we’ll confirm your estimate.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <label className="flex flex-col">
//               <span className="text-xs text-gray-600 mb-1">Name</span>
//               <input
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border rounded-md px-3 py-2"
//               />
//             </label>

//             <label className="flex flex-col">
//               <span className="text-xs text-gray-600 mb-1">Phone</span>
//               <input
//                 type="tel"
//                 required
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="border rounded-md px-3 py-2"
//               />
//             </label>

//             <label className="sm:col-span-2 flex flex-col">
//               <span className="text-xs text-gray-600 mb-1">Additional notes</span>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 className="border rounded-md px-3 py-2 min-h-[90px]"
//                 placeholder="Describe alteration details..."
//               />
//             </label>
//           </div>

//           <div className="mt-4 flex items-center justify-between">
//             <div className="text-sm text-gray-700">
//               Estimated from: <strong>R {estimate()}</strong>
//             </div>
//             <button
//               type="submit"
//               disabled={submitting}
//               className="px-5 py-2 text-white font-medium rounded"
//               style={{ background: ACCENT }}
//             >
//               {submitting ? "Sending..." : "Send Request"}
//             </button>
//           </div>

//           <AnimatePresence>
//             {showSuccess && (
//               <motion.div
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 6 }}
//                 className="mt-4 text-green-600 text-sm"
//               >
//                 ✅ Request submitted successfully!
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.form>
//       </section>
//     </main>
//   );
// }
