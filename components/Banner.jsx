"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-amber-50 via-white to-amber-50/40 rounded-2xl my-20 overflow-hidden shadow-sm border border-amber-100/60">
      {/* Left Image */}
      <div className="flex-1 flex justify-center items-center bg-amber-50/30 py-8 md:py-0">
        <Image
          src={assets.tailor_craft_image} // replace with one of your atelier / model images
          alt="Tailoring workshop"
          width={400}
          height={400}
          className="w-4/5 md:w-[80%] lg:w-[70%] rounded-lg object-cover"
        />
      </div>

      {/* Center Text */}
      <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 md:px-12 py-10 md:py-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 leading-snug max-w-md">
          Tailored Excellence. <br />
          <span className="text-amber-600">Designed for You.</span>
        </h2>

        <p className="text-gray-600 text-sm md:text-base max-w-sm leading-relaxed">
          Discover the art of bespoke African tailoring — where every stitch
          celebrates your individuality. Visit our atelier in Cape Town or
          design your masterpiece online.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button className="group flex items-center justify-center gap-2 px-8 py-2.5 bg-amber-600 hover:bg-amber-700 transition text-white text-sm md:text-base rounded-full shadow-md">
            Explore Collection
            <Image
              src={assets.arrow_icon_white}
              alt="arrow_icon_white"
              className="group-hover:translate-x-1 transition-transform w-4 h-4"
            />
          </button>

          <button className="px-8 py-2.5 border border-amber-600 text-amber-700 hover:bg-amber-50 rounded-full text-sm md:text-base font-medium transition">
            Book a Fitting
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:flex flex-1 justify-center items-center bg-amber-50/30 py-8">
        <Image
          src={assets.traditional_fabric_image} // replace with another theme image
          alt="African fabric"
          width={400}
          height={400}
          className="w-[70%] rounded-lg object-cover"
        />
      </div>
    </section>
  );
};

export default Banner;
