import { cache } from "react";

export type Driver = {
  driverId: string;
  permanentNumber: string | null;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

export type Constructor = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export type RaceResult = {
  season: string;
  round: string;
  GrandPrix: {
    raceName: string;
    Circuit: {
      circuitName: string;
      Location: {
        lat: string;
        long: string;
        locality: string;
        country: string;
      };
    };
  };
  date: string;
  time: string | null;
};

export type NewsArticle = {
  title: string;
  url: string;
  urlToImage: string | null;
  source: { name: string };
  publishedAt: string;
  description: string | null;
};

export const getConstructorStandings = cache(async (season: string) => {
  const res = await fetch(
    `https://ergast.com/api/f1/${season}/constructorStandings.json`
  );
  const data = await res.json();
  return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings ?? [];
});

export const getDriverStandings = cache(async (season: string) => {
  const res = await fetch(
    `https://ergast.com/api/f1/${season}/driverStandings.json`
  );
  const data = await res.json();
  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];
});

export const getRaceSchedule = cache(async (season: string) => {
  const res = await fetch(`https://ergast.com/api/f1/${season}.json`);
  const data = await res.json();
  return data.MRData.RaceTable.Races ?? [];
});

/**
 * Placeholder news fetcher.
 * Replace with your own NewsAPI key (add NEXT_PUBLIC_NEWS_API_KEY to .env.local)
 * and uncomment the fetch block below.
 */
export const getLatestNews = cache(async (teamName: string) => {
  /*
  const key = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  if (!key) return []; // fallback if no key provided
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      teamName
    )}&pageSize=5&apiKey=${key}`
  );
  const json = await res.json();
  return json.articles.map((a: any) => ({
    title: a.title,
    url: a.url,
    urlToImage: a.urlToImage,
    source: { name: a.source?.name ?? "Unknown" },
    publishedAt: a.publishedAt,
    description: a.description,
  }));
  */
  // For demo we return an empty array.
  return [];
});


