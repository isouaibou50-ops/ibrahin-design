"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "27837212432"; // Cape Town localized

export default function CustomOrderRequest({ productName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Constructing the bespoke WhatsApp message
    const text = `Hello Ibrahim Design Atelier,\n\n` +
                 `I would like to request a *Custom Order* for: ${productName || 'Bespoke Tailoring'}\n\n` +
                 `*Name:* ${formData.name}\n` +
                 `*Phone:* ${formData.phone}\n` +
                 `*Message:* ${formData.message}\n\n` +
                 `Please let me know the next steps for a fitting.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me{WHATSAPP_NUMBER}?text=${encodedText}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full border border-neutral-900 py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-neutral-900 hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
      >
        <MessageCircle size={14} /> Request Custom Order
      </button>

      {/* OVERLAY & DIALOG */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden"
            >
              {/* Gold Header Accent */}
              <div className="h-1.5 w-full bg-[#C9A35A]" />

              <div className="p-8 md:p-12">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-neutral-50 rounded-full transition-colors"
                >
                  <X size={20} className="text-neutral-400" />
                </button>

                <div className="mb-8">
                  <span className="text-[10px] tracking-[0.4em] text-[#C9A35A] uppercase font-bold block mb-2">
                    Bespoke Service
                  </span>
                  <h2 className="font-serif text-3xl text-neutral-900">
                    Custom Commission
                  </h2>
                  <p className="text-sm text-neutral-500 font-light mt-2">
                    Share your vision with our master tailors. We will finalise the details via WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full border-b border-neutral-200 py-2 focus:border-[#C9A35A] outline-none transition-colors font-light"
                      placeholder="e.g. Ibrahim Musa"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">Phone Number</label>
                    <input
                      required
                      type="tel"
                      className="w-full border-b border-neutral-200 py-2 focus:border-[#C9A35A] outline-none transition-colors font-light"
                      placeholder="+27..."
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">Message & Requirements</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full border-b border-neutral-200 py-2 focus:border-[#C9A35A] outline-none transition-colors font-light resize-none"
                      placeholder="e.g. Specific measurements or fabric preferences..."
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-neutral-900 text-white py-4 mt-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#C9A35A] transition-all flex items-center justify-center gap-3"
                  >
                    Start Consultation <Send size={12} />
                  </button>
                </form>

                <div className="mt-8 flex items-center gap-4 text-[9px] text-neutral-400 uppercase tracking-widest">
                  <CheckCircle2 size={12} className="text-[#C9A35A]" />
                  Secure WhatsApp Encryption
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
