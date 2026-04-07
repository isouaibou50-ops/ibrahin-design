"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Star, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

const TikTokIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const THEME = {
  accent: "#C9A35A",
  dark: "#0E0E0E",
  border: "rgba(201, 163, 90, 0.15)"
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E0E0E] text-white pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Top Section: Brand & Newsletter Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="group block">
              <span className="block text-[10px] tracking-[0.5em] text-[#C9A35A] uppercase mb-2">
                Bespoke Tailoring
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                Ibrahim Design
              </h2>
            </Link>
            
            <p className="text-neutral-400 font-light leading-relaxed max-w-md text-sm md:text-base">
              Bespoke African fashion handcrafted in the heart of Cape Town. We blend ancestral heritage with contemporary silhouettes to create garments that are worn with pride.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#C9A35A] text-[#C9A35A]" />
                ))}
              </div>
              <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-bold">
                5,000+ Masterpieces Created
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9A35A]">
              Collections
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Men’s Fashion", href: "/all-shop-products?category=Men" },
                { name: "Women’s Fashion", href: "/all-shop-products?category=Women" },
                { name: "Children’s Fashion", href: "/all-shop-products?category=Kids" },
                { name: "Atelier Gallery", href: "/gallery" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors font-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Visit */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9A35A]">
              Visit the Atelier
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <MapPin className="h-5 w-5 text-[#C9A35A] flex-shrink-0" />
                <span className="text-sm text-neutral-400 font-light leading-relaxed">
                  Green Market, Protea House, 7, <br />
                  Cape Town City Centre, 8001
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-[#C9A35A]" />
                <a href="tel:0837212432" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  083 721 2432
                </a>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-[#C9A35A]" />
                <div className="text-sm text-neutral-400 font-light space-y-1">
                  <p>Mon–Fri: 08:00 – 18:00</p>
                  <p>Sat: 08:30 – 17:30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social / Direct */}
          <div className="lg:col-span-2 flex flex-col gap-6">
             <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9A35A]">
              Follow Us
            </h3>
            <div className="flex flex-col gap-4">
              <a href="https://www.instagram.com/ibrahimdesign20/?hl=en" target="_blank" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white group">
                <Instagram className="h-4 w-4" /> Instagram <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
              <a href="https://www.facebook.com/p/Ibrahim-Designs-Sb-100063653645951" target="_blank" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white group">
                <Facebook className="h-4 w-4" /> Facebook <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
              <a href="https://www.tiktok.com/@ibrahimdesign20" target="_blank" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white group">
                <TikTokIcon className="h-4 w-4" /> TikTok <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Signature */}
        <div className="pt-10 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <p className="text-[10px] text-neutral-600 tracking-[0.2em] uppercase font-bold">
              © {currentYear} Ibrahim Design Co.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors tracking-widest uppercase">Privacy</Link>
              <Link href="/terms" className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors tracking-widest uppercase">Terms</Link>
            </div>
          </div>
          
          <div className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase flex items-center gap-2">
            <span className="w-8 h-[1px] bg-neutral-800" />
            Made in Cape Town
            <span className="w-8 h-[1px] bg-neutral-800" />
          </div>
        </div>
      </div>
    </footer>
  );
}
