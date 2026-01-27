"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SHOP", href: "/all-shop-products" },
  { label: "ALTERATIONS", href: "/alterations-and-repairs" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const { router } = useAppContext();
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || cartOpen || overlayOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen, cartOpen, overlayOpen]);

  if (!isLoaded) return null;

  const role = user?.publicMetadata?.role;
  const isPrivileged = role === "admin" || role === "seller" || role === "staff";
  const dashboardRoute = isPrivileged ? "/admin-dashboard" : "/dashboard";

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white"
        }`}
      >
        {/* MOBILE */}
        <div className="md:hidden flex items-center justify-between h-16 px-4">
          <button onClick={() => setMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="text-center">
            <span className="block text-[8px] tracking-[0.35em] text-gray-500">
              IB
            </span>
            <span className="block font-serif text-lg tracking-[0.15em]">
              TAILORING
            </span>
            <span className="block text-[8px] tracking-[0.35em] text-gray-500">
              CAPE TOWN
            </span>
          </Link>

          <button onClick={() => setCartOpen(true)}>
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-between h-20 px-10">
          <nav className="flex gap-8">
            {navLinks.slice(0, 3).map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs tracking-[0.15em] hover:opacity-70"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-center"
          >
            <span className="block text-[9px] tracking-[0.35em] text-gray-500">
              IB
            </span>
            <span className="block font-serif text-2xl tracking-[0.15em]">
              TAILORING
            </span>
            <span className="block text-[9px] tracking-[0.35em] text-gray-500">
              CAPE TOWN
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <button onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-5 h-5" />
            </button>
            <Link href="/contact" className="text-xs tracking-[0.15em]">
              CONTACT
            </Link>
            
            

            {user ? (
              <>
                <button onClick={() => router.push(dashboardRoute)}>
                  <User className="w-5 h-5" />
                </button>
                <button onClick={() => setCartOpen(true)}>
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setOverlayOpen(true)}
                className="text-xs tracking-[0.15em]"
              >
                ACCOUNT
              </button>
            )}
          </div>
        </div>
      </header>

      {/* CART DRAWER — UI ONLY */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setCartOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-[70] flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-serif tracking-[0.15em]">YOUR BAG</span>
                <button onClick={() => setCartOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-4 flex flex-col items-center justify-center text-center text-sm text-gray-500">
                <p>Your bag preview will appear here.</p>
                <p className="mt-1">You can review items on the cart page.</p>
              </div>

              <div className="p-4 border-t space-y-3">
                <button
                  onClick={() => {
                    setCartOpen(false);
                    router.push("/cart");
                  }}
                  className="w-full border border-black py-3 text-xs tracking-[0.15em]"
                >
                  VIEW CART
                </button>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    router.push("/cart");
                  }}
                  className="w-full bg-black text-white py-3 text-xs tracking-[0.15em]"
                >
                  CHECKOUT
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="fixed top-0 left-0 h-full w-80 bg-white z-[70]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              <div className="flex justify-between p-4 border-b">
                <span className="font-serif">MENU</span>
                <button onClick={() => setMenuOpen(false)}>
                  <X />
                </button>
              </div>

              <nav className="p-4 space-y-4">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block tracking-[0.15em]"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* SIGN-IN OVERLAY (unchanged logic) */}
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            className="fixed inset-0 bg-white/95 z-[999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <h2 className="font-serif text-3xl mb-6">
                Welcome to{" "}
                <span className="text-[#C5A34A]">Ibrahim Design</span>
              </h2>
              <button
                onClick={() => {
                  openSignIn({});
                  setOverlayOpen(false);
                }}
                className="bg-[#C5A34A] text-white px-8 py-3 rounded-full"
              >
                Sign In
              </button>
            </div>

            <button
              onClick={() => setOverlayOpen(false)}
              className="absolute top-6 right-6"
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SPACER */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
