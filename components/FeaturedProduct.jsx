"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

const theme = {
  accent: "#C5A34A",
  text: "#1A1A1A",
  background: "#FFFFFF",
};

const featuredCollections = [
  {
    id: 1,
    category: "Men's Collection",
    image: assets.men_collection_image,
    slogan: "Tailored for Royalty",
    description:
      "Experience garments that embody strength and refinement. Each stitch defines elegance crafted for the modern African gentleman.",
    filter: "men",
  },
  {
    id: 2,
    category: "Women's Collection",
    image: assets.women_collection_image,
    slogan: "Empowerment in Every Seam",
    description:
      "A celebration of grace, confidence, and culture. Our bespoke pieces redefine feminine beauty through African artistry.",
    filter: "women",
  },
  {
    id: 3,
    category: "Kid's Collection",
    image: assets.kids_collection_image,
    slogan: "Joy Woven in Tradition",
    description:
      "Playful, bright, and heritage-rich — our kids’ line brings the warmth of African tradition to every little outfit.",
    filter: "kids",
  },
  {
    id: 4,
    category: "Accessories",
    image: assets.accessories_collection_image,
    slogan: "The Art of Finishing Touches",
    description:
      "From handcrafted jewelry to bespoke details, our accessories define elegance — subtle, refined, and distinctly African.",
    filter: "accessories",
  },
];

const FeaturedProduct = () => {
  const router = useRouter();

  const handleExplore = (filter) => {
    router.push(`/all-shop-products?category=${encodeURIComponent(filter)}`);
  };

  return (
    <section className="mt-12 md:mt-20 bg-white py-16 relative overflow-hidden">
      {/* Decorative accent circles */}
      <div
        className="absolute top-0 left-0 w-56 h-56 bg-[rgba(197,163,74,0.1)] rounded-full blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 w-56 h-56 bg-[rgba(197,163,74,0.1)] rounded-full blur-3xl"
        aria-hidden
      />

      {/* Header */}
      <div className="relative z-10 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-theme-text"
          style={{ color: theme.text }}
        >
          Discover Our Signature Collections
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-3 w-20 h-1.5 rounded-full origin-left"
          style={{ backgroundColor: theme.accent }}
        />
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Every collection is a fusion of African heritage and contemporary design — handcrafted for those who value artistry, culture, and timeless style.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-14 px-6 md:px-12 lg:px-20">
        {featuredCollections.map(({ id, category, image, slogan, description, filter }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: id * 0.1 }}
            className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500"
          >
            {/* Image */}
            <Image
              src={image}
              alt={category}
              width={800}
              height={600}
              className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-6 left-5 right-5 text-white">
              <h3 className="text-xs uppercase tracking-widest font-medium opacity-80">
                {category}
              </h3>
              <h4 className="font-serif text-xl sm:text-2xl font-semibold mt-1 mb-2 text-[rgba(245,231,182,1)]">
                {slogan}
              </h4>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                {description}
              </p>

              <button
                onClick={() => handleExplore(filter)}
                className="inline-flex items-center gap-2 bg-[rgba(197,163,74,1)] hover:bg-[rgba(180,147,63,1)] text-white text-sm font-medium px-4 py-2 rounded-full shadow-md transition-colors duration-300"
              >
                Explore Collection
                <Image
                  src={assets.redirect_icon}
                  alt="arrow"
                  width={13}
                  height={13}
                  className="invert brightness-200"
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
