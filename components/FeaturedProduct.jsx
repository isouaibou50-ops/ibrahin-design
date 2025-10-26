"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const featured = [
  {
    id: 1,
    image: assets.african_attire_image, // replace with your attire image
    title: "The Essence of Elegance",
    description:
      "Tailored with precision, inspired by African heritage — each piece tells a story of confidence and grace.",
  },
  {
    id: 2,
    image: assets.tailor_craft_image, // replace with your workshop image
    title: "Handcrafted to Perfection",
    description:
      "Every stitch is a celebration of artistry. Experience craftsmanship made with passion in Cape Town.",
  },
  {
    id: 3,
    image: assets.traditional_fabric_image, // replace with your fabric image
    title: "Heritage in Every Thread",
    description:
      "Where traditional fabrics meet modern design — curated exclusively by Ibrahim Design.",
  },
];

const FeaturedProduct = () => {
  return (
    <section className="mt-20 md:mt-28 bg-gradient-to-b from-white to-amber-50/40 py-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-gray-900 tracking-wide">
          Our Featured Creations
        </h2>
        <div className="mt-3 w-24 h-1 bg-amber-600 rounded-full"></div>
        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-md">
          Discover a collection where artistry, culture, and craftsmanship unite
          to redefine contemporary African tailoring.
        </p>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-5">
        {featured.map(({ id, image, title, description }) => (
          <div
            key={id}
            className="relative group overflow-hidden rounded-2xl shadow-sm bg-gray-100"
          >
            {/* Image */}
            <Image
              src={image}
              alt={title}
              width={800}
              height={600}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-300"></div>

            {/* Content */}
            <div className="absolute bottom-8 left-6 right-6 text-white transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-wide">
                {title}
              </h3>
              <p className="text-sm sm:text-base mt-2 text-white/90 leading-relaxed max-w-[90%]">
                {description}
              </p>
              <button className="mt-4 inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 shadow-md">
                Explore <Image src={assets.redirect_icon} alt="arrow" className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
