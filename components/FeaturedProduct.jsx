"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import { ArrowUpRight } from "lucide-react";

const theme = {
  accent: "#C9A35A",
  text: "#1A1A1A",
  background: "#FFFFFF",
};

const featuredCollections = [
  {
    id: 1,
    category: "Men's Collection",
    image: assets.men_collection_image,
    slogan: "Tailored for Royalty",
    description: "Experience garments that embody strength and refinement. Each stitch defines elegance crafted for the modern African gentleman.",
    filter: "Men",
  },
  {
    id: 2,
    category: "Women's Collection",
    image: assets.women_collection_image,
    slogan: "Empowerment in Every Seam",
    description: "A celebration of grace, confidence, and culture. Our bespoke pieces redefine feminine beauty through African artistry.",
    filter: "Women",
  },
  {
    id: 3,
    category: "Kid's Collection",
    image: assets.kids_collection_image,
    slogan: "Joy Woven in Tradition",
    description: "Playful, bright, and heritage-rich — our kids’ line brings the warmth of African tradition to every little outfit.",
    filter: "Kids",
  },
  {
    id: 4,
    category: "Accessories",
    image: assets.accessories_collection_image,
    slogan: "The Art of Details",
    description: "From handcrafted jewelry to bespoke details, our accessories define elegance — subtle, refined, and distinctly African.",
    filter: "Accessories",
  },
];

const FeaturedProduct = () => {
  const router = useRouter();

  const handleExplore = (filter) => {
    router.push(`/all-shop-products?category=${encodeURIComponent(filter)}`);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle brand background element */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.03] flex items-center justify-center">
        <h2 className="text-[20vw] font-serif select-none">IBRAHIM</h2>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] tracking-[0.5em] text-[#C9A35A] uppercase font-bold mb-4 block"
        >
          Curated Selections
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6"
        >
          Signature Collections
        </motion.h2>
        <p className="text-neutral-500 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          A fusion of African heritage and contemporary design, 
          handcrafted for those who value artistry and culture.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1 px-4 md:px-6">
        {featuredCollections.map(({ id, category, image, slogan, description, filter }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: id * 0.1 }}
            onClick={() => handleExplore(filter)}
            className="relative group cursor-pointer overflow-hidden aspect-[4/5] bg-neutral-100"
          >
            {/* Image with Ken Burns effect on hover */}
            <Image
              src={image}
              alt={category}
              fill
              className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Sophisticated Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <span className="text-[9px] tracking-[0.3em] text-[#C9A35A] uppercase font-bold mb-2">
                {category}
              </span>
              <h4 className="font-serif text-2xl text-white mb-3 leading-tight">
                {slogan}
              </h4>
              
              {/* Expandable Description */}
              <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-700 ease-in-out">
                <p className="text-xs text-white/70 leading-relaxed font-light mb-4">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-white text-[10px] tracking-[0.2em] uppercase font-medium mt-2">
                Explore <ArrowUpRight className="w-3 h-3 text-[#C9A35A]" />
              </div>
            </div>

            {/* Border glow on hover */}
            <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
