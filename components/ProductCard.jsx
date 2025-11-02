"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { router } = useAppContext();

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="group relative flex flex-col items-start cursor-pointer rounded-2xl overflow-hidden shadow-sm bg-gradient-to-b from-white to-gray-50 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative w-full h-60 md:h-64 flex items-center justify-center bg-gray-100 overflow-hidden">
        <Image
          src={product.image[0]}
          alt={product.name}
          width={600}
          height={600}
          className="object-cover w-full h-full rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />
        {/* Heart Icon */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-gold-100 hover:scale-105 transition-all"
        >
          <Image
            src={assets.heart_icon}
            alt="heart_icon"
            width={14}
            height={14}
            className="opacity-80"
          />
        </button>
      </div>

      {/* Content */}
      <div className="w-full px-3 sm:px-4 py-3 flex flex-col gap-1.5 text-left">
        <p className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition line-clamp-1">
          {product.name}
        </p>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="bg-white flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-600">4.5</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={
                  index < 4
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="star"
                width={13}
                height={13}
                className={
                  index < 4
                    ? "brightness-125 hue-rotate-15 saturate-[1.5]"
                    : "opacity-50"
                }
              />
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end mt-2">
          <button className="text-xs sm:text-sm px-5 py-1.5 rounded-full border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all duration-300">
            View Details
          </button>
        </div>
      </div>

      {/* Subtle Gradient Overlay on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-amber-50/20 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ProductCard;
