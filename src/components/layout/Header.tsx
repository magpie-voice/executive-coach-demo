import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold text-foreground">
          MAGPIE <span className="text-teal">Coach</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
