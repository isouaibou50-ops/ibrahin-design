"use client";

import React, { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import CustomOrderRequest from "./CustomOrderRequest";
import { motion } from "framer-motion";

export default function QuickActions({ product }) {
  const { addToCart, cartItems, updateCartQuantity } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  // Check if item is already in cart to show current qty
  const cartQty = cartItems[product._id] || 0;

  const handleAddToCart = () => {
    // If we want to add multiple at once, we loop or update context logic
    // For now, we'll use your existing addToCart and then sync quantity
    addToCart(product._id);
    if (quantity > 1) {
      updateCartQuantity(product._id, cartQty + quantity);
    }
  };

  return (
    <div className="space-y-6">
      {/* QUANTITY SELECTOR */}
      <div className="flex items-center gap-6">
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-400">
          Quantity
        </span>
        <div className="flex items-center border border-neutral-200">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 hover:bg-neutral-50 transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="w-12 text-center text-sm font-light">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 hover:bg-neutral-50 transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* PRIMARY ACTIONS */}
      <div className="flex flex-col gap-3">
        {/* ADD TO BAG */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full bg-[#1A1A1A] text-white py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#C9A35A] transition-all duration-300 flex items-center justify-center gap-3"
        >
          <ShoppingBag size={14} /> Add to Selection
        </motion.button>

        {/* CUSTOM ORDER (WHATSAPP DIALOG) */}
        <CustomOrderRequest productName={product.name} />
      </div>

      {/* STOCK STATUS / AVAILABILITY */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[9px] tracking-widest text-neutral-500 uppercase">
          Available for Immediate Tailoring
        </span>
      </div>
    </div>
  );
}
