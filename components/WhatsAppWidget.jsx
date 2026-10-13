
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Prevent server-side hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide the widget on the services page and its nested routes
  const isServicesPage =
    pathname === "/services" ||
    pathname?.startsWith("/services/");

  // Formatted for South African WhatsApp click-to-chat
  const whatsappUrl = "https://wa.me/27837212432";

  if (!mounted || isServicesPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans pointer-events-auto select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="mb-4 w-[330px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12]/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Premium Branding Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-neutral-900 via-[#16161a] to-neutral-900 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 font-serif text-lg font-bold text-amber-400">
                  I
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-[#0d0d12] bg-emerald-500" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold leading-tight text-neutral-100">
                    Ibrahim Design
                  </h4>
                  <p className="mt-0.5 text-[11px] font-medium tracking-wide text-amber-400/80">
                    CAPE TOWN ATELIER
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close chat window"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Conversation Canvas */}
            <div className="relative flex min-h-[120px] flex-col justify-end bg-[#09090d] p-4">
              <div className="max-w-[90%] rounded-2xl rounded-tl-none border border-white/5 bg-[#13131a] p-3.5 text-xs leading-relaxed text-neutral-300 shadow-md">
                Greetings from Ibrahim Design. How can our master tailors assist you with your custom styling, alterations, or traditional attire today?
              </div>
            </div>

            {/* Futuristic Intermediary Action Tray */}
            <div className="border-t border-white/5 bg-[#0d0d12] p-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-emerald-950/20 transition-all duration-200 hover:bg-emerald-500 active:bg-emerald-700"
              >
                <span>Initiate WhatsApp Securely</span>
                <Send size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Action Toggle Pulse */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-600 text-white shadow-xl shadow-emerald-950/40 transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#050507]"
        aria-label={isOpen ? "Close chat interface" : "Open chat interface"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={26} />
        ) : (
          <MessageCircle size={26} className="fill-current" />
        )}
      </motion.button>
    </div>
  );
}
