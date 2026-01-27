"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image */}
          <Image
            src={slide.image}
            alt="Ibrahim Design Couture"
            fill
            priority={index === 0}
            className="object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p
              className={`max-w-3xl text-white font-serif tracking-wide leading-relaxed transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              “{slide.quote}”
            </p>

            {/* CTAs (kept but refined) */}
            <div
              className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <Link
                href={slide.path1}
                className="px-8 py-3 bg-[#C5A34A] text-white rounded-full tracking-wide hover:bg-[#b08d3e] transition"
              >
                {slide.primaryText}
              </Link>

              <Link
                href={slide.path2}
                className="px-8 py-3 border border-white/50 text-white rounded-full hover:bg-white/10 transition"
              >
                {slide.secondaryText}
              </Link>
            </div>
          </div>
        </div>
      ))}

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
