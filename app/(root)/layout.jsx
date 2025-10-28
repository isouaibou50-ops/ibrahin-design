import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/AppContext";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

// Theme (light)
const theme = {
  background: "#FFFFFF",
  text: "#1A1A1A",
  accent: "#C9A35A",
};


function GlobalLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: theme.background }}>
      <div className="relative flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: theme.accent, borderTopColor: "transparent" }}
        />
        <div
          className="absolute w-10 h-10 rounded-full border-4 opacity-40 animate-pulse"
          style={{ borderColor: theme.accent, borderTopColor: "transparent" }}
        />
      </div>
    </div>
  );
}

const RootLayout = ({ children }) => {
  return (
    <div
      className="flex min-h-screen w-full flex-col bg-white"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Global Toast system */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme.accent,
            color: theme.background,
            fontWeight: 500,
          },
          success: { iconTheme: { primary: theme.accent, secondary: theme.background } },
        }}
      />

      <AppContextProvider>
        {/* Top-level navigation may fetch or wait for user session */}
        <Suspense fallback={<GlobalLoader />}>
          <Navbar />
        </Suspense>

        {/* Main content (server-rendered) */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* Footer loads after main content */}
        <Suspense fallback={<div />}>
          <Footer />
        </Suspense>
      </AppContextProvider>
    </div>
  );
};

export default RootLayout;