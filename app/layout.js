import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

// 🎨 Light theme colors (white base + gold accents)
const theme = {
  background: "#FFFFFF",
  text: "#1A1A1A",
  accent: "#C9A35A",
  accentHover: "#B08B46",
  border: "#E5E5E5",
};

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

export const metadata = {
  title: "Ibrahim Design | African Tailoring in Cape Town",
  description:
    "Bespoke African fashion by Ibrahim Design. Custom boubous, agbadas, shirts & dresses for men, women & children. Visit our Cape Town atelier.",
  keywords:
    "African Tailor Cape Town, Custom Tailor South Africa, Bespoke African Fashion, Ibrahim Design, African Clothing Store Cape Town",
  generator: "v0.app",
  icons: {
    icon: "/ibrahimdesign-logo.png",
    shortcut: "/ibrahimdesign-logo.png",
    apple: "/ibrahimdesign-logo.png",
  },
};

// 🌀 Clean gold spinner
function GlobalLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: theme.background }}
    >
      <div className="relative flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
          style={{
            borderColor: `${theme.accent}`,
            borderTopColor: "transparent",
          }}
        ></div>
        <div
          className="absolute w-10 h-10 rounded-full border-4 opacity-40 animate-pulse"
          style={{
            borderColor: `${theme.accent}`,
            borderTopColor: "transparent",
          }}
        ></div>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} ${playfair.variable} antialiased`}
          style={{
            backgroundColor: theme.background,
            color: theme.text,
          }}
        >
          <Toaster
            toastOptions={{
              style: {
                background: theme.accent,
                color: theme.background,
              },
              success: {
                iconTheme: {
                  primary: theme.accent,
                  secondary: theme.background,
                },
              },
            }}
          />
          <AppContextProvider>
            <Suspense fallback={<GlobalLoader />}>{children}</Suspense>
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
