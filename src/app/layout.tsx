import "./globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { MotionPlugin } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

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
  const [season, setSeason] = useState("2026"); // shared season state

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
          <MotionPlugin />
          <div className="relative min-h-screen">
            {/* Navbar stays at the top */}
            <Navbar />
            {/* Main content area – season is passed via context */}
            <SeasonContext.Provider value={{ season, setSeason }}>
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
            </SeasonContext.Provider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

/* ---- Simple React Context for the season ---- */
import { createContext, useContext } from "react";

const SeasonContext = createContext<{
  season: string;
  setSeason: (s: string) => void;
}>({ season: "2026", setSeason: () => {} });

export const useSeason = () => useContext(SeasonContext);


