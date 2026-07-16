import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useSeason } from "@/app/SeasonContext";
import { getConstructorStandings, getDriverStandings, getRaceSchedule } from "@/lib/fetchF1Data";
import { TEAM_MAP } from "@/lib/utils";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { CurrentSeason } from "./CurrentSeason";
import { TeamHistory } from "./TeamHistory";
import { TeamOverview } from "./TeamOverview";
import { NewsFeed } from "./NewsFeed";
import { useEffect, useState } from "react";

export const generateStaticParams = () => {
  // Return all team keys for static generation
  return Object.keys(TEAM_MAP).map((key) => ({ team: key }));
};

export default function TeamPage() {
  const params = useParams<{ team: string }>();
  const teamSlug = params?.team ?? "";
  const team = TEAM_MAP[teamSlug];
  if (!team) notFound();

  const { season } = useSeason();

  // Set the team‑specific CSS variable on <main> so children can read it
  const [dataReady, setDataReady] = useState(false);
  const [constructorData, setConstructorData] = useState<any[]>([]);
  const [driverData, setDriverData] = useState<any[]>([]);
  const [raceData, setRaceData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [c, d, r] = await Promise.all([
        getConstructorStandings(season),
        getDriverStandings(season),
        getRaceSchedule(season),
      ]);
      setConstructorData(c);
      setDriverData(d);
      setRaceData(r);
      setDataReady(true);
    })();
  }, [season]);

  // Inline style to set CSS variable
  const mainStyle = {
    "--color-primary": team.color,
  };

  if (!dataReady) {
    return (
      <main style={mainStyle} className="min-h-screen flex flex-col">
        <Header teamName={team.name} />
        <section className="flex-1 flex items-center justify-center">
          <p>Loading…</p>
        </section>
      </main>
    );
  }

  return (
    <main style={mainStyle} className="min-h-screen">
      <Header teamName={team.name} />
      <section className="px-6 pb-12">
        <HeroSection teamName={team.name} teamColor={team.color} />
        <CurrentSeason
          constructorData={constructorData}
          driverData={driverData}
          raceData={raceData}
        />
        <TeamHistory teamName={team.name} />
        <TeamOverview teamName={team.name} />
        <NewsFeed teamName={team.name} />
      </section>
    </main>
  );
}


