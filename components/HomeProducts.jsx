"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

// Simple shimmer loader
const ShimmerCard = () => (
  <div className="animate-pulse bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm p-4">
    <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md mb-3"></div>
    <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
  </div>
);

const HomeProducts = () => {
  const { products, router, loading } = useAppContext();

  return (
    <section className="w-full py-14 bg-gradient-to-b from-white via-[#faf8f6] to-[#fdfaf5] px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-playfair font-semibold text-[#1f1d1a]">
            Popular Products
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#b57c2a] to-[#d1a055] rounded mt-2 sm:mt-0"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
          {loading || !products?.length ? (
            // shimmer placeholders
            Array(10)
              .fill(0)
              .map((_, idx) => <ShimmerCard key={idx} />)
          ) : (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          )}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => router.push("/all-products")}
            className="px-8 py-3 text-sm sm:text-base rounded-full font-medium transition-all 
                       bg-gradient-to-r from-[#b57c2a] to-[#d1a055] text-white shadow-md 
                       hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;
