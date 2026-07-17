'use client';

import { GlassCar } from "@/components/GlassCar";

interface Props {
  teamName: string;
  teamColor: string; // hex with #
}

export default function HeroSection({ teamName, teamColor }: Props) {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Car pose – static, just for show */}
      <GlassCar
        color={teamColor}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.5}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">{teamName}</h1>
        <p className="text-lg mb-6">
          Cutting‑edge technology meets relentless performance.
        </p>
        <button
          className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
        >
          Explore the Team
        </button>
      </div>
    </section>
  );
}