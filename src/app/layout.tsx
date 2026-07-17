import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata = {
  title: "McLean P1 – Apple‑F1 Experience",
  description:
    "A premium Liquid‑Glass Formula One website inspired by Apple keynotes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
