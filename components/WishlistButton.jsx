// components/WishlistButton.jsx
"use client";
import React from "react";

export default function WishlistButton({ productId }) {
  const add = () => {
    // placeholder: implement wishlist backend or local storage
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (!saved.includes(productId)) {
        saved.push(productId);
        localStorage.setItem("wishlist", JSON.stringify(saved));
        alert("Added to wishlist");
      } else {
        alert("Already in wishlist");
      }
    } catch {
      alert("Wishlist error");
    }
  };

  return (
    <button onClick={add} className="px-3 py-2 border rounded text-sm">
      Add to wishlist
    </button>
  );
}
