// components/ShareButton.jsx
"use client";
import React from "react";

export default function ShareButton({ product }) {
  const handleShare = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        // minimal UI feedback - you can replace with toast
        alert("Link copied to clipboard");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to share");
    }
  };

  return (
    <button onClick={handleShare} className="px-3 py-2 border rounded text-sm">
      Share
    </button>
  );
}
