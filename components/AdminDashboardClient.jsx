// components/AdminDashboardClient.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

const ACCENT = "#C5A34A";

/* ---------- Modal ---------- */
function Modal({ open, onClose, title, children, className = "" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-lg p-4 md:p-6 ${className}`}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 px-2 py-1 rounded hover:bg-gray-100">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

/* ---------- CreateProductForm ---------- */
function CreateProductForm({ onCreated, onClose }) {
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

  const inputRef = useRef(null);
  const CATEGORIES = ["Uncategorized", "Men", "Women", "Children", "Accessories", "Traditional", "Custom Orders"];
  const isSeller = isLoaded && user && (user.publicMetadata?.role === "seller" || user.publicMetadata?.role === "admin");

  useEffect(() => {
    return () => previews.forEach((p) => {
      try { URL.revokeObjectURL(p); } catch (e) {}
    });
  }, [previews]);

  function addFiles(selectedFiles) {
    const arr = Array.from(selectedFiles || []);
    const combined = [...files, ...arr].slice(0, 4);
    setFiles(combined);
    setPreviews(combined.map((f) => (typeof f === "string" ? f : URL.createObjectURL(f))));
  }

  function removeFile(index) {
    const copy = [...files];
    copy.splice(index, 1);
    setFiles(copy);
    setPreviews(copy.map((f) => (typeof f === "string" ? f : URL.createObjectURL(f))));
  }

  function onDrop(e) {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  }
  function onDragOver(e) { e.preventDefault(); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isSeller) return toast.error("Only sellers/admins can create products.");
    if (!name.trim() || !price) return toast.error("Please fill name and price.");
    if (files.length === 0) return toast.error("Upload at least 1 image (max 4).");

    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("price", price);
    if (offerPrice) fd.append("offerPrice", offerPrice);
    files.forEach((file) => fd.append("images", file));

    try {
      setUploading(true);
      setProgress(0);
      const token = await getToken();
      if (!token) {
        toast.error("Authentication failed. Please sign in again.");
        setUploading(false);
        return;
      }

      const res = await axios.post("/api/shop-products/manage/create", fd, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (ev) => { if (ev.total) setProgress(Math.round((ev.loaded / ev.total) * 100)); }
      });

      if (res.data?.success) {
        toast.success("Product created");
        onCreated && onCreated(res.data.product);
        onClose && onClose();
      } else {
        toast.error(res.data?.message || "Create failed");
      }
    } catch (err) {
      console.error("CreateProductForm.handleSubmit error:", err, err?.response?.data);
      toast.error(err?.response?.data?.message || err.message || "Create failed");
    } finally {
      setUploading(false);
    }
  }

  if (!isLoaded) return null;
  if (!user || !isSeller) return <div className="p-4">Sign in as seller/admin to add shop products.</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" className="border rounded px-3 py-2" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (e.g. 199.99)" className="border rounded px-3 py-2" inputMode="decimal" />
        <input value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} placeholder="Offer price (optional)" className="border rounded px-3 py-2" inputMode="decimal" />
      </div>

      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className="border rounded px-3 py-2 w-full h-28" />

      <div onDrop={onDrop} onDragOver={onDragOver} className="border-dashed border-2 border-gray-200 rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-medium">Images (up to 4)</p>
            <p className="text-xs text-gray-500">Drag & drop or click to pick — JPG/PNG recommended</p>
          </div>
          <div>
            <button type="button" onClick={() => inputRef.current?.click()} style={{ background: ACCENT }} className="text-white px-3 py-1 rounded">Choose</button>
          </div>
        </div>

        <input ref={inputRef} multiple accept="image/*" type="file" className="hidden" onChange={(e) => addFiles(e.target.files)} />

        <div className="flex gap-3 flex-wrap mt-3">
          {previews.length === 0 ? <div className="text-sm text-gray-400">No images selected yet.</div> : previews.map((src, i) => (
            <div key={i} className="relative w-24 h-24 rounded overflow-hidden border">
              <img src={src} alt={`preview-${i}`} className="object-cover w-full h-full" />
              <button type="button" onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs">✕</button>
            </div>
          ))}
        </div>
      </div>

      {uploading && <div className="w-full bg-gray-100 rounded h-2 overflow-hidden"><div style={{ width: `${progress}%`, background: ACCENT }} className="h-full transition-all" /></div>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={uploading} style={{ background: ACCENT }} className="px-4 py-2 rounded text-white">
          {uploading ? `Uploading ${progress}%` : "Create Product"}
        </button>
        <button type="button" onClick={onClose} className="px-3 py-2 rounded border">Cancel</button>
      </div>
    </form>
  );
}

/* ---------- EditProductForm ---------- */
function EditProductForm({ product, onUpdated, onClose }) {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "Uncategorized");
  const [price, setPrice] = useState(product?.price ?? "");
  const [offerPrice, setOfferPrice] = useState(product?.offerPrice ?? "");
  const [existingImages, setExistingImages] = useState(product?.image || []);
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState(product?.image || []);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // confirmation state for update
  const [confirmingUpdate, setConfirmingUpdate] = useState(false);

  const inputRef = useRef(null);
  const isSeller = isLoaded && user && (user.publicMetadata?.role === "seller" || user.publicMetadata?.role === "admin");

  useEffect(() => {
    return () => previews.forEach((p) => {
      try { URL.revokeObjectURL(p); } catch (e) {}
    });
  }, [previews]);

  function handleFiles(selected) {
    const arr = Array.from(selected || []);
    const allowed = 4 - existingImages.length;
    const take = arr.slice(0, allowed);
    setNewFiles((prev) => [...prev, ...take].slice(0, 4 - existingImages.length));
    setPreviews([...existingImages, ...newFiles, ...take].map((f) => (typeof f === "string" ? f : URL.createObjectURL(f))));
  }

  function removeExistingImage(index) {
    const copy = [...existingImages];
    copy.splice(index, 1);
    setExistingImages(copy);
    setPreviews([...copy, ...newFiles].map((f) => (typeof f === "string" ? f : URL.createObjectURL(f))));
  }

  function removeNewFile(index) {
    const copy = [...newFiles];
    copy.splice(index, 1);
    setNewFiles(copy);
    setPreviews([...existingImages, ...copy].map((f) => (typeof f === "string" ? f : URL.createObjectURL(f))));
  }

  // actual submit that performs the PATCH
  async function doSubmit() {
    if (!isSeller) {
      toast.error("Only sellers/admins can edit products");
      setConfirmingUpdate(false);
      return;
    }
    if (!name.trim() || !price) {
      toast.error("Name and price required");
      setConfirmingUpdate(false);
      return;
    }

    const fd = new FormData();
    fd.append("id", product._id);
    fd.append("name", name);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("price", price);
    if (offerPrice) fd.append("offerPrice", offerPrice);
    fd.append("existingImages", JSON.stringify(existingImages));
    newFiles.forEach((f) => fd.append("images", f));

    try {
      setUploading(true);
      setProgress(0);
      const token = await getToken();
      if (!token) {
        toast.error("Authentication failed. Please sign in again.");
        setUploading(false);
        setConfirmingUpdate(false);
        return;
      }

      // PATCH to /api/shop-products/manage/[id] preferred; fallback handled at server if needed
      const res = await axios.patch(`/api/shop-products/manage/${product._id}`, fd, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (ev) => { if (ev.total) setProgress(Math.round((ev.loaded / ev.total) * 100)); }
      });

      if (res.data?.success) {
        toast.success("Product updated");
        onUpdated && onUpdated(res.data.product);
        onClose && onClose();
      } else {
        toast.error(res.data?.message || "Update failed");
      }
    } catch (err) {
      // fallback: some setups still expect POST to /manage/update — try that if patch fails with 404/405
      console.error("Edit PATCH error:", err?.response?.status, err);
      try {
        if (err?.response?.status === 404 || err?.response?.status === 405) {
          const token = await getToken();
          const res2 = await axios.post("/api/shop-products/manage/update", fd, { headers: { Authorization: `Bearer ${token}` } });
          if (res2.data?.success) {
            toast.success("Product updated (fallback)");
            onUpdated && onUpdated(res2.data.product);
            onClose && onClose();
          } else {
            toast.error(res2.data?.message || "Update failed (fallback)");
          }
        } else {
          toast.error(err?.response?.data?.message || err.message || "Update failed");
        }
      } catch (err2) {
        console.error("Edit fallback error:", err2);
        toast.error(err2?.response?.data?.message || err2.message || "Update failed");
      }
    } finally {
      setUploading(false);
      setConfirmingUpdate(false);
    }
  }

  // initial click triggers confirmation modal
  function handleRequestSubmit(e) {
    e.preventDefault();
    setConfirmingUpdate(true);
  }

  if (!isLoaded) return null;
  if (!user || !isSeller) return <div className="p-4">Sign in as seller/admin to edit products.</div>;

  return (
    <>
      <form onSubmit={handleRequestSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input required value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-3 py-2" placeholder="Product name" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2">
            {["Uncategorized", "Men", "Women", "Children", "Accessories", "Traditional", "Custom Orders"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input required value={price} onChange={(e) => setPrice(e.target.value)} className="border rounded px-3 py-2" placeholder="Price" inputMode="decimal" />
          <input value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="border rounded px-3 py-2" placeholder="Offer (optional)" inputMode="decimal" />
        </div>

        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className="border rounded px-3 py-2 w-full h-28" />

        <div className="text-sm text-gray-500">Existing images (tap ✕ to remove)</div>
        <div className="flex gap-3 flex-wrap mt-2">
          {previews.length === 0 ? <div className="text-sm text-gray-400">No images</div> : previews.map((src, i) => (
            <div key={i} className="relative w-24 h-24 rounded overflow-hidden border">
              <img src={src} alt={`img-${i}`} className="object-cover w-full h-full" />
              {i < existingImages.length ? (
                <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs">✕</button>
              ) : (
                <button type="button" onClick={() => removeNewFile(i - existingImages.length)} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs">✕</button>
              )}
            </div>
          ))}
        </div>

        <div className="border-dashed border-2 border-gray-200 rounded p-3">
          <div className="flex items-center justify-between mb-2">
            <div><p className="text-sm font-medium">Add/Replace images (max total 4)</p></div>
            <div><button type="button" onClick={() => inputRef.current?.click()} style={{ background: ACCENT }} className="text-white px-3 py-1 rounded">Add</button></div>
          </div>
          <input ref={inputRef} multiple accept="image/*" type="file" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>

        {uploading && <div className="w-full bg-gray-100 rounded h-2 overflow-hidden"><div style={{ width: `${progress}%`, background: ACCENT }} className="h-full transition-all" /></div>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={uploading} style={{ background: ACCENT }} className="px-4 py-2 rounded text-white">
            {uploading ? `Updating ${progress}%` : "Save changes"}
          </button>
          <button type="button" onClick={onClose} className="px-3 py-2 rounded border">Cancel</button>
        </div>
      </form>

      {/* Confirm update modal */}
      <Modal open={confirmingUpdate} onClose={() => setConfirmingUpdate(false)} title="Confirm update">
        <div className="space-y-4">
          <p className="text-sm text-gray-700">Save changes to <strong>{product?.name}</strong>?</p>
          <div className="flex items-center gap-3">
            <button onClick={doSubmit} style={{ background: ACCENT }} className="px-4 py-2 rounded text-white">Yes, save</button>
            <button onClick={() => setConfirmingUpdate(false)} className="px-3 py-2 rounded border">Cancel</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

/* ---------- ProductRow ---------- */
function ProductRow({ p, onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-md hover:shadow-sm transition bg-white">
      <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
        {p.image && p.image.length > 0 ? (
          // Next Image requires configured domains; ensure your next.config.js allows Cloudinary
          <Image src={p.image[0]} alt={p.name} width={64} height={64} className="object-cover" />
        ) : (
          <div className="text-xs text-gray-400">No image</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="truncate">
            <div className="font-medium text-sm truncate">{p.name}</div>
            <div className="text-xs text-gray-500 truncate">{p.category} • {p._id}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{(p.offerPrice ?? p.price) ? `R ${p.offerPrice ?? p.price}` : ""}</div>
            <div className="text-xs text-gray-400">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}</div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{p.description}</p>

        <div className="mt-3 flex items-center gap-2">
          <button onClick={() => onView(p)} className="text-xs px-3 py-1 border rounded text-gray-700">View</button>
          <button onClick={() => onEdit(p)} className="text-xs px-3 py-1 border rounded text-gray-700">Edit</button>
          <button onClick={() => onDelete(p)} className="text-xs px-3 py-1 border rounded text-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- AdminDashboardClient (main) ---------- */
export default function AdminDashboardClient({ initialSearchParams }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12 });
  const initialTab = (initialSearchParams?.tab || searchParams?.get("tab") || "shop");
  const [activeTab, setActiveTab] = useState(initialTab);

  const [showCreate, setShowCreate] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    const tab = searchParams?.get("tab") || initialTab || "shop";
    if (tab !== activeTab) setActiveTab(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    // fetch on mount and when page changes
    fetchProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchProducts(pageNum = 1) {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/shop-products?page=${pageNum}&limit=${meta.limit}`);
      if (data?.success) {
        setProducts(data.products || []);
        setMeta({
          total: data.meta?.total ?? 0,
          page: data.meta?.page ?? pageNum,
          limit: data.meta?.limit ?? meta.limit,
        });
      } else {
        toast.error(data?.message || "Failed to load products");
      }
    } catch (err) {
      console.error("fetchProducts error:", err);
      toast.error(err?.response?.data?.message || err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  function handleCreated(newProd) {
    setProducts((s) => [newProd, ...s]);
    etMeta((m) => ({ ...m, total: (m.total || 0) + 1 }));
  }

  function openView(p) { setViewProduct(p); }
  function closeView() { setViewProduct(null); }
  function openEdit(p) { setEditProduct(p); }
  function closeEdit() { setEditProduct(null); }
  function openDelete(p) { setDeleteProduct(p); }
  function closeDelete() { setDeleteProduct(null); }

  // Delete with fallback to old endpoint
  async function confirmDelete() {
    if (!deleteProduct) return;
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Authentication failed. Please sign in.");
        return;
      }

      // Try RESTful DELETE first
      let res;
      try {
        res = await axios.delete(`/api/shop-products/manage/${deleteProduct._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        // If server doesn't support DELETE endpoint, fallback to legacy POST delete
        console.warn("DELETE endpoint failed, attempting fallback POST /manage/delete", err?.response?.status);
        if (err?.response?.status === 404 || err?.response?.status === 405 || err?.response?.status === 400) {
          res = await axios.post("/api/shop-products/manage/delete", { id: deleteProduct._id }, { headers: { Authorization: `Bearer ${token}` }});
        } else {
          throw err;
        }
      }

      const data = res?.data;
      if (data?.success) {
        toast.success("Deleted");
        setProducts((s) => s.filter((x) => x._id !== deleteProduct._id));
        closeDelete();
      } else {
        toast.error(data?.message || "Delete failed");
      }
    } catch (err) {
      console.error("confirmDelete error:", err);
      toast.error(err?.response?.data?.message || err.message || "Delete failed");
    }
  }

  const limit = meta.limit || 12;
  const total = meta.total || 0;
  const hasPrev = page > 1;
  const hasNext = total ? page * limit < total : products.length === limit;

  function goPrev() {
    if (!hasPrev || loading) return;
    setPage((p) => Math.max(1, p - 1));
  }
  function goNext() {
    if (!hasNext || loading) return;
    setPage((p) => p + 1);
  }

  // client-side role check (UI only) — server should enforce auth
  const role = user?.publicMetadata?.role || user?.public_metadata?.role || null;
  const canEdit = role === "seller" || role === "admin";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-lg">Ibrahim Design</h2>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
                <div style={{ background: ACCENT }} className="px-3 py-1 rounded text-white text-sm">Brand</div>
              </div>

              <nav className="flex flex-col gap-2">
                <button onClick={() => { setActiveTab("shop"); router.replace("?tab=shop"); }} className={`text-left w-full px-3 py-2 rounded ${activeTab === "shop" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}>Shop Products</button>
                <button onClick={() => { setActiveTab("custom"); router.replace("?tab=custom"); }} className={`text-left w-full px-3 py-2 rounded ${activeTab === "custom" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}>Custom Requests</button>
              </nav>

              <div className="mt-4">
                <button onClick={() => setShowCreate(true)} className="w-full py-2 rounded" style={{ background: ACCENT, color: "#fff" }} disabled={!canEdit}>
                  + Add product
                </button>
                {!canEdit && <div className="text-xs text-gray-400 mt-2">Sign in as seller/admin to manage products</div>}
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg text-sm text-gray-600">
              <div className="font-medium mb-1">Quick Stats</div>
              <div>Products: {total}</div>
              <div className="text-xs text-gray-400">Page: {meta.page}</div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
              <div className="flex gap-1 items-center">
                <button onClick={() => { setActiveTab("shop"); router.replace("?tab=shop"); }} className={`px-3 py-2 rounded ${activeTab === "shop" ? "bg-white shadow" : "bg-transparent"}`}>Shop</button>
                <button onClick={() => { setActiveTab("custom"); router.replace("?tab=custom"); }} className={`px-3 py-2 rounded ${activeTab === "custom" ? "bg-white shadow" : "bg-transparent"}`}>Custom</button>
              </div>
              <div><button onClick={() => setShowCreate(true)} style={{ background: ACCENT }} className="px-3 py-2 rounded text-white" disabled={!canEdit}>+ Add</button></div>
            </div>

            {activeTab === "shop" ? (
              <>
                <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-semibold">Shop Products</h1>
                    <p className="text-sm text-gray-500">Manage catalog — responsive list view.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input placeholder="Search products..." className="border rounded px-3 py-2 text-sm" onChange={() => { }} />
                    <button onClick={() => fetchProducts(1)} className="px-3 py-2 border rounded text-sm">Refresh</button>
                  </div>
                </div>

                <div className="space-y-3">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="p-3 bg-white rounded-md animate-pulse">
                        <div className="h-12 bg-gray-200 rounded mb-2" />
                        <div className="h-3 bg-gray-200 rounded mb-1 w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                      </div>
                    ))
                  ) : products.length === 0 ? (
                    <div className="p-4 bg-white rounded-md text-sm text-gray-600">No shop products found.</div>
                  ) : (
                    products.map((p) => <ProductRow key={p._id} p={p} onView={openView} onEdit={openEdit} onDelete={openDelete} />)
                  )}
                </div>

                <div className="mt-4 flex items-center justify-center gap-3">
                  <button onClick={goPrev} disabled={!hasPrev || loading} className={`px-3 py-1 rounded ${(!hasPrev || loading) ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}>Prev</button>
                  <div className="text-sm text-gray-600">Page {meta.page}</div>
                  <button onClick={goNext} disabled={!hasNext || loading} className={`px-3 py-1 rounded ${(!hasNext || loading) ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}>{(!hasNext && !loading) ? "No more" : "Next"}</button>
                </div>
              </>
            ) : (
              <div>
                <div className="mb-4">
                  <h1 className="text-xl font-semibold">Custom Requests</h1>
                  <p className="text-sm text-gray-500">Customer requests will appear here.</p>
                </div>
                <div className="bg-white p-4 rounded-md text-sm text-gray-600">Custom requests listing not implemented yet.</div>
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:hidden z-40">
        <div className="bg-white rounded-full shadow-md px-3 py-2 flex items-center gap-4">
          <button onClick={() => { setActiveTab("shop"); router.replace("?tab=shop"); }} className={`px-3 py-1 rounded ${activeTab === "shop" ? "bg-gray-100" : ""}`}>Shop</button>
          <button onClick={() => { setActiveTab("custom"); router.replace("?tab=custom"); }} className={`px-3 py-1 rounded ${activeTab === "custom" ? "bg-gray-100" : ""}`}>Custom</button>
          <button onClick={() => setShowCreate(true)} style={{ background: ACCENT }} className="px-3 py-1 rounded text-white" disabled={!canEdit}>Add</button>
        </div>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Shop Product">
        <CreateProductForm onCreated={handleCreated} onClose={() => setShowCreate(false)} />
      </Modal>

      <Modal open={!!viewProduct} onClose={closeView} title={viewProduct?.name || "Product"}>
        {viewProduct && (
          <div className="space-y-4">
            <div className="w-full h-56 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {viewProduct.image && viewProduct.image.length > 0 ? (
                <Image src={viewProduct.image[0]} alt={viewProduct.name} width={800} height={400} className="object-contain w-full h-full" />
              ) : <div className="text-sm text-gray-400">No image</div>}
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">{viewProduct.category}</div>
              <div className="font-medium text-lg">{viewProduct.name}</div>
              <div className="text-sm text-gray-500 mt-2">{viewProduct.description}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm font-semibold">{(viewProduct.offerPrice ?? viewProduct.price) ? `R ${viewProduct.offerPrice ?? viewProduct.price}` : ""}</div>
                <div className="text-xs text-gray-400">{viewProduct.createdAt ? new Date(viewProduct.createdAt).toLocaleString() : ""}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { openEdit(viewProduct); closeView(); }} className="px-3 py-2 border rounded">Edit</button>
              <button onClick={() => { openDelete(viewProduct); closeView(); }} className="px-3 py-2 border rounded text-red-600">Delete</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!editProduct} onClose={closeEdit} title={`Edit: ${editProduct?.name || ""}`}>
        {editProduct && <EditProductForm product={editProduct} onUpdated={(u) => { setProducts((list) => list.map(it => it._id === u._id ? u : it)); fetchProducts(1); }} onClose={closeEdit} />}
      </Modal>

      <Modal open={!!deleteProduct} onClose={closeDelete} title="Confirm deletion">
        {deleteProduct && (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">Are you sure you want to delete <strong>{deleteProduct.name}</strong>? This action cannot be undone.</p>
            <div className="flex items-center gap-3">
              <button onClick={confirmDelete} style={{ background: ACCENT }} className="px-4 py-2 rounded text-white">Yes, delete</button>
              <button onClick={closeDelete} className="px-3 py-2 rounded border">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
