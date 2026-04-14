"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ images = [] }) {
  const [activeImg, setActiveImg] = useState(images[0] || "/placeholder.jpg");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      {/* VERTICAL THUMBNAIL LIST */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImg(img)}
            className={`relative aspect-[3/4] w-20 md:w-full flex-shrink-0 overflow-hidden transition-all duration-300 border ${
              activeImg === img 
                ? "border-[#C9A35A] opacity-100" 
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>

      {/* MAIN VIEWPORT */}
      <div className="relative flex-1 aspect-[3/4] bg-neutral-50 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full cursor-zoom-in"
          >
            <Image
              src={activeImg}
              alt="Main Product View"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Brand Watermark Overlay */}
        <div className="absolute bottom-6 right-6 pointer-events-none opacity-20">
          <span className="text-[10px] tracking-[0.4em] font-serif uppercase">
            Ibrahim Design
          </span>
        </div>
      </div>
    </div>
  );
}
