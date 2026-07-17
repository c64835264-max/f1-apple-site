import { GlassCar } from "@/components/GlassCar";

interface Props {
  teamName: string;
}
export default function TeamHistory({ teamName }: Props) {
  // Mock timeline – replace with real data per team if desired
  const timelineData = [
    { year: "2010", title: "First Pole Position", description: "Description text…" },
    { year: "2012", title: "First Win", description: "Description text…" },
    { year: "2014", title: "Constructors Championship", description: "Description text…" },
    { year: "2016", title: "Driver Championship", description: "Description text…" },
    { year: "2018", title: "Historic Double‑Win", description: "Description text…" },
    { year: "2020", title: "New Livery Launch", description: "Description text…" },
    { year: "2022", title: "Milestone 200th Race", description: "Description text…" },
    { year: "2024", title: "Latest Upgrade", description: "Description text…" },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-4">Team History</h2>
      <div className="relative h-96">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/20" />

        {/* Timeline items – staggered animation */}
        {timelineData.map((item, idx) => (
          <div
            key={item.year}
            className="absolute left-2 top-[calc(10%+_idx*10%)] w-64 pl-4 pr-4"
          >
            <div className="glass-panel p-4">
              <h3 className="font-semibold mb-1">
                {item.year} – {item.title}
              </h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}