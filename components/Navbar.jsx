"use client";
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const { isLoaded } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  if (!isLoaded) return null;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-5 sm:px-8 md:px-16 py-3 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/ibrahimdesign-logo.png"
            alt="Ibrahim Design"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="leading-tight">
            <span className="font-playfair text-xl sm:text-2xl font-semibold text-[#0E0E0E]">
              Ibrahim Design
            </span>
            <p className="text-[10px] sm:text-xs text-[#C5A34A] font-medium tracking-wider">
              AFRICAN TAILORING
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-gray-800 font-medium">
          <Link href="/" className="hover:text-[#C5A34A] transition">Home</Link>
          <Link href="/all-shop-products" className="hover:text-[#C5A34A] transition">Shop</Link>
          <Link href="/about" className="hover:text-[#C5A34A] transition">About</Link>
          <Link href="/contact" className="hover:text-[#C5A34A] transition">Contact</Link>

          {isSeller ? (
            <button
              onClick={() => router.push("/admin-dashboard")}
              className="text-xs border border-[#C5A34A] text-[#C5A34A] px-4 py-1.5 rounded-full hover:bg-[#C5A34A] hover:text-white transition"
            >
              Admin Dashboard
            </button>
          ) : (
            <button
              onClick={() => router.push("/dashboard")}
              className="text-xs border border-[#C5A34A] text-[#C5A34A] px-4 py-1.5 rounded-full hover:bg-[#C5A34A] hover:text-white transition"
            >
              Dashboard
            </button>
          )}

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push("/")} />
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push("/all-shop-products")} />
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={() => setOverlayOpen(true)}
              className="flex items-center gap-2 border border-[#C5A34A]/50 rounded-full px-4 py-1.5 hover:bg-[#C5A34A]/10 transition"
            >
              <Image src={assets.user_icon} alt="user icon" />
              <span>Account</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-800 z-[60]"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ✅ MOBILE DROPDOWN OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-full w-full bg-white shadow-md border-t border-gray-200 z-50"
          >
            <div className="flex flex-col text-gray-800 font-medium">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 hover:bg-[#C5A34A]/10 transition"
              >
                Home
              </Link>
              <Link
                href="/all-shop-products"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 hover:bg-[#C5A34A]/10 transition"
              >
                Shop
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 hover:bg-[#C5A34A]/10 transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 hover:bg-[#C5A34A]/10 transition"
              >
                Contact
              </Link>

              {isSeller && (
                <button
                  onClick={() => {
                    router.push("/seller");
                    setMenuOpen(false);
                  }}
                  className="px-6 py-3 text-left border-t border-gray-100 hover:bg-[#C5A34A]/10 transition"
                >
                  Seller Dashboard
                </button>
              )}

              {user ? (
                <div className="px-6 py-4 border-t border-gray-100">
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <button
                  onClick={() => {
                    setOverlayOpen(true);
                    setMenuOpen(false);
                  }}
                  className="px-6 py-3 text-left border-t border-gray-100 hover:bg-[#C5A34A]/10 transition"
                >
                  Account
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-[999]"
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-playfair mb-8 text-[#0E0E0E]">
                Welcome to <span className="text-[#C5A34A]">Ibrahim Design</span>
              </h2>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    openSignIn({});
                    setOverlayOpen(false);
                  }}
                  className="text-lg font-medium bg-[#C5A34A] text-white rounded-full px-8 py-3 hover:bg-[#b08d3e] transition"
                >
                  Sign In
                </button>
                <Link
                  href="/about"
                  onClick={() => setOverlayOpen(false)}
                  className="text-lg text-gray-700 hover:text-[#C5A34A] transition"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOverlayOpen(false)}
                  className="text-lg text-gray-700 hover:text-[#C5A34A] transition"
                >
                  Contact
                </Link>
                <Link
                  href="/all-shop-products"
                  onClick={() => setOverlayOpen(false)}
                  className="text-lg text-gray-700 hover:text-[#C5A34A] transition"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>

            <button
              onClick={() => setOverlayOpen(false)}
              className="absolute top-5 right-6 text-gray-800 hover:text-[#C5A34A] transition"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
