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
    const timer = setInterval(nextSlide, 9000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{
            y: "-8%",
            scale: 1.15,
            opacity: 0,
          }}
          animate={{
            y: "0%",
            scale: 1,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            y: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 6, ease: "easeOut" }, // slow zoom-out
            opacity: { duration: 0.6 },
          }}
        >
          {/* Image */}
          <Image
            src={sliderData[currentSlide].image}
            alt="Ibrahim Design Couture"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.p
              className="max-w-3xl text-white font-serif tracking-wide leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9 }}
            >
              “{sliderData[currentSlide].quote}”
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9 }}
            >
              <Link
                href={sliderData[currentSlide].path1}
                className="px-8 py-3 bg-[#C5A34A] text-white rounded-full tracking-wide hover:bg-[#b08d3e] transition"
              >
                {sliderData[currentSlide].primaryText}
              </Link>

              <Link
                href={sliderData[currentSlide].path2}
                className="px-8 py-3 border border-white/50 text-white rounded-full hover:bg-white/10 transition"
              >
                {sliderData[currentSlide].secondaryText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeaderSlider;
