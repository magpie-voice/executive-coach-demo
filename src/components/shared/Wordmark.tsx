export default function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width={22} height={22} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 26 L4 6 L16 18 L28 6 L28 26" stroke="var(--teal)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="16" cy="24" r="1.6" fill="var(--teal)" />
      </svg>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}>MAGPIE</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Coach</span>
      </div>
    </div>
  );
}
