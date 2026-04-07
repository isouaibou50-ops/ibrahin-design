"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User, ArrowRight } from "lucide-react";
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
  const { router, getCartCount, cartItems, products, currency } = useAppContext();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawers are open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = menuOpen || cartOpen ? "hidden" : "";
    }
  }, [menuOpen, cartOpen]);

  const role = user?.publicMetadata?.role;
  const isPrivileged = role === "admin" || role === "seller" || role === "staff";
  const dashboardRoute = isPrivileged ? "/admin-dashboard" : "/dashboard";

  // Calculate cart subtotal for the drawer preview
  const cartCount = getCartCount();
  const cartSubtotal = Object.entries(cartItems).reduce((acc, [id, qty]) => {
    const item = products.find((p) => p._id === id);
    return acc + (item?.offerPrice || item?.price || 0) * qty;
  }, 0);

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-md py-3 shadow-sm" : "bg-white py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex items-center justify-between">
          
          {/* LEFT: Mobile Menu Toggle / Desktop Nav */}
          <div className="flex items-center flex-1">
            <button 
              onClick={() => setMenuOpen(true)} 
              className="md:hidden p-2 -ml-2"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden md:flex gap-8">
              {navLinks.slice(0, 3).map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[10px] tracking-[0.2em] font-medium hover:text-[#C9A35A] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CENTER: Logo */}
          <Link href="/" className="text-center group">
            <span className="block text-[8px] tracking-[0.4em] text-gray-400 group-hover:text-[#C9A35A] transition-colors">
              IBRAHIM
            </span>
            <span className="block font-serif text-xl md:text-2xl tracking-[0.15em] leading-none my-1">
              DESIGN
            </span>
            <span className="block text-[8px] tracking-[0.4em] text-gray-400">
              CAPE TOWN
            </span>
          </Link>

          {/* RIGHT: Actions */}
          <div className="flex items-center justify-end gap-3 md:gap-6 flex-1">
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href={dashboardRoute} className="text-[10px] tracking-[0.2em] hover:text-[#C9A35A]">
                    DASHBOARD
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <button
                  onClick={() => openSignIn()}
                  className="text-[10px] tracking-[0.2em] hover:text-[#C9A35A]"
                >
                  SIGN IN
                </button>
              )}
            </div>

            <button 
              onClick={() => setCartOpen(true)} 
              className="relative p-2 group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-[#C9A35A] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#1A1A1A] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-serif text-xl tracking-tight">Your Selection</h2>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-50 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartCount === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag className="w-12 h-12 text-gray-200" />
                    <p className="text-gray-500 font-light italic">Your bag is currently empty.</p>
                    <button 
                      onClick={() => {setCartOpen(false); router.push('/all-shop-products')}}
                      className="text-xs tracking-[0.2em] underline underline-offset-4"
                    >
                      BROWSE SHOP
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Simplified list for preview */}
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                      {cartCount} {cartCount === 1 ? 'Item' : 'Items'} in bag
                    </p>
                    {/* Item mapping would go here for a richer UI */}
                  </div>
                )}
              </div>

              {cartCount > 0 && (
                <div className="p-6 bg-gray-50 border-t space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs tracking-[0.1em] text-gray-500 uppercase">Subtotal</span>
                    <span className="text-lg font-medium">{currency}{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => { setCartOpen(false); router.push("/cart"); }}
                    className="w-full bg-[#1A1A1A] text-white py-4 text-[10px] tracking-[0.3em] hover:bg-[#C9A35A] transition-all flex items-center justify-center gap-2"
                  >
                    CHECKOUT <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100]"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[101] p-8 flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xl font-serif tracking-wide border-b border-gray-50 pb-2 hover:text-[#C9A35A] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                
                {user ? (
                   <Link
                    href={dashboardRoute}
                    onClick={() => setMenuOpen(false)}
                    className="text-xl font-serif tracking-wide text-[#C9A35A]"
                  >
                    DASHBOARD
                  </Link>
                ) : (
                  <button
                    onClick={() => {setMenuOpen(false); openSignIn();}}
                    className="text-left text-xl font-serif tracking-wide"
                  >
                    SIGN IN
                  </button>
                )}
              </nav>

              <div className="mt-auto pt-10 text-[8px] tracking-[0.3em] text-gray-400">
                &copy; {new Date().getFullYear()} IBRAHIM DESIGN CO.
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
