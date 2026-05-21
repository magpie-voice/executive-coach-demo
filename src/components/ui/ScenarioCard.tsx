import Link from "next/link";

interface ScenarioCardProps {
  title: string;
  description: string;
  icon: string;
  active: boolean;
  href?: string;
}

export default function ScenarioCard({
  title,
  description,
  icon,
  active,
  href,
}: ScenarioCardProps) {
  const card = (
    <div
      className={`rounded-xl border p-6 transition-all ${
        active
          ? "border-teal/20 bg-white shadow-sm hover:shadow-md hover:border-teal/40 cursor-pointer"
          : "border-border bg-surface opacity-60 cursor-default"
      }`}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {description}
      </p>
      {active ? (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-teal">
          Start Practice
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      ) : (
        <span className="inline-flex items-center text-xs font-medium text-text-secondary/60 uppercase tracking-wide">
          Coming Soon
        </span>
      )}
    </div>
  );

  if (active && href) {
    return <Link href={href}>{card}</Link>;
  }
  return card;
}
