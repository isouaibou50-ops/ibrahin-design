"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/assets";

const sliderData = [
  {
    id: 1,
    image: assets.slidethree,
    quote:
      "UNIQUE COUTURE EVENING GOWNS THAT ARE NOT AIMED AT CAMOUFLAGING THE WOMAN, BUT DRESSING AND ENHANCING HER FEMININE CHARACTER.",
    primaryText: "Design Yours",
    secondaryText: "Explore Styles",
    path1: "/dashboard",
    path2: "/all-shop-products",
  },
  {
    id: 2,
    image: assets.slidezero,
    quote:
      "AN EXCEPTIONAL CUSTOM-FIT EXPERIENCE, TAILORED TO PERFECTION AND MADE IN CAPE TOWN.",
    primaryText: "View Collection",
    secondaryText: "Contact Us",
    path1: "/all-shop-products",
    path2: "/contact",
  },
  {
    id: 3,
    image: assets.slideone,
    quote:
      "FROM CONCEPT TO CREATION — WE BRING YOUR VISION TO LIFE WITH PRECISION AND ARTISTRY.",
    primaryText: "Create Custom Order",
    secondaryText: "Learn More",
    path1: "/alterations-and-repairs",
    path2: "/about",
  },
];

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-screen lg:h-[90vh] overflow-hidden bg-neutral-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Zooming Image Container (Ken Burns Effect) */}
          <motion.div 
            className="relative w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
          >
            <Image
              src={sliderData[currentSlide].image}
              alt="Ibrahim Design Couture"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          {/* Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-4xl space-y-8">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block text-[10px] md:text-xs tracking-[0.5em] text-[#C9A35A] uppercase font-medium"
              >
                Bespoke Excellence
              </motion.span>

              <motion.p
                className="text-white font-serif text-xl md:text-3xl lg:text-4xl tracking-wide leading-relaxed italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                &ldquo;{sliderData[currentSlide].quote}&rdquo;
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1 }}
              >
                <Link
                  href={sliderData[currentSlide].path1}
                  className="group relative px-10 py-4 bg-[#C9A35A] text-white text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-300 hover:bg-[#1A1A1A]"
                >
                  <span className="relative z-10">{sliderData[currentSlide].primaryText}</span>
                </Link>

                <Link
                  href={sliderData[currentSlide].path2}
                  className="px-10 py-4 border border-white/30 text-white text-[10px] tracking-[0.3em] uppercase backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500"
                >
                  {sliderData[currentSlide].secondaryText}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modern Minimalist Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative p-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`h-[2px] transition-all duration-500 ${
              currentSlide === index ? "w-12 bg-[#C9A35A]" : "w-6 bg-white/40 group-hover:bg-white"
            }`} />
          </button>
        ))}
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-0 right-12 hidden lg:block w-[1px] h-24 bg-gradient-to-t from-white/50 to-transparent z-20" />
    </section>
  );
};

export default HeaderSlider;
