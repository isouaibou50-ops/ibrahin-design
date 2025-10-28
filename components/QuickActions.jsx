// components/QuickActions.jsx
"use client";
import React from "react";
import Link from "next/link";

const ACCENT = "#C5A34A";

export default function QuickActions({ product }) {
  if (!product) return null;
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      <Link
        href={`/custom-request?product=${product.slug || product._id}`}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded shadow-sm text-white"
        style={{ background: ACCENT }}
      >
        Request Custom Order
      </Link>

      <a
        href={`mailto:info@ibrahimdesign.co?subject=Enquiry about ${encodeURIComponent(product.name)}`}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded border"
      >
        Contact / Enquire
      </a>
    </div>
  );
}
