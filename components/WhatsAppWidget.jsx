"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent server-side hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Formatted for local South African mobile click-to-chat standards
  const whatsappUrl = "https://wa.me/27837212432";

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans pointer-events-auto select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="mb-4 w-[330px] rounded-2xl border border-white/10 bg-[#0d0d12]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Premium Branding Header */}
            <div className="bg-gradient-to-r from-neutral-900 via-[#16161a] to-neutral-900 p-4 flex items-center justify-between text-white border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center font-serif text-amber-400 font-bold text-lg border border-amber-500/20">
                  I
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0d0d12] rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight text-neutral-100">Ibrahim Design</h4>
                  <p className="text-[11px] text-amber-400/80 font-medium tracking-wide mt-0.5">CAPE TOWN ATELIER</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close chat window"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Conversation Canvas */}
            <div className="p-4 bg-[url('https://githubusercontent.com')] bg-repeat opacity-[0.03] min-h-[120px] flex flex-col justify-end absolute inset-0 pointer-events-none" />
            
            <div className="p-4 relative bg-[#09090d] min-h-[120px] flex flex-col justify-end">
              <div className="bg-[#13131a] border border-white/5 text-neutral-300 p-3.5 rounded-2xl rounded-tl-none text-xs max-w-[90%] shadow-md leading-relaxed font-sans">
                Greetings from Ibrahim Design. How can our master tailors assist you with your custom styling, alterations, or traditional attire today?
              </div>
            </div>

            {/* Futuristic Intermediary Action Tray */}
            <div className="p-3 bg-[#0d0d12] border-t border-white/5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform shadow-lg shadow-emerald-950/20"
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-950/40 border border-emerald-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#050507]"
        aria-label="Open chat interface"
      >
        <MessageCircle size={26} className="fill-current" />
      </motion.button>
    </div>
  );
}

