"use client";

import { createContext, useContext, useState } from "react";

const SeasonContext = createContext<{
  season: string;
  setSeason: (s: string) => void;
}>({ season: "2026", setSeason: () => {} });

export const useSeason = () => useContext(SeasonContext);

export default function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState("2026");
  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
}
