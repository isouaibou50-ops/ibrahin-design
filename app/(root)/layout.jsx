"use client"; // Required because of AppContextProvider and Toaster state

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/AppContext";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Theme constants aligned with Ibrahim Design branding
const theme = {
  background: "#FFFFFF",
  text: "#1A1A1A",
  accent: "#C9A35A", // Gold accent
};

/**
 * Enhanced Global Loader
 * Uses Framer Motion for a smoother entrance/exit
 */
function GlobalLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div
          className="w-16 h-16 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: theme.accent, borderTopColor: "transparent" }}
        />
        {/* Inner pulsing logo or circle */}
        <div
          className="absolute w-8 h-8 rounded-full animate-pulse"
          style={{ backgroundColor: theme.accent, opacity: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

const RootLayout = ({ children }) => {
  return (
    <AppContextProvider>
      <div
        className="flex min-h-screen w-full flex-col font-sans selection:bg-[#C9A35A]/30"
        style={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        {/* Global Toast system with refined styling */}
        <Toaster
          position="bottom-right" // Often better UX on mobile than top-right
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1A1A1A",
              color: "#FFFFFF",
              borderRadius: "0px", // High-end tailoring aesthetic
              fontSize: "14px",
              border: `1px solid ${theme.accent}`,
            },
            success: {
              iconTheme: { primary: theme.accent, secondary: "#1A1A1A" },
            },
          }}
        />

        {/* Navigation - Suspense handles the fallback while auth/context initializes */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        {/* 
            Main content 
            Added a slight fade-in animation for smoother page transitions 
        */}
        <main className="flex-grow w-full pt-16 lg:pt-20"> 
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer loads after main content */}
        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
      </div>
    </AppContextProvider>
  );
};

export default RootLayout;
