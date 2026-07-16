import { formatNumber, formatDate } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  constructorData: any[];
  driverData: any[];
  raceData: any[];
}
export function CurrentSeason({
  constructorData,
  driverData,
  raceData,
}: Props) {
  // Build points‑over‑rounds dataset for top 5 constructors (simplified)
  const constructorPoints: { name: string; points: number }[] =
    constructorData
      .slice(0, 5)
      .map((c) => ({
        name: c.constructor.name,
        points: Number(c.points),
      }));

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-4">
        Current Season ({new Date().getFullYear()})
      </h2>

      {/* Constructors Championship */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          Constructors Championship
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Pos</th>
              <th className="text-left p-2">Team</th>
              <th className="text-left p-2">Points</th>
              <th className="text-left p-2">Wins</th>
              <th className="text-left p-2">Podiums</th>
            </tr>
          </thead>
          <tbody>
            {constructorData.map((c, i) => (
              <tr key={c.constructor.constructorId} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{c.constructor.name}</td>
                <td className="p-2">{formatNumber(Number(c.points))}</td>
                <td className="p-2">{formatNumber(Number(c.wins))}</td>
                <td className="p-2">{formatNumber(Number(c.podiums))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Simple points trend chart for top constructor */}
        {constructorPoints.length > 0 && (
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={constructorPoints}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="points" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Drivers Championship */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          Drivers Championship
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Pos</th>
              <th className="text-left p-2">Driver</th>
              <th className="text-left p-2">Team</th>
              <th className="text-left p-2">Points</th>
              <th className="text-left p-2">Wins</th>
              <th className="text-left p-2">Podiums</th>
            </tr>
          </thead>
          <tbody>
            {driverData.map((d, i) => (
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

      {/* Latest Race (if any) */}
      {raceData.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">
            Latest Race
          </h3>
          <p className="text-sm">
            {raceData[0].GrandPrix.raceName} –{' '}
            {formatDate(raceData[0].date)}
          </p>
        </div>
      )}
    </section>
  );
}


