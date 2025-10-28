"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext"; // adjust path if needed

const ACCENT = "#C5A34A";

/**
 * Displays the latest N shop products from global context.
 * - Avoids redundant API calls (uses context)
 * - Handles empty/loading states gracefully
 * - Responsive grid
 */
export default function ShopProductsPreview({ limit = 8 }) {
  const { products } = useAppContext();
  const isLoading = !products || products.length === 0;

  const visibleProducts = products.slice(0, limit);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visibleProducts.length === 0 ? (
            <div className="col-span-full bg-white p-4 rounded text-sm text-gray-600">
              No shop products available yet.
            </div>
          ) : (
            visibleProducts.map((p) => (
              <article
                key={p._id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <Link
                  href={`/all-shop-products/${p.slug || p._id}`}
                  className="block"
                >
                  <div className="relative w-full h-40 bg-gray-100">
                    {p.image?.[0] ? (
                      <Image
                        src={p.image[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate">{p.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {p.category || "Uncategorized"}
                      </span>
                      <span
                        className="text-xs text-white px-2 py-0.5 rounded"
                        style={{ background: ACCENT }}
                      >
                        Shop
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
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
