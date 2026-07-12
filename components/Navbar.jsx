"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, User, ArrowRight, Trash2 } from "lucide-react";
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
  const { router, getCartCount, cartItems, products, currency, updateCartQuantity } = useAppContext();
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

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = menuOpen || cartOpen ? "hidden" : "";
    }
  }, [menuOpen, cartOpen]);

  const role = user?.publicMetadata?.role;
  const isPrivileged = role === "admin" || role === "seller" || role === "staff";
  const dashboardRoute = isPrivileged ? "/admin-dashboard" : "/dashboard";

  const cartCount = getCartCount();
  
  // Create a detailed cart list for the drawer
  const cartProducts = Object.entries(cartItems).map(([id, qty]) => {
    const item = products.find((p) => p._id === id);
    return item ? { ...item, quantity: qty } : null;
  }).filter(Boolean);

  const cartSubtotal = cartProducts.reduce((acc, item) => {
    return acc + (item.offerPrice || item.price || 0) * item.quantity;
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
          
          <div className="flex items-center flex-1">
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 -ml-2">
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden md:flex gap-8">
              {navLinks.slice(0, 3).map((l) => (
                <Link key={l.label} href={l.href} className="text-[10px] tracking-[0.2em] font-medium hover:text-[#C9A35A] transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" className="text-center group">
            <span className="block text-[8px] tracking-[0.4em] text-gray-400 group-hover:text-[#C9A35A] transition-colors uppercase">Ibrahim</span>
            <span className="block font-serif text-xl md:text-2xl tracking-[0.15em] leading-none my-1">DESIGN</span>
            <span className="block text-[8px] tracking-[0.4em] text-gray-400 uppercase">Cape Town</span>
          </Link>

          <div className="flex items-center justify-end gap-3 md:gap-6 flex-1">
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href={dashboardRoute} className="text-[10px] tracking-[0.2em] hover:text-[#C9A35A]">DASHBOARD</Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <button onClick={() => openSignIn()} className="text-[10px] tracking-[0.2em] hover:text-[#C9A35A]">SIGN IN</button>
              )}
            </div>

            <button onClick={() => setCartOpen(true)} className="relative p-2 group">
              <ShoppingBag className="w-5 h-5 group-hover:text-[#C9A35A] transition-colors" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-[#1A1A1A] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-serif text-2xl tracking-tight">Your Selection</h2>
                  <span className="text-[10px] text-[#C9A35A] font-bold uppercase tracking-widest">({cartCount})</span>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-neutral-50 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {cartCount === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag className="w-16 h-16 text-neutral-100" />
                    <p className="text-neutral-500 font-light italic">Your selection is currently empty.</p>
                    <button 
                      onClick={() => {setCartOpen(false); router.push('/all-shop-products')}}
                      className="text-[10px] tracking-[0.3em] font-bold border-b border-black pb-1 uppercase"
                    >
                      Browse Collection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <AnimatePresence>
                      {cartProducts.map((item) => (
                        <motion.div 
                          key={item._id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex gap-4 group"
                        >
                          <div className="relative w-24 aspect-[3/4] bg-neutral-50 overflow-hidden shrink-0">
                            <Image 
                              src={item.image?.[0] || "/placeholder.jpg"} 
                              alt={item.name} 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                          
                          <div className="flex-1 flex flex-col py-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-[9px] tracking-widest text-[#C9A35A] uppercase font-bold mb-1">
                                  {item.category}
                                </p>
                                <h3 className="text-sm font-serif tracking-tight leading-snug">
                                  {item.name}
                                </h3>
                              </div>
                              <button 
                                onClick={() => updateCartQuantity(item._id, 0)}
                                className="text-neutral-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            
                            <div className="mt-auto flex justify-between items-end">
                              <div className="text-[10px] tracking-widest text-neutral-400">
                                QTY: {item.quantity}
                              </div>
                              <div className="text-sm font-medium">
                                {currency}{(item.offerPrice || item.price).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {cartCount > 0 && (
                <div className="p-8 bg-neutral-50 border-t space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase">Subtotal</span>
                      <span className="text-xl font-light">{currency}{cartSubtotal.toLocaleString()}</span>
                    </div>
                    <p className="text-[9px] text-neutral-400 italic">Shipping and tailored adjustments calculated at checkout.</p>
                  </div>
                  
                  <div className="grid gap-3">
                    <button
                      onClick={() => { setCartOpen(false); router.push("/cart"); }}
                      className="w-full bg-[#1A1A1A] text-white py-4 text-[10px] tracking-[0.3em] hover:bg-[#C9A35A] transition-all flex items-center justify-center gap-2 uppercase font-bold"
                    >
                      Checkout Selection <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="w-full text-center text-[9px] tracking-[0.2em] text-neutral-500 uppercase hover:text-black transition-colors"
                    >
                      Continue Browsing
                    </button>
                  </div>
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
            {/* Cinematic Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,163,90,0.12),transparent_45%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{
                x: "-110%",
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                x: "-110%",
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 22,
              }}
              className="
                fixed
                top-0
                left-0
                z-[101]
                h-screen
                w-[340px]
                overflow-hidden
                border-r
                border-white/10
                bg-white/90
                backdrop-blur-2xl
                shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                flex
                flex-col
              "
            >
              {/* Animated Gold Accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="h-[2px] origin-left bg-gradient-to-r from-[#C9A35A] via-yellow-300 to-transparent"
              />

              {/* Decorative Glow */}
              <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-[#C9A35A]/10 blur-3xl" />

              {/* Header */}
              <div className="relative flex items-center justify-between px-7 py-6 border-b border-black/5">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-serif text-2xl tracking-[0.18em]"
                >
                  Ibrahim Design
                </motion.span>

                <motion.button
                  whileHover={{
                    rotate: 90,
                    scale: 1.08,
                  }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setMenuOpen(false)}
                  className="
                    rounded-full
                    p-3
                    transition
                    bg-black/[0.04]
                    hover:bg-black/[0.08]
                  "
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation */}
              <nav className="relative flex-1 px-8 py-10">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{
                        opacity: 0,
                        x: -25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.15 + index * 0.07,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="
                          group
                          relative
                          flex
                          items-center
                          overflow-hidden
                          rounded-xl
                          px-4
                          py-4
                          uppercase
                          tracking-[0.30em]
                          text-sm
                          transition-all
                          duration-300
                          hover:bg-[#C9A35A]/8
                        "
                      >
                        <span
                          className="
                            absolute
                            left-0
                            top-1/2
                            h-0
                            w-1
                            -translate-y-1/2
                            rounded-full
                            bg-[#C9A35A]
                            transition-all
                            duration-300
                            group-hover:h-8
                          "
                        />

                        <span
                          className="
                            transition-all
                            duration-300
                            group-hover:translate-x-3
                            group-hover:text-[#C9A35A]
                          "
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.55,
                  }}
                  className="mt-14 border-t border-black/10 pt-8"
                >
                  {user ? (
                    <Link
                      href={dashboardRoute}
                      onClick={() => setMenuOpen(false)}
                      className="
                        group
                        flex
                        items-center
                        rounded-xl
                        px-4
                        py-4
                        uppercase
                        tracking-[0.30em]
                        text-sm
                        transition-all
                        duration-300
                        hover:bg-[#C9A35A]/8
                      "
                    >
                      <span className="transition-all group-hover:translate-x-3 group-hover:text-[#C9A35A]">
                        Dashboard
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        openSignIn();
                      }}
                      className="
                        group
                        flex
                        w-full
                        items-center
                        rounded-xl
                        px-4
                        py-4
                        uppercase
                        tracking-[0.30em]
                        text-left
                        text-sm
                        transition-all
                        duration-300
                        hover:bg-[#C9A35A]/8
                      "
                    >
                      <span className="transition-all group-hover:translate-x-3 group-hover:text-[#C9A35A]">
                        Sign In
                      </span>
                    </button>
                  )}
                </motion.div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
