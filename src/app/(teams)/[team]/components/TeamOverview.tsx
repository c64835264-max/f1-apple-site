import { useEffect, useState } from "react";

interface Props {
  teamName: string;
}
export function TeamOverview({ teamName }: Props) {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const root = document.querySelector(":root");
    if (root) {
      const computed = getComputedStyle(root);
      setColor(computed.getPropertyValue("--color-primary").trim());
    }
  }, []);

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-4">Team Overview</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel p-4">
          <h3 className="font-semibold mb-2">Team Principal</h3>
          <p className="text-sm">Toto Wolff (Mercedes example)</p>
        </div>
        <div className="glass-panel p-4">
          <h3 className="font-semibold mb-2">Chassis</h3>
          <p className="text-sm">Mercedes‑AMG F1 W15 E Performance</p>
        </div>
        <div className="glass-panel p-4">
          <h3 className="font-semibold mb-2">Power Unit</h3>
          <p className="text-sm">Mercedes‑AMG M15 E Performance</p>
        </div>
        <div className="glass-panel p-4">
          <h3 className="font-semibold mb-2">Base Location</h3>
          <p className="text-sm">Brackley, United Kingdom</p>
        </div>
        {/* Add remaining overview fields as needed */}
      </div>
    </section>
  );
}


