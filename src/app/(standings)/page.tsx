  "use client";
import Link from "next/link";
import { useSeason } from "@/app/SeasonProvider";
import { getConstructorStandings, getDriverStandings } from "@/lib/fetchF1Data";
import { formatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function StandingsPage() {
  const { season, setSeason } = useSeason();
  const [constructors, setConstructors] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [tab, setTab] = useState<"constructors" | "drivers">("constructors");

  useEffect(() => {
    (async () => {
      const [cData, dData] = await Promise.all([
        getConstructorStandings(season),
        getDriverStandings(season),
      ]);
      setConstructors(cData);
      setDrivers(dData);
    })();
  }, [season]);

  return (
    <>
      <nav className="mb-6 flex items-center space-x-4">
        <span className="text-sm font-medium">Season:</span>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="bg-white/20 px-3 py-1 rounded-md focus:outline-none"
        >
          {[2022, 2023, 2024, 2025, 2026].map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
      </nav>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setTab("constructors")}
          className={`px-4 py-2 rounded ${
            tab === "constructors"
              ? "bg-primary/20 text-primary"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Constructors
        </button>
        <button
          onClick={() => setTab("drivers")}
          className={`px-4 py-2 rounded ${
            tab === "drivers"
              ? "bg-primary/20 text-primary"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Drivers
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-min text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Pos</th>
              <th className="text-left p-2">
                {tab === "constructors" ? "Team" : "Driver"}
              </th>
              <th className="text-left p-2">Points</th>
              <th className="text-left p-2">Wins</th>
              <th className="text-left p-2">Podiums</th>
            </tr>
          </thead>
          <tbody>
            {tab === "constructors"
              ? constructors.map((c, i) => (
                  <tr key={c.constructor.constructorId} className="border-t">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{c.constructor.name}</td>
                    <td className="p-2">{formatNumber(Number(c.points))}</td>
                    <td className="p-2">{formatNumber(Number(c.wins))}</td>
                    <td className="p-2">{formatNumber(Number(c.podiums))}</td>
                  </tr>
                ))
              : drivers.map((d, i) => (
                  <tr key={d.driver.driverId} className="border-t">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">
                      {d.driver.givenName} {d.driver.familyName}
                    </td>
                    <td className="p-2">{d.constructor.name}</td>
                    <td className="p-2">{formatNumber(Number(d.points))}</td>
                    <td className="p-2">{formatNumber(Number(d.wins))}</td>
                    <td className="p-2">{formatNumber(Number(d.podiums))}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


