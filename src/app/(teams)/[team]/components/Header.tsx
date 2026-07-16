import Link from "next/link";

interface Props {
  teamName: string;
}
export function Header({ teamName }: Props) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 backdrop-blur-lg bg-white/10 border-b border-white/20">
      <div className="flex items-center space-x-3">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          McLearn P1
        </Link>
        <span className="text-muted-foreground">/ {teamName}</span>
      </div>
      <nav className="hidden md:flex space-x-4">
        <Link
          href="/standings"
          className="hover:underline text-sm"
        >
          Standings
        </Link>
        <Link
          href="/calendar"
          className="hover:underline text-sm"
        >
          Calendar
        </Link>
        <Link
          href="/history"
          className="hover:underline text-sm"
        >
          History
        </Link>
      </nav>
    </header>
  );
}


