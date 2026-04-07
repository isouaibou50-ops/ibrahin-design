"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Search, SlidersHorizontal, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

export default function ProductsClient({ initialProducts, categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency, addToCart } = useAppContext();

  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const loaderRef = useRef(null);

  // Sync URL params
  const updateParams = useCallback((newSearch, newCat) => {
    const params = new URLSearchParams();
    if (newCat && newCat !== "All") params.set("category", newCat);
    if (newSearch) params.set("search", newSearch);
    router.replace(`/all-shop-products?${params.toString()}`, { scroll: false });
  }, [router]);

  // Fetch filtered data
  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/shop-products`, {
          params: { search, category: selectedCategory, page: 1 }
        });
        if (res.data.success) {
          setProducts(res.data.products);
          setHasMore(res.data.meta.hasMore);
          setPage(1);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchFiltered, 400); // Debounce search
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  // Infinite Scroll Logic
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const nextPage = page + 1;
        setLoading(true);
        try {
          const res = await axios.get(`/api/shop-products`, {
            params: { search, category: selectedCategory, page: nextPage }
          });
          if (res.data.success) {
            setProducts(prev => [...prev, ...res.data.products]);
            setPage(nextPage);
            setHasMore(res.data.meta.hasMore);
          }
        } catch (err) {
          console.error("Pagination error:", err);
        } finally {
          setLoading(false);
        }
      }
    }, { threshold: 0.1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, page, search, selectedCategory]);

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* 1. Sidebar Filter (Desktop) */}
      <aside className="hidden lg:block w-64 space-y-10">
        <div>
          <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-6">Search</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Find a piece..."
              value={search}
              onChange={(e) => {setSearch(e.target.value); updateParams(e.target.value, selectedCategory);}}
              className="w-full border-b border-neutral-200 py-3 pl-10 text-sm focus:border-[#C9A35A] outline-none transition-colors font-light"
            />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-6">Collections</h3>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {setSelectedCategory("All"); updateParams(search, "All");}}
              className={`text-sm text-left transition-colors ${selectedCategory === "All" ? "text-[#C9A35A] font-medium" : "text-neutral-500 hover:text-neutral-900"}`}
            >
              All Creations
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {setSelectedCategory(cat); updateParams(search, cat);}}
                className={`text-sm text-left transition-colors ${selectedCategory === cat ? "text-[#C9A35A] font-medium" : "text-neutral-500 hover:text-neutral-900"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* 2. Mobile Filter Trigger */}
      <div className="lg:hidden flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-50 border-none rounded-none py-3 pl-10 text-sm"
          />
        </div>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="p-3 bg-neutral-900 text-white"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* 3. Products Grid */}
      <div className="flex-1">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 sm:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} currency={currency} onAdd={() => addToCart(product._id)} />
            ))}
          </div>
        ) : !loading && (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-neutral-400 italic">No pieces found in this collection.</p>
          </div>
        )}

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="flex justify-center mt-20 py-10">
          {loading && <Loader2 className="animate-spin text-[#C9A35A] w-8 h-8" />}
        </div>
      </div>

      {/* Mobile Drawer (Simplified) */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] lg:hidden"
          >
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-[80%] bg-white p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="font-serif text-2xl">Filter</h2>
                <button onClick={() => setIsFilterOpen(false)}><X /></button>
              </div>
              <div className="space-y-8">
                {["All", ...categories].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => {setSelectedCategory(cat); setIsFilterOpen(false);}}
                    className="block text-xl font-light"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product, currency, onAdd }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 mb-6">
        <Link href={`/all-shop-products/${product.slug || product._id}`}>
          <Image
            src={product.image?.[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        <button
          onClick={(e) => { e.preventDefault(); onAdd(); }}
          className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md py-4 text-[10px] tracking-[0.2em] font-bold uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-[#1A1A1A] hover:text-white"
        >
          <ShoppingBag size={14} /> Quick Add
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-[9px] tracking-[0.2em] text-[#C9A35A] uppercase font-bold">
          {product.category}
        </p>
        <Link href={`/all-shop-products/${product.slug || product._id}`}>
          <h3 className="font-serif text-lg tracking-tight group-hover:underline underline-offset-4 decoration-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-medium">
          {currency}{product.offerPrice?.toLocaleString() || product.price?.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
