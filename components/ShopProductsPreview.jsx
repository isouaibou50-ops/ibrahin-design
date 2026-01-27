"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const ACCENT = "#C5A34A";

export default function ShopProductsPreview({ limit = 8 }) {
  const { products } = useAppContext();
  const isLoading = !products || products.length === 0;
  const visibleProducts = products.slice(0, limit);

  const scrollRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-semibold">Latest Shop Creations</h2>
          <p className="text-sm text-gray-600">
            Handmade pieces crafted in Cape Town — browse our newest items.
          </p>
        </div>
        <Link
          href="/all-shop-products"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition"
          style={{ background: ACCENT, color: "#fff" }}
        >
          View more
        </Link>
      </div>

      {/* Loading shimmer */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg bg-white animate-pulse p-3"
            >
              <div className="w-full h-40 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
        >
          {visibleProducts.map((p) => (
            <div
              key={p._id}
              className="flex-shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] snap-start"
              onMouseEnter={() => setHoveredId(p._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                href={`/all-shop-products/${p.slug || p._id}`}
                className="block group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                  {p.image?.[0] ? (
                    <Image
                      src={p.image[0]}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-300 ${
                      hoveredId === p._id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                      <Eye className="w-4 h-4" />
                    </span>
                    <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                      <ShoppingBag className="w-4 h-4" />
                    </span>
                    <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                      <Heart className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center">
                  <h3 className="text-xs tracking-[0.1em] mb-2 line-clamp-2 min-h-[2.5rem]">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {p.category || "Signature Piece"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/all-shop-products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded border text-sm font-medium transition hover:bg-gray-50"
          style={{ borderColor: `${ACCENT}33` }}
        >
          See all shop products
        </Link>
      </div>
    </section>
  );
}
