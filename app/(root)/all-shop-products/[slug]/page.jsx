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

function normalizeImages(raw) {
  if (!raw) return [];
  const extractUrls = (text) => {
    if (!text || typeof text !== "string") return [];
    const urlRegex = /https?:\/\/[^"'\s]+?\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?[^"'\s]*)?/gi;
    const matches = text.match(urlRegex);
    return matches || text.match(/https?:\/\/[^\s"']+/gi) || [];
  };
  let arr = [];
  if (Array.isArray(raw)) {
    raw.forEach((entry) => {
      if (typeof entry === "string") arr.push(...extractUrls(entry));
      else if (entry && entry.url) arr.push(...extractUrls(entry.url));
    });
  } else if (typeof raw === "string") arr.push(...extractUrls(raw));
  else if (raw && raw.url) arr.push(...extractUrls(raw.url));
  return Array.from(new Set(arr.map((u) => u.trim()))).filter((u) => /^https?:\/\//i.test(u));
}

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
  const { slug } = await params;
  await connectDB();

  let productRaw = null;
  const isObjectId = typeof slug === "string" && /^[0-9a-fA-F]{24}$/.test(slug);

  if (isObjectId) productRaw = await ShopProduct.findById(slug).lean();
  if (!productRaw) productRaw = await ShopProduct.findOne({ slug }).lean();
  if (!productRaw) return notFound();

  const product = serializeProduct(productRaw);
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
    <main className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <ImageGallery images={images} />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs px-2 py-1 rounded text-white" style={{ background: ACCENT }}>
                {product.category}
              </span>
              {product.offerPrice != null && (
                <span className="text-xs px-2 py-1 rounded border text-gray-700">Offer</span>
              )}
              <span className="text-xs text-gray-500">{new Date(product.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold mb-3">{product.name}</h1>
              {product.offerPrice != null ? (
                <div className="flex items-baseline gap-3 mb-3">
                  <div className="text-xl font-semibold text-gray-900">R {product.offerPrice}</div>
                  <div className="text-sm line-through text-gray-400">R {product.price}</div>
                </div>
              ) : (
                <div className="text-lg font-medium text-gray-900 mb-3">{product.price ? `R ${product.price}` : ""}</div>
              )}

              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>

              <div className="text-sm text-gray-600 mb-4">
                <div>
                  Category: <strong className="text-gray-800">{product.category}</strong>
                </div>
                <div className="mt-1">
                  Product ID: <span className="text-xs text-gray-500">{product._id}</span>
                </div>
              </div>

              <QuickActions product={product} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <ShareButton product={product} />
              <WishlistButton productId={product._id} />
            </div>
          </div>
        </div>

        <div className="my-10 border-t pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Related Creations</h2>
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
                        <span className="text-xs text-white px-2 py-0.5 rounded" style={{ background: ACCENT }}>
                          Shop
                        </span>
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
