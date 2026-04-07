"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function ShopProductsPreview({ limit = 8 }) {
  const { products, currency, addToCart, loadingProducts } = useAppContext();
  const [hoveredId, setHoveredId] = useState(null);

  const visibleProducts = products?.slice(0, limit) || [];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Luxury Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.4em] text-[#C9A35A] uppercase font-bold">
              Ready-to-Wear
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight">
              Latest Shop Creations
            </h2>
            <p className="text-neutral-500 font-light text-sm md:text-base max-w-md">
              Hand-crafted pieces from our Cape Town atelier, blending traditional African silhouettes with modern luxury.
            </p>
          </div>
          
          <Link
            href="/all-shop-products"
            className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-bold border-b border-neutral-200 pb-2 hover:border-[#C9A35A] transition-colors"
          >
            Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {loadingProducts ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-[3/4] bg-neutral-100" />
                <div className="h-4 bg-neutral-100 w-2/3 mx-auto" />
                <div className="h-4 bg-neutral-100 w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {visibleProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredId(product._id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
              >
                {/* Product Image */}
                <Link href={`/all-shop-products/${product.slug || product._id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 mb-6">
                    {product.image?.[0] ? (
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] tracking-widest text-neutral-300">
                        IMAGE UNAVAILABLE
                      </div>
                    )}

                    {/* Quick Add Overlay */}
                    <AnimatePresence>
                      {hoveredId === product._id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-4"
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product._id);
                            }}
                            className="w-full bg-white/90 backdrop-blur-md text-black py-3 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ShoppingBag className="w-3 h-3" /> Quick Add
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Badge */}
                    {product.offerPrice < product.price && (
                      <span className="absolute top-4 left-4 bg-[#C9A35A] text-white text-[8px] tracking-[0.2em] px-2 py-1 uppercase">
                        Sale
                      </span>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="text-center space-y-1 px-2">
                  <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-lg tracking-tight group-hover:text-[#C9A35A] transition-colors">
                    <Link href={`/all-shop-products/${product.slug || product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    {product.offerPrice < product.price ? (
                      <>
                        <span className="text-sm font-medium text-neutral-900">
                          {currency}{product.offerPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-neutral-400 line-through">
                          {currency}{product.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-medium text-neutral-900">
                        {currency}{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/all-shop-products"
            className="inline-block px-12 py-4 border border-neutral-200 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-black hover:text-white hover:border-black transition-all duration-500"
          >
            View All Pieces
          </Link>
        </div>
      </div>
    </section>
  );
}
