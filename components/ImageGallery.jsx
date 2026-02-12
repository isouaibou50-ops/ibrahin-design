// components/ImageGallery.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-sm text-gray-400">No image</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[80vw] sm:h-[70vh] md:h-[70vh] lg:h-[80h] rounded-lg overflow-hidden bg-gray-50">
        <Image src={images[index]} alt={`product-${index}`} fill style={{ objectFit: "contain" }} priority={index === 0} />
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            type="button"
            className={`shrink-0 w-20 h-14 rounded overflow-hidden border ${i === index ? "ring-2 ring-offset-1" : "border-gray-200"} bg-white`}
            aria-label={`Show image ${i + 1}`}
          >
            <div className="w-full h-full relative">
              <Image src={src} alt={`thumb-${i}`} fill style={{ objectFit: "cover" }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
