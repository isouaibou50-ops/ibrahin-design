"use client"
// app/about/page.jsx
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

const ACCENT = "#C5A34A";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
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
                src={assets.about}
                alt="Ibrahim Design tailoring studio Cape Town"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </motion.section>

        {/* Our Story */}
        <motion.section
          className="mt-12 space-y-6 sm:space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Founded in Cape Town’s vibrant city bowl, Ibrahim Design started with a vision: to weave African heritage into modern tailoring. From sourcing premium fabrics to the final stitch, every garment is made with precision, culture and character.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Whether it’s a traditional attire for a special celebration or a contemporary custom suit, our studio offers a full made-to-measure service — personalized fittings, fabric selection, and finishing touches that reflect who you are.
          </p>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          className="mt-12 space-y-6 sm:space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Why Choose Us</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li><strong>Tailored to fit you:</strong> Every piece begins with your measurements — because a perfect fit never goes out of style.</li>
            <li><strong>African-inspired fabrics:</strong> We honor rich textures, bold prints, and local heritage—while delivering world-class craftsmanship.</li>
            <li><strong>Made in Cape Town:</strong> From concept to completion in our studio, right here in the city you love.</li>
            <li><strong>Timeless style:</strong> Our designs are meant to be worn, celebrated and passed on — not discarded after a season.</li>
          </ul>
        </motion.section>

        {/* Our Process */}
        <motion.section
          className="mt-12 space-y-6 sm:space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-2xl font-semibold">Our Process</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p><strong>1. Consultation & Fabric Selection:</strong> Begin your journey in studio with a one-on-one consultation. We help you choose fabrics, fits and details.</p>
            <p><strong>2. Measurement & Design:</strong> We take precise measurements and draft a pattern uniquely yours. From classic silhouettes to customized designs—your vision guides us.</p>
            <p><strong>3. Tailoring & Fitting:</strong> Expert artisans stitch your piece in our Cape Town atelier. You’ll be invited for fitting and adjustments to ensure flawless alignment.</p>
            <p><strong>4. Final Presentation:</strong> Your garment is pressed, finished, and delivered — ready to wear for your moments of style and significance.</p>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3 className="text-xl font-semibold">Ready to create your signature look?</h3>
          <button
            className="mt-4 px-6 py-3 rounded-full text-white"
            style={{ background: ACCENT }}
            onClick={() => window.location.href = "/contact"}
          >
            Book Your Consultation
          </button>
        </motion.section>

        {/* Visual Accent */}
        <div aria-hidden className="mt-20 relative">
          <div className="absolute right-0 w-48 h-48 bg-gradient-to-br from-[#C5A34A]/30 to-transparent rounded-full blur-3xl opacity-40" />
        </div>
      </div>
    </main>
  );
}
