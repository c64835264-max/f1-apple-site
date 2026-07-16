export const TEAM_MAP: Record<
  string,
  { name: string; color: string }
> = {
  mercedes: { name: "Mercedes", color: "#00d2be" },
  redbull: { name: "Red Bull", color: "#0600ef" },
  ferrari: { name: "Ferrari", color: "#ef0107" },
  astonmartin: { name: "Aston Martin", color: "#006f62" },
  alpine: { name: "Alpine", color: "#0090ff" },
  williams: { name: "Williams", color: "#005aff" },
  racingbulls: { name: "RB", color: "#6692cf" },
  haas: { name: "Haas", color: "#ffffff" },
  sauber: { name: "Sauber", color: "#52e252" },
  mclaren: { name: "McLaren", color: "#ff8700" },
  cadillac: { name: "Cadillac", color: "#000000" },
};

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(Math.round(num));
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}


