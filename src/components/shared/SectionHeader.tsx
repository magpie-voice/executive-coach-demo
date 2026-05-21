import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  right?: ReactNode;
}

export default function SectionHeader({ eyebrow, title, sub, right }: SectionHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 24 }}>
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
        <div className="h1">{title}</div>
        {sub && <div className="body-text" style={{ marginTop: 8, maxWidth: 620 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}
