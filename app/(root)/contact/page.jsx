// app/contact/page.jsx
"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { assets } from "@/assets/assets";

const ACCENT = "#C5A34A";

export default function ContactPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold">Get in Touch</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Whether you're ready to begin your custom tailoring journey or have a question about our services in Cape Town — we’d love to hear from you.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={assets.header_tailor_workshop_image}
                alt="Ibrahim Design studio contact"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </motion.section>

        {/* Contact Methods */}
        <motion.section
          className="mt-12 space-y-6 sm:space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold">Contact Methods</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <strong>Email:</strong>{" "}
              <a href="mailto:isouaibou50@gmail.com" className="text-accents" style={{ color: ACCENT }}>
                isouaibou50@gmail.com
              </a>
            </div>
            <div>
              <strong>Phone / WhatsApp:</strong>{" "}
              <a href="tel:+27837212432" className="text-accents" style={{ color: ACCENT }}>
                +27 83 721 2432
              </a>
            </div>
            <div>
              <strong>Address:</strong>{" "}
              Green Market, Protea House, 7, Cape Town City Centre Cape Town, 8001
            </div>
            <div>
              <strong>Studio Hours:</strong> Monday – Friday, 10 am – 6 pm
            </div>
          </div>
        </motion.section>

        {/* Send Us a Message */}
        <motion.section
          className="mt-12 space-y-6 sm:space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Send Us a Message</h2>
          <form
            className="space-y-4 text-gray-700"
            action="/api/contact" // adjust endpoint as needed
            method="POST"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C5A34A]/50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C5A34A]/50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                How can we help you?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C5A34A]/50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-white"
              style={{ background: ACCENT }}
            >
              Submit Message
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            We aim to respond within 24–48 hours.  
          </p>
        </motion.section>

        {/* Visual Accent */}
        <div aria-hidden className="mt-20 relative">
          <div className="absolute left-0 w-48 h-48 bg-gradient-to-br from-[#C5A34A]/30 to-transparent rounded-full blur-3xl opacity-40" />
        </div>
      </div>
    </main>
  );
}
