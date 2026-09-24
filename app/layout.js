// app/layout.jsx
import React from "react";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import WhatsAppWidget from "@/components/WhatsAppWidget"; 
import "./globals.css";

// 1. Clean, Single Font Declarations
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

// 2. Mobile-First App Performance Settings
export const viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// 3. Advanced Local SEO & Target Keywords Matching
export const metadata = {
  title: {
    default: "Ibrahim Design | Bespoke Tailor Shop Cape Town CBD",
    template: "%s | Ibrahim Design",
  },
  description:
    "Premium bespoke suits, luxury African traditional wear, custom boubous, and professional clothing alterations on Long Street, Cape Town CBD. Perfect fit guaranteed.",
  keywords: [
    "bespoke tailor cape town",
    "suit alterations cape town cbd",
    "clothing alterations long street",
    "african traditional wear tailor cape town",
    "custom suits cape town",
    "couture",
    "evening gowns",
    "luxury designer"
  ],
  metadataBase: new URL("https://ibrahimdesign.co.za"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/ibrahimdesign-logo.png",
    shortcut: "/ibrahimdesign-logo.png",
    apple: "/ibrahimdesign-logo.png",
  },
  openGraph: {
    title: "Ibrahim Design | Bespoke Tailor Shop Cape Town CBD",
    description: "Bespoke African fashion, custom suits, and expert alterations on Long Street.",
    url: "https://ibrahimdesign.co.za",
    siteName: "Ibrahim Design",
    locale: "en_ZA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ colorPrimary: "#D4AF37" }}>
      <html lang="en" className="scroll-smooth">
        <body
          className={`
            ${inter.variable}
            ${cormorant.variable}
            ${playfair.variable}
            font-sans
            antialiased
            bg-[#050507] 
            text-[#f4f4f6]
            min-h-screen
            overflow-x-hidden
            relative
          `}
        >
          {/* Ambient Futuristic Background Mesh */}
          <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-amber-500/5 blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vh] rounded-full bg-neutral-800/20 blur-[100px]" />
          </div>

          {/* Main Content Layout */}
          <main className="relative z-10 min-h-screen w-full">
            {children}
          </main>

          {/* Floating On-Site WhatsApp Widget */}
          <WhatsAppWidget />
        </body>
      </html>
    </ClerkProvider>
  );
}






