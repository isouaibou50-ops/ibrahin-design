// app/layout.jsx
import React from "react";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Ibrahim Design | African Tailoring in Cape Town | Tailor in Cape Town",
  description:
    "Bespoke African fashion by Ibrahim Design. Custom Design, African Culture, custom boubous, agbadas, shirts & dresses made in Cape Town.",
  keywords: ["couture", "fashion", "evening gowns", "luxury", "designer", "haute couture"],
  icons: {
    icon: "/ibrahimdesign-logo.png",
    shortcut: "/ibrahimdesign-logo.png",
    apple: "/ibrahimdesign-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ colorPrimary: "#1A1A1A" }}>
      <html lang="en" className="scroll-smooth">
        <body
          className={`
            ${inter.variable}
            ${cormorant.variable}
            ${playfair.variable}
            font-sans
            antialiased
            bg-white
            text-neutral-900
          `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
