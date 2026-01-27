// app/layout.jsx
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from '@/components/ib-tailoring/cart-context'
import { MobileNav } from '@/components/ib-tailoring/mobile-nav'


// Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700']
});

// Theme (light)
const theme = {
  background: "#FFFFFF",
  text: "#1A1A1A",
  accent: "#C9A35A",
};


export const metadata = {
  title: "Ibrahim Design | African Tailoring in Cape Town | Tailor in Cape Town",
  description: "Bespoke African fashion by Ibrahim Design.Custom Design, African Culture, Custom boubous, agbadas, shirts & dresses made in Cape Town.",
  icons: {
    icon: "/ibrahimdesign-logo.png",
    shortcut: "/ibrahimdesign-logo.png",
    apple: "/ibrahimdesign-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{colorPrimary: "#1A1A1A"}}>
     <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased bg-background text-foreground`}>
        <CartProvider>
          {children}
          <MobileNav />
          {/* Bottom padding for mobile nav */}
          <div className="h-16 md:hidden" />
        </CartProvider>
        <Analytics />
      </body>
    </html>
    </ClerkProvider>
  );
}
