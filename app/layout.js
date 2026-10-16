// app/layout.jsx
import React from "react";
import Script from "next/script";
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

// 3. Campaign-Optimised Advanced SEO Configuration
export const metadata = {
  title: {
    default: "Ibrahim Design | Best Tailor Shop in Cape Town CBD",
    template: "%s | Ibrahim Design Cape Town",
  },
  description:
    "Premium bespoke suits, luxury African traditional wear, custom boubous, wedding dress tailoring, and professional clothing alterations at Market House, Green Market Square, Cape Town CBD. Perfect fit guaranteed.",
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
    description: "Bespoke African fashion, custom suits, wedding gowns, and expert clothing alterations at Market House, Green Market Square.",
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
  // 4. Local Business Schema Data to force Map and Local Search Dominance
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ibrahim Design",
    "image": "https://ibrahimdesign.co.za",
    "@id": "https://ibrahimdesign.co.za",
    "url": "https://ibrahimdesign.co.za",
    "telephone": "+27837212432",
    "priceRange": "\$\$\$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop 5, Market House, Green Market Square",
      "addressLocality": "Cape Town City Centre",
      "postalCode": "8001",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.9231, // Precise coordinates matching Market House at Greenmarket Square
      "longitude": 18.4201
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:30",
        "closes": "17:30"
      }
    ],
    "sameAs": [
      "https://instagram.com",
      "https://facebook.com"
    ],
    "keywords": "tailor cape town cbd, custom suits cape town, african traditional wear tailor cape town, alterations near me, dressmaker cape town"
  };

  return (
    <ClerkProvider appearance={{ colorPrimary: "#D4AF37" }}>
      <html lang="en" className="scroll-smooth">
        <head>
          {/* Injection of the structured data payload */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Script
            src="https://googletagmanager.com"
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17657264064'); 
            `}
          </Script>
        </head>
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
