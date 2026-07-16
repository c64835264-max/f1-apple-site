"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [season, setSeason] = useState("2026");
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? true : false;
  });

  // Persist dark‑mode preference
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-lg bg-white/10 border-b border-white/20">
      {/* Brand */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          McLearn P1
        </Link>
      </div>

      {/* Main nav links */}
      <div className="hidden md:flex space-x-6">
        {[["Teams","/teams"],["Standings","/standings"],["Calendar","/calendar"],["History","/history"]].map(
          ([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${
                isActive(href) ? "font-medium text-primary" : ""
              }`}
            >
              {label}
            </Link>
          )
        )}
      </div>

      {/* Season selector + theme toggle */}
      <div className="flex items-center space-x-4">
        <label className="text-sm text-muted-foreground">Season:</label>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="bg-white/20 px-3 py-1 rounded-md focus:outline-none"
        >
          {[2022, 2023, 2024, 2025, 2026].map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>

        {/* Dark‑mode toggle */}
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="p-2 rounded hover:bg-white/20 transition"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <svg /* sun icon – you can replace with Heroicons */ />
          ) : (
            <svg /* moon icon */ />
          )}
        </button>
      </div>
    </nav>
  );
}


