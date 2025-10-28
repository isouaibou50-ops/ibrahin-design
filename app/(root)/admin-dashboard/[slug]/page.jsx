// app/shop-products/[slug]/page.jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";

import ImageGallery from "@/components/ImageGallery";
import QuickActions from "@/components/QuickActions";
import ShareButton from "@/components/ShareButton";
import WishlistButton from "@/components/WishlistButton";

export const dynamic = "force-dynamic";
const ACCENT = "#C5A34A";

/** Normalize and sanitize image fields:
 *  - Accept strings or arrays
 *  - Extract http(s) URLs using regex
 *  - Deduplicate
 *  - Return array of valid URLs (strings)
 */
function normalizeImages(raw) {
  if (!raw) return [];

  const extractUrls = (text) => {
    if (!text || typeof text !== "string") return [];
    // find http(s) URLs ending with common image extensions or webp (loose)
    const urlRegex = /https?:\/\/[^"'\s]+?\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?[^"'\s]*)?/gi;
    const matches = text.match(urlRegex);
    if (matches) return matches;
    // fallback: try to capture any http(s) URL if file extension missing
    const anyUrl = text.match(/https?:\/\/[^\s"']+/gi);
    return anyUrl || [];
  };

  let arr = [];

  if (Array.isArray(raw)) {
    raw.forEach((entry) => {
      if (typeof entry === "string") {
        arr.push(...extractUrls(entry));
      } else if (entry && entry.url && typeof entry.url === "string") {
        arr.push(...extractUrls(entry.url));
      }
    });
  } else if (typeof raw === "string") {
    arr.push(...extractUrls(raw));
  } else if (typeof raw === "object" && raw.url) {
    arr.push(...extractUrls(raw.url));
  }

  // cleanup: trim, dedupe, ensure startsWith http
  const cleaned = Array.from(new Set(arr.map((u) => (u || "").trim()))).filter((u) =>
    /^https?:\/\//i.test(u)
  );

  // As a last safety: remove entries that accidentally concatenate multiple URLs
  // (e.g. "...webphttps://res.cloudinary..." - our regex would have extracted the two separately;
  // but if an entry passed through still contains no match, it won't be included.)
  return cleaned;
}

/** Convert raw mongoose document (lean) to serializable product */
function serializeProduct(doc) {
  if (!doc) return null;
  const images = normalizeImages(doc.image);
  return {
    _id: String(doc._id),
    name: doc.name || "",
    slug: doc.slug || "",
    description: doc.description || "",
    price: typeof doc.price === "number" ? doc.price : null,
    offerPrice: typeof doc.offerPrice === "number" ? doc.offerPrice : null,
    image: images,
    category: doc.category || "Uncategorized",
    isPublic: !!doc.isPublic,
    date: doc.date ? Number(doc.date) : doc.createdAt ? new Date(doc.createdAt).getTime() : Date.now(),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
  };
}

export default async function ProductPage({ params }) {
  // Important: await params (Next 15 dynamic API guidance)
  const { slug } = await params;

  await connectDB();

  let productRaw = null;
  const isObjectId = typeof slug === "string" && /^[0-9a-fA-F]{24}$/.test(slug);

  if (isObjectId) {
    productRaw = await ShopProduct.findById(slug).lean();
  }
  if (!productRaw) {
    productRaw = await ShopProduct.findOne({ slug }).lean();
  }
  if (!productRaw) {
    return notFound();
  }

  const product = serializeProduct(productRaw);

  // Only show related public items, exclude this product
  const relatedRaw = await ShopProduct.find({
    category: product.category || "Uncategorized",
    _id: { $ne: product._id },
    isPublic: true,
  })
    .sort({ date: -1 })
    .limit(4)
    .lean();

  const related = Array.isArray(relatedRaw) ? relatedRaw.map(serializeProduct) : [];

  const images = product.image && product.image.length ? product.image : [];

  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            {/* pass only an array of strings (URLs) to client gallery */}
            <ImageGallery images={images} />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs px-2 py-1 rounded text-white" style={{ background: ACCENT }}>
                {product.category}
              </span>
              {product.offerPrice != null && <span className="text-xs px-2 py-1 rounded border text-gray-700">Offer</span>}
              <span className="text-xs text-gray-500">{new Date(product.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <h1 className="text-2xl sm:text-3xl font-semibold">{product.name}</h1>

            <div className="mt-3">
              {product.offerPrice != null ? (
                <div className="flex items-baseline gap-3">
                  <div className="text-xl font-semibold text-gray-900">R {product.offerPrice}</div>
                  <div className="text-sm line-through text-gray-400">R {product.price}</div>
                </div>
              ) : (
                <div className="text-lg font-medium text-gray-900">{product.price ? `R ${product.price}` : ""}</div>
              )}
            </div>

            <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>

            <div className="mt-4 text-sm text-gray-600">
              <div>Category: <strong className="text-gray-800">{product.category}</strong></div>
              <div className="mt-1">Product ID: <span className="text-xs text-gray-500">{product._id}</span></div>
            </div>

            <QuickActions product={product} />

            <div className="mt-6 flex items-center gap-3">
              <ShareButton product={product} />
              <WishlistButton productId={product._id} />
            </div>
          </div>
        </div>

        <div className="my-10 border-t pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Related creations</h2>
            <Link href="/all-shop-products" className="text-sm" style={{ color: ACCENT }}>
              View all
            </Link>
          </div>

          {related.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <article key={r._id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                  <Link href={`/shop-products/${r.slug || r._id}`} className="block">
                    <div className="relative w-full h-36 bg-gray-100 flex items-center justify-center">
                      {r.image && r.image.length > 0 ? (
                        // first image guaranteed to be a clean URL by normalizeImages
                        <Image src={r.image[0]} alt={r.name} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <div className="text-xs text-gray-400">No image</div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium truncate">{r.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-400">{r.category}</span>
                        <span className="text-xs text-white px-2 py-0.5 rounded" style={{ background: ACCENT }}>Shop</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-600">No related products found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
