"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import confetti from "canvas-confetti";
import { assets } from "@/assets/assets";
import { createBooking } from "@/app/actions/createBooking";
import toast from "react-hot-toast";

const ACCENT = "#C5A34A"; // Gold accent color

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  // 🧭 Limit datetime picker
  useEffect(() => {
    const now = new Date();
    const inTwoMonths = new Date();
    inTwoMonths.setMonth(now.getMonth() + 2);

    const toISOStringLocal = (date) => {
      const offset = date.getTimezoneOffset();
      const local = new Date(date.getTime() - offset * 60000);
      return local.toISOString().slice(0, 16);
    };

    setMinDate(toISOStringLocal(now));
    setMaxDate(toISOStringLocal(inTwoMonths));
  }, []);

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const res = await createBooking(formData);
      if (res.success) {
        setMessage("✅ Message sent successfully!");
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        toast.success("Message sent successfully 🎉", {
          description: "We'll get back to you within 24–48 hours.",
        });
      } else {
        setMessage(`❌ ${res.error}`);
      }
    });
  };

  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 py-10 sm:py-16">

        {/* 🌟 Hero Section */}
        <motion.section
          className="text-center space-y-4 sm:space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold">Get in Touch</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2 sm:px-0">
            Whether you're ready to begin your custom tailoring journey or just have a question about our services — we’d love to hear from you.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="relative w-48 h-48 sm:w-72 sm:h-72 rounded-lg overflow-hidden shadow-md sm:shadow-xl">
              <Image
                src={assets.header_tailor_workshop_image}
                alt="Ibrahim Design Studio Contact"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.section>


        {/* 💌 Send a Message Form */}
        <motion.section
          className="mt-12 sm:mt-16 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
            Send Us a Message
          </h2>

          <form
            action={handleSubmit}
            className="space-y-4 text-gray-700"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C5A34A]/50 text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C5A34A]/50 text-sm sm:text-base"
              />
            </div>

            {/* Date & Time */}
            <div>
              <label htmlFor="datetime" className="block text-sm font-medium mb-1">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                required
                min={minDate}
                max={maxDate}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C5A34A]/50 text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 mt-1">
                Select a time within the next 2 months.
              </p>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                How can we help you?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us more about what you’re looking for..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C5A34A]/50 text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={isPending}
              type="submit"
              className={`w-full sm:w-auto px-6 py-3 rounded-full text-white font-medium shadow-md transition-all ${
                isPending
                  ? "bg-[#b5963c] cursor-not-allowed"
                  : "bg-[#C5A34A] hover:bg-[#b5963c]"
              }`}
            >
              {isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "Submit Message"
              )}
            </motion.button>
          </form>

          {/* Message Feedback */}
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-center sm:text-left mt-3 text-gray-700"
            >
              {message}
            </motion.p>
          )}

          <p className="text-xs text-gray-500 text-center sm:text-left mt-2">
            We aim to respond within 24–48 hours.
          </p>
        </motion.section>

        {/* 📞 Contact Details */}
        <motion.section
          className="mt-10 sm:mt-16 space-y-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
            Contact Methods
          </h2>
          <div className="space-y-4 text-gray-700 text-sm sm:text-base text-center sm:text-left">
            <div>
              <strong>Email:</strong>{" "}
              <a href="mailto:isouaibou50@gmail.com" style={{ color: ACCENT }}>
                isouaibou50@gmail.com
              </a>
            </div>
            <div>
              <strong>Phone / WhatsApp:</strong>{" "}
              <a href="tel:+27837212432" style={{ color: ACCENT }}>
                +27 83 721 2432
              </a>
            </div>
            <div>
              <strong>Address:</strong>{" "}
              Green Market, Protea House 7, Cape Town City Centre, 8001
            </div>
            <div>
              <strong>Studio Hours:</strong> Mon–Fri, 10 am – 6 pm
            </div>
          </div>
        </motion.section>

        {/* ✨ Decorative Accent */}
        <div aria-hidden className="mt-20 relative">
          <div className="absolute left-0 w-48 h-48 bg-gradient-to-br from-[#C5A34A]/30 to-transparent rounded-full blur-3xl opacity-40" />
        </div>
      </div>
    </main>
  );
}
