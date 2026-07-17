"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Navbar } from "@/components/Navbar";
import SessionProvider from "./SeasonProvider";
import { Suspense } from "react";

const Canvas = dynamic(() => import("@react-three/fiber").then(mod => mod.Canvas), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a plain theme object to avoid createTheme SSR issues
  const theme = {
    palette: {
      mode: "dark",
      primary: { main: "#dc2626" },
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="relative min-h-screen">
          {/* Navbar stays at the top */}
          <Navbar />
          {/* Main content area – season is passed via context */}
          <SeasonProvider>
            <Canvas
              camera={{ position: [0, 2, 10], fov: 60 }}
              style={{ height: "100vh", width: "100vw" }}
            >
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <LoadingSpinner />
                </div>
              }>
                {children}
              </Suspense>
            </Canvas>
          </div>
        </ThemeProvider>
      </>
    );
  }
}
