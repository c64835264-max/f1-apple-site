import "./globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Navbar } from "@/components/Navbar";
import SeasonProvider from "./SeasonProvider";
import { Suspense } from "react";

export const metadata = {
  title: "McLearn P1 – Apple‑F1 Experience",
  description:
    "A premium Liquid‑Glass Formula One website inspired by Apple keynotes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#dc2626" },
    },
  });

  return (
    <html lang="en" className="scroll-smooth">
      <body>
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
            </SeasonProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
