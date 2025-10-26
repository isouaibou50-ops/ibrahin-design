"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title:
        "Discover the Art of African Tailoring — Crafted for You by Ibrahim Design.",
      offer: "Exclusive Custom Orders Open Now!",
      buttonText1: "Design Yours",
      buttonText2: "Explore Styles",
      imgSrc: assets.header_african_attire_image,
    },
    {
      id: 2,
      title: "Step Into Elegance — Where Tradition Meets Modern Design.",
      offer: "Tailored to Perfection, Made in Cape Town.",
      buttonText1: "View Collection",
      buttonText2: "Contact Us",
      imgSrc: assets.header_tailor_workshop_image,
    },
    {
      id: 3,
      title:
        "Wear Your Heritage with Pride — Bespoke Designs for Every Occasion.",
      offer: "From Concept to Creation — We Bring Your Vision to Life.",
      buttonText1: "Create Custom Order",
      buttonText2: "Learn More",
      imgSrc: assets.header_traditional_fabric_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 overflow-hidden rounded-2xl shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="relative min-w-full flex items-center justify-center"
          >
            {/* Background */}
            <div
              className="w-full h-[40vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center rounded-2xl"
              style={{
                backgroundImage: `url(${slide.imgSrc.src})`,
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start text-center md:text-left text-white px-6 sm:px-10 md:px-16 max-w-2xl mx-auto">
              <p className="text-[#C5A34A] font-medium mb-3 text-sm sm:text-base tracking-wide">
                {slide.offer}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 leading-snug drop-shadow-md">
                {slide.title}
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <button className="px-8 py-2.5 bg-[#C5A34A] hover:bg-[#b08d3e] text-white font-medium rounded-full transition">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center justify-center gap-2 px-7 py-2.5 font-medium border border-white/40 text-white hover:bg-white/10 rounded-full transition">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index
                ? "bg-[#C5A34A] scale-110"
                : "bg-white/40 hover:bg-[#C5A34A]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
