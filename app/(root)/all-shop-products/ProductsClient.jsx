"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const ACCENT = "#C5A34A";

function ProductCard({ product }) {
  return (
    <Link
      href={`/all-shop-products/${product.slug || product._id}`}
      className="group block border rounded-xl overflow-hidden hover:shadow-lg transition-all bg-white dark:bg-gray-900"
    >
      <div className="relative w-full h-48 bg-gray-100">
        {product.image?.length ? (
          <Image
            src={product.image[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-400">
            {product.category || "Uncategorized"}
          </span>
          <span
            className="text-xs text-white px-2 py-0.5 rounded"
            style={{ background: ACCENT }}
          >
            R{product.offerPrice?.toFixed(2) ?? "0.00"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductsClient({ initialProducts, categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const loaderRef = useRef(null);

  // 🔁 Fetch products when search or category changes
  useEffect(() => {
    async function fetchFiltered() {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/shop-products?search=${encodeURIComponent(
            search
          )}&category=${encodeURIComponent(selectedCategory)}&page=1`
        );
        if (res.data.success) {
          setProducts(res.data.products);
          setHasMore(res.data.meta.hasMore);
          setPage(1);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiltered();
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "All")
      params.set("category", selectedCategory);
    if (search) params.set("search", search);
    router.replace(`/all-shop-products?${params.toString()}`);
  }, [selectedCategory, search, router]);

  // 🧭 Infinite scroll observer
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          try {
            setLoading(true);
            const nextPage = page + 1;
            const res = await axios.get(
              `/api/shop-products?page=${nextPage}&search=${encodeURIComponent(
                search
              )}&category=${encodeURIComponent(selectedCategory)}`
            );
            if (res.data.success) {
              setProducts((prev) => [...prev, ...res.data.products]);
              setPage(nextPage);
              setHasMore(res.data.meta.hasMore);
            }
          } catch (err) {
            console.error("Pagination fetch failed:", err);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, page, hasMore, loading, search, selectedCategory]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#C5A34A] outline-none"
        />

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#C5A34A] outline-none"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">No products found.</p>
      )}

      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="flex justify-center mt-10 mb-20">
        {loading && <Loader2 className="animate-spin text-[#C5A34A] w-6 h-6" />}
      </div>
    </div>
  );
}
