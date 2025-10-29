// app/layout.jsx
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";



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

// Theme (light)
const theme = {
  background: "#FFFFFF",
  text: "#1A1A1A",
  accent: "#C9A35A",
};


export const metadata = {
  title: "Ibrahim Design | African Tailoring in Cape Town | Tailor in Cape Town",
  description: "Bespoke African fashion by Ibrahim Design. Custom boubous, agbadas, shirts & dresses made in Cape Town.",
  icons: {
    icon: "/ibrahimdesign-logo.png",
    shortcut: "/ibrahimdesign-logo.png",
    apple: "/ibrahimdesign-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{colorPrimary: "#1A1A1A"}}>
      <html lang="en">
        <body
          className={`antialiased ${inter.variable} ${playfair.variable}`}
          style={{ backgroundColor: theme.background, color: theme.text }}
        >
          {/* <Toaster
            toastOptions={{
              style: { background: theme.accent, color: theme.background },
              success: { iconTheme: { primary: theme.accent, secondary: theme.background } },
            }}
          /> */}
              {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
