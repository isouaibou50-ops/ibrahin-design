"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";

const ACCENT = "#C5A34A";

/* ---------------------------
   Admin form component
   (Handles up to 4 images; posts FormData to server)
   --------------------------- */
function AdminShopProductForm({ onCreated }) {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef();

  const CATEGORIES = [
    "Uncategorized",
    "Men",
    "Women",
    "Children",
    "Accessories",
    "Traditional",
    "Custom Orders",
  ];

  // role check client-side
  const isSeller = isLoaded && user && (user.publicMetadata?.role === "seller" || user.publicMetadata?.role === "admin");

  useEffect(() => {
    // revoke URLs on cleanup
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p));
    };
  }, [previews]);

  function addFiles(selectedFiles) {
    const items = Array.from(selectedFiles || []);
    const combined = [...files, ...items].slice(0, 4);
    setFiles(combined);
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
  }

  function removeFile(index) {
    const copy = [...files];
    copy.splice(index, 1);
    setFiles(copy);
    setPreviews(copy.map((f) => URL.createObjectURL(f)));
  }

  function onDrop(e) {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  }
  function onDragOver(e) { e.preventDefault(); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isSeller) return toast.error("Only sellers can create products");
    if (!name.trim() || !price) return toast.error("Please fill name and price");
    if (files.length === 0) return toast.error("Upload at least 1 image (max 4)");

    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("price", price);
    if (offerPrice) fd.append("offerPrice", offerPrice);
    files.forEach((f) => fd.append("images", f));

    try {
      setUploading(true);
      setProgress(0);
      const token = await getToken(); // no template
      const res = await axios.post("/api/shop-products/manage/create", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ev) => {
          if (!ev.total) return;
          setProgress(Math.round((ev.loaded / ev.total) * 100));
        },
      });

      if (res.data?.success) {
        toast.success("Product created");
        setName(""); setDescription(""); setCategory("Uncategorized"); setPrice(""); setOfferPrice("");
        setFiles([]); setPreviews([]); setProgress(0);
        onCreated && onCreated(res.data.product);
      } else {
        toast.error(res.data?.message || "Create failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err.message || "Create failed");
    } finally {
      setUploading(false);
    }
  }

  if (!isLoaded) return null;

  if (!user || !isSeller) {
    return (
      <div className="bg-white border rounded p-4 text-center">
        <p className="mb-2">Sign in as a seller or admin to add shop products.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border rounded px-3 py-2" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
        <select className="border rounded px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="border rounded px-3 py-2" placeholder="Price e.g. 199.99" value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" required />
        <input className="border rounded px-3 py-2" placeholder="Offer price (optional)" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} inputMode="decimal" />
      </div>

      <textarea className="border rounded px-3 py-2 w-full h-28" placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <div onDrop={onDrop} onDragOver={onDragOver} className="border-dashed border-2 border-gray-200 rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-medium">Images (up to 4)</p>
            <p className="text-xs text-gray-500">Drag & drop or click to pick — JPG/PNG recommended</p>
          </div>
          <div>
            <button type="button" onClick={() => inputRef.current?.click()} style={{ background: ACCENT }} className="text-white px-3 py-1 rounded">Select</button>
          </div>
        </div>

        <input ref={inputRef} multiple accept="image/*" type="file" className="hidden" onChange={(e) => addFiles(e.target.files)} />

        <div className="flex gap-3 flex-wrap mt-3">
          {previews.length === 0 ? (
            <div className="text-sm text-gray-400">No images selected yet.</div>
          ) : previews.map((src, i) => (
            <div key={i} className="relative w-28 h-28 rounded overflow-hidden border">
              {/* use <img> to keep things simple inside client component */}
              <img src={src} alt={`preview-${i}`} className="object-cover w-full h-full" />
              <button type="button" onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs">✕</button>
            </div>
          ))}
        </div>
      </div>

      {uploading && (
        <div className="w-full bg-gray-100 rounded h-2 overflow-hidden">
          <div style={{ width: `${progress}%`, background: ACCENT }} className="h-full transition-all" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button style={{ background: ACCENT }} disabled={uploading} className="px-4 py-2 rounded text-white font-medium">
          {uploading ? `Uploading ${progress}%` : "Create Product"}
        </button>
        <div className="text-sm text-gray-500">Max 4 images • JPG/PNG</div>
      </div>
    </form>
  );
}

/* ---------------------------
   Product Card (small)
   --------------------------- */
function ProductCard({ p }) {
  return (
    <article className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative w-full h-44 bg-gray-50 flex items-center justify-center">
        {p.image && p.image.length > 0 ? (
          <Image src={p.image[0]} alt={p.name} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="text-sm text-gray-400">No image</div>
        )}
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm truncate">{p.name}</h4>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{p.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">{p.offerPrice ?? p.price ? `R ${p.offerPrice ?? p.price}` : ""}</div>
            <div className="text-xs text-gray-400">{p.category}</div>
          </div>
          <div>
            <button onClick={() => navigator.clipboard.writeText(window.location.origin + "/product/" + (p.slug || p._id))} className="text-xs px-3 py-1 border rounded text-gray-600">Share</button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------
   Main Page Component
   --------------------------- */
export default function ShopProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, limit: 24 });
  const { openSignIn } = useClerk?.() || {};
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  async function fetchProducts(pageNum = 1) {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/shop-products?page=${pageNum}&limit=24`);
      if (data?.success) {
        setProducts(data.products || []);
        setMeta(data.meta || { total: 0, limit: 24 });
      } else {
        toast.error(data?.message || "Failed to load");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  function handleCreated(newProduct) {
    // optimistic: prepend and scroll to top
    setProducts((s) => [newProduct, ...s]);
    setCreating(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Shop Catalog</h1>
          <p className="text-sm text-gray-600">Browse our handmade pieces. Staff can add new products below.</p>
        </div>
        <div>
          <span style={{ background: ACCENT }} className="px-3 py-1 rounded-full text-white text-sm">Ibrahim Design</span>
        </div>
      </header>

      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Products</h2>
              <p className="text-xs text-gray-500">Showing latest shop-made items.</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-white p-3 animate-pulse">
                    <div className="w-full h-40 bg-gray-200 rounded mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-sm text-gray-600">No products found.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {products.map((p) => <ProductCard key={p._id} p={p} />)}
              </div>
            )}

            {/* pagination */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1 border rounded">Prev</button>
              <div className="text-sm text-gray-600">Page {page}</div>
              <button onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded">Next</button>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Add product (staff)</h3>
              <p className="text-xs text-gray-500">Sellers and admins can add items here.</p>
            </div>

            <div>
              <AdminShopProductForm onCreated={handleCreated} />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
