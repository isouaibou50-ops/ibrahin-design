"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Search } from "lucide-react";

const ACCENT = "#111827";

function ProductCard({ product }) {
  return (
    <Link
      href={`/all-shop-products/${product.slug || product._id}`}
      className="group block border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-900"
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
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
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
            R{product.offerPrice?.toFixed(2) || "—"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductsClient({ initialProducts = [], categories = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const observer = useRef();

  const fetchProducts = async ({ reset = false, nextPage = 1 } = {}) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `/api/shop-products?limit=20&page=${nextPage}&search=${encodeURIComponent(
          search
        )}&category=${encodeURIComponent(category)}`
      );
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message || "Failed");

      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }

      setPage(nextPage);
      setHasMore(data.meta.hasMore);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll observer
  const lastProductRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts({ nextPage: page + 1 });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, search, category]
  );

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts({ reset: true, nextPage: 1 });
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  // Filter by category
  useEffect(() => {
    fetchProducts({ reset: true, nextPage: 1 });
  }, [category]);

  return (
    <div>
      {/* 🔍 Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* ⚙️ Error UI */}
      {error && (
        <div className="text-center text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {/* 🛍 Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) =>
          index === products.length - 1 ? (
            <div key={product._id} ref={lastProductRef}>
              <ProductCard product={product} />
            </div>
          ) : (
            <ProductCard key={product._id} product={product} />
          )
        )}
      </div>

      {/* ⏳ Loader */}
      {loading && (
        <div className="flex justify-center mt-8 text-gray-500">
          <Loader2 className="animate-spin mr-2" />
          Loading more...
        </div>
      )}

      {/* 🎉 End */}
      {!loading && !hasMore && products.length > 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm">
          You’ve reached the end 🎉
        </p>
      )}

      {/* 🚫 Empty state */}
      {!loading && products.length === 0 && !error && (
        <p className="text-center text-gray-400 mt-12">No products found.</p>
      )}
    </div>
  );
}



// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Loader2, Search } from "lucide-react";

// const ACCENT = "#111827";

// function ProductCard({ product }) {
//   return (
//     <Link
//       href={`/all-shop-products/${product.slug || product._id}`}
//       className="group block border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-900"
//     >
//       <div className="relative w-full h-48 bg-gray-100">
//         {product.image?.length ? (
//           <Image
//             src={product.image[0]}
//             alt={product.name}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-sm text-gray-400">
//             No image
//           </div>
//         )}
//       </div>
//       <div className="p-3">
//         <h3 className="font-medium text-gray-900 dark:text-white truncate">
//           {product.name}
//         </h3>
//         <p className="text-sm text-gray-500 line-clamp-2 mt-1">
//           {product.description}
//         </p>
//         <div className="flex justify-between items-center mt-3">
//           <span className="text-xs text-gray-400">
//             {product.category || "Uncategorized"}
//           </span>
//           <span
//             className="text-xs text-white px-2 py-0.5 rounded"
//             style={{ background: ACCENT }}
//           >
//             R{product.price.toFixed(2)}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ProductsClient({ initialProducts = [], categories = [] }) {
//   const [products, setProducts] = useState(initialProducts);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");

//   const observer = useRef();

//   // 🔁 Infinite Scroll Handler
//   const lastProductRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           loadMore();
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   // 🔍 Fetch Products (CSR)
//   const loadMore = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/shop-products?limit=20&page=${page + 1}&search=${encodeURIComponent(
//           search
//         )}&category=${encodeURIComponent(category)}`
//       );
//       const data = await res.json();

//       if (data.success && data.products.length > 0) {
//         setProducts((prev) => [...prev, ...data.products]);
//         setPage((prev) => prev + 1);
//       } else {
//         setHasMore(false);
//       }
//     } catch (err) {
//       console.error(err);
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔎 Handle filters
//   const handleFilter = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/shop-products?limit=20&page=1&search=${encodeURIComponent(
//           search
//         )}&category=${encodeURIComponent(category)}`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setProducts(data.products);
//         setPage(1);
//         setHasMore(data.products.length >= 20);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return; // avoid triggering on first render
//   }, [page]);

//   return (
//     <div>
//       {/* Search + Filter Bar */}
//       <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
//         <div className="relative w-full sm:w-1/2">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleFilter()}
//             className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//           />
//         </div>

//         <select
//           value={category}
//           onChange={(e) => {
//             setCategory(e.target.value);
//             handleFilter();
//           }}
//           className="px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//         >
//           <option value="All">All Categories</option>
//           {categories.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//         {products.map((product, index) => {
//           if (index === products.length - 1)
//             return (
//               <div key={product._id} ref={lastProductRef}>
//                 <ProductCard product={product} />
//               </div>
//             );
//           return <ProductCard key={product._id} product={product} />;
//         })}
//       </div>

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center mt-8 text-gray-500">
//           <Loader2 className="animate-spin mr-2" />
//           Loading...
//         </div>
//       )}

//       {/* No more */}
//       {!loading && !hasMore && (
//         <p className="text-center text-gray-400 mt-8 text-sm">
//           You’ve reached the end 🎉
//         </p>
//       )}
//     </div>
//   );
// }
