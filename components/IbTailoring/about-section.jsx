"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

export function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Composition */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl">
              <Image
                src="/about-bg.webp" // Ensure this path is correct or use assets.aboutImage
                alt="Atelier craftsmanship"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-[#1A1A1A]/5 mix-blend-multiply" />
            </div>

            {/* Decorative Gold Frame (Floating Element) */}
            <div className="absolute -bottom-6 -right-6 w-1/2 aspect-square border border-[#C9A35A] -z-10 hidden md:block" />
            
            {/* Established Date Label */}
            <div className="absolute top-10 -left-10 bg-white p-6 shadow-xl hidden xl:block">
              <p className="text-[10px] tracking-[0.4em] text-[#C9A35A] font-bold rotate-180 [writing-mode:vertical-lr]">
                EST. CAPE TOWN
              </p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#C9A35A] font-semibold mb-6 uppercase">
              The Ibrahim Legacy
            </span>

            <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-8 leading-[1.1] text-neutral-900">
              Where Heritage <br /> 
              <span className="italic font-light">Meets Haute Couture</span>
            </h2>

            <div className="space-y-6 text-neutral-600 text-sm md:text-base leading-relaxed mb-10 font-light">
              <p>
                Founded in the heart of Cape Town’s vibrant landscape, Ibrahim Design is more than a label—it is a sanctuary for African heritage reimagined through the lens of modern tailoring.
              </p>
              
              <p className="border-l-2 border-[#C9A35A] pl-6 italic py-1">
                "We don't just create garments; we weave stories of culture, character, and individual elegance into every seam."
              </p>

              <p>
                Whether it is the intricate geometry of a traditional Agbada or the sharp precision of a custom contemporary suit, our studio provides a bespoke made-to-measure experience that honors the unique silhouette of every client.
              </p>
            </div>

            <Link
              href="/about"
              className="group relative inline-flex items-center gap-4 text-[10px] tracking-[0.3em] font-bold uppercase"
            >
              <span className="relative">
                Discover Our Story
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-black transform origin-left transition-transform duration-300 group-hover:scale-x-0" />
              </span>
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-8 h-[1px] bg-[#C9A35A]"
              />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
