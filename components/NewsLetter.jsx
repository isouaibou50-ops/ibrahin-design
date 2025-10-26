"use client";
import React from "react";

const NewsLetter = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/40 border-t border-amber-100/60">
      {/* Headline */}
      <h1 className="text-2xl md:text-4xl font-serif font-semibold text-gray-900 mb-3">
        Join the Ibrahim Design Circle
      </h1>
      <p className="text-sm md:text-base text-gray-600 max-w-lg mb-8">
        Subscribe to receive exclusive tailoring insights, early access to new collections, 
        and members-only offers — crafted just for you.
      </p>

      {/* Input and Button */}
      <div className="flex items-center w-full max-w-md md:max-w-2xl border border-amber-200/70 rounded-full overflow-hidden shadow-sm">
        <input
          className="flex-1 px-4 py-3 text-sm md:text-base text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="bg-amber-600 hover:bg-amber-700 transition-colors text-white font-medium px-8 md:px-12 py-3 rounded-full">
          Subscribe
        </button>
      </div>

      {/* Subtext */}
      <p className="text-xs text-gray-400 mt-4">
        We respect your privacy — unsubscribe anytime.
      </p>
    </section>
  );
};

export default NewsLetter;
