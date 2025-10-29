"use client";
import React, { useState, useEffect } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { router } = useAppContext();
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (!isLoaded) return null;

  // ✅ Check metadata for admin/seller/staff role
  const role = user?.publicMetadata?.role;
  const isPrivileged =
    role === "admin" || role === "seller" || role === "staff";
  const dashboardRoute = isPrivileged ? "/admin-dashboard" : "/dashboard";

  // Add shadow on scroll for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      } border-b border-gray-100`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/ibrahimdesign-logo.png"
            alt="Ibrahim Design"
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
          <div className="leading-tight">
            <span className="font-playfair text-lg sm:text-xl font-semibold text-[#0E0E0E]">
              Ibrahim Design
            </span>
            <p className="text-[9px] sm:text-xs text-[#C5A34A] font-medium tracking-widest">
              AFRICAN TAILORING
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-gray-800 font-medium">
          <Link href="/" className="hover:text-[#C5A34A] transition-colors">
            Home
          </Link>
          <Link
            href="/all-shop-products"
            className="hover:text-[#C5A34A] transition-colors"
          >
            Shop
          </Link>
          <Link href="/about" className="hover:text-[#C5A34A] transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#C5A34A] transition-colors"
          >
            Contact
          </Link>

          {/* Dynamic Dashboard */}
          {user && (
            <button
              onClick={() => router.push(dashboardRoute)}
              className="text-xs border border-[#C5A34A] text-[#C5A34A] px-4 py-1.5 rounded-full hover:bg-[#C5A34A] hover:text-white transition-all"
            >
              {isPrivileged ? "Admin Dashboard" : "Dashboard"}
            </button>
          )}

          {/* User Account / Login */}
          {user ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-shop-products")}
                />
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={() => setOverlayOpen(true)}
              className="flex items-center gap-2 border border-[#C5A34A]/50 rounded-full px-4 py-1.5 hover:bg-[#C5A34A]/10 transition-all"
            >
              <Image
                src={assets.user_icon}
                alt="user icon"
                width={16}
                height={16}
              />
              <span>Account</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-800 focus:outline-none z-[60]"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-md"
          >
            <div className="flex flex-col text-gray-800 font-medium divide-y divide-gray-100">
              {["Home", "Shop", "About", "Contact"].map((item, i) => {
                const hrefs = ["/", "/all-shop-products", "/about", "/contact"];
                return (
                  <Link
                    key={item}
                    href={hrefs[i]}
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-3 hover:bg-[#C5A34A]/10 transition-colors"
                  >
                    {item}
                  </Link>
                );
              })}

              {user && (
                <button
                  onClick={() => {
                    router.push(dashboardRoute);
                    setMenuOpen(false);
                  }}
                  className="px-6 py-3 text-left hover:bg-[#C5A34A]/10 transition-colors"
                >
                  {isPrivileged ? "Admin Dashboard" : "Dashboard"}
                </button>
              )}

              {!user && (
                <button
                  onClick={() => {
                    setOverlayOpen(true);
                    setMenuOpen(false);
                  }}
                  className="px-6 py-3 text-left hover:bg-[#C5A34A]/10 transition-colors"
                >
                  Account
                </button>
              )}

              {user && (
                <div className="px-6 py-3">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay Sign-In */}
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-[999]"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-playfair mb-6 text-[#0E0E0E]">
                Welcome to <span className="text-[#C5A34A]">Ibrahim Design</span>
              </h2>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    openSignIn({});
                    setOverlayOpen(false);
                  }}
                  className="text-lg font-medium bg-[#C5A34A] text-white rounded-full px-8 py-3 hover:bg-[#b08d3e] transition-all"
                >
                  Sign In
                </button>
                <Link
                  href="/about"
                  onClick={() => setOverlayOpen(false)}
                  className="text-lg text-gray-700 hover:text-[#C5A34A] transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOverlayOpen(false)}
                  className="text-lg text-gray-700 hover:text-[#C5A34A] transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/all-shop-products"
                  onClick={() => setOverlayOpen(false)}
                  className="text-lg text-gray-700 hover:text-[#C5A34A] transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>

            <button
              onClick={() => setOverlayOpen(false)}
              className="absolute top-5 right-6 text-gray-700 hover:text-[#C5A34A] transition-colors"
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
