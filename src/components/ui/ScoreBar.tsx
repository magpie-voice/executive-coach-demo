"use client";

interface ScoreBarProps {
  name: string;
  score: number;
  maxScore: number;
  label: string;
  weight: number;
}

export default function ScoreBar({
  name,
  score,
  maxScore,
  label,
  weight,
}: ScoreBarProps) {
  const percentage = (score / maxScore) * 100;
  const color =
    score >= 3.5
      ? "bg-score-high"
      : score >= 2.5
        ? "bg-teal"
        : "bg-score-low";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs text-text-secondary ml-2">({weight}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {score}/{maxScore}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              score >= 3.5
                ? "bg-green-50 text-green-700"
                : score >= 2.5
                  ? "bg-teal-light text-teal-dark"
                  : "bg-red-50 text-red-700"
            }`}
          >
            {label}
          </span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-surface overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
