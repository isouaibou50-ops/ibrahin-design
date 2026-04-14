import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";
import { ArrowLeft, Ruler, Truck, ShieldCheck, Share2 } from "lucide-react";

import ImageGallery from "@/components/ImageGallery";
import QuickActions from "@/components/QuickActions";
import ShareButton from "@/components/ShareButton";
import WishlistButton from "@/components/WishlistButton";

export const dynamic = "force-dynamic";
const ACCENT = "#C9A35A";

// Robust image normalizer for consistent gallery performance
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
  
  // Fetch related products from the same category
  const relatedRaw = await ShopProduct.find({
    category: product.category,
    _id: { $ne: product._id },
    isPublic: true,
  }).limit(4).lean();
  
  const related = relatedRaw.map(serializeProduct);
  const images = product.image.length ? product.image : ["/placeholder.jpg"];

  return (
    <main className="bg-white text-neutral-900 pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Breadcrumb / Back */}
        <Link 
          href="/all-shop-products" 
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold mb-8 hover:text-[#C9A35A] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Imagery */}
          <div className="lg:col-span-7 space-y-6">
            <ImageGallery images={images} />
            
            {/* Mobile Info Overlay (Category/Date) */}
            <div className="flex items-center justify-between border-t border-neutral-100 pt-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                Studio Category: <span className="text-neutral-900">{product.category}</span>
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                Ref: {product._id.slice(-6)}
              </span>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="sticky top-32 space-y-8">
              
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.5em] text-[#C9A35A] uppercase font-bold">
                  Bespoke Creation
                </span>
                <h1 className="text-4xl md:text-5xl font-serif leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-baseline gap-4">
                  {product.offerPrice ? (
                    <>
                      <span className="text-2xl font-light text-neutral-900">R {product.offerPrice.toLocaleString()}</span>
                      <span className="text-lg text-neutral-300 line-through font-light">R {product.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-light text-neutral-900">
                      {product.price ? `R ${product.price.toLocaleString()}` : "Price on Request"}
                    </span>
                  )}
                </div>
              </div>

              <div className="prose prose-neutral font-light text-neutral-600 leading-relaxed max-w-none">
                <p>{product.description}</p>
              </div>

              {/* Artisan Meta Info */}
              <div className="grid grid-cols-2 gap-y-6 border-y border-neutral-100 py-8">
                <div className="flex items-center gap-3">
                  <Ruler size={18} className="text-[#C9A35A]" />
                  <span className="text-[10px] tracking-widest uppercase font-medium">Custom Fit Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-[#C9A35A]" />
                  <span className="text-[10px] tracking-widest uppercase font-medium">Cape Town Courier</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-[#C9A35A]" />
                  <span className="text-[10px] tracking-widest uppercase font-medium">Authentic Craft</span>
                </div>
                <div className="flex items-center gap-3">
                  <Share2 size={18} className="text-[#C9A35A]" />
                  <ShareButton product={product} />
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-4 pt-4">
                <QuickActions product={product} />
                <div className="w-full">
                   <WishlistButton productId={product._id} />
                </div>
              </div>

              <p className="text-[9px] text-neutral-400 tracking-[0.1em] italic text-center">
                Each Ibrahim Design piece is handcrafted. Minor variations in pattern placement reflect the authentic nature of the craft.
              </p>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        <section className="mt-32 pt-20 border-t border-neutral-100">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.4em] text-[#C9A35A] uppercase font-bold">Recommendations</span>
              <h2 className="text-3xl font-serif">Related Creations</h2>
            </div>
            <Link 
              href="/all-shop-products" 
              className="text-[10px] tracking-[0.2em] uppercase font-bold border-b border-black pb-1 hover:text-[#C9A35A] hover:border-[#C9A35A] transition-all"
            >
              View Full Collection
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((item) => (
              <Link key={item._id} href={`/all-shop-products/${item.slug || item._id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 mb-4">
                  <Image 
                    src={item.image[0]} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <h3 className="font-serif text-lg tracking-tight group-hover:text-[#C9A35A] transition-colors">{item.name}</h3>
                <p className="text-sm font-light mt-1">R {item.price?.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
