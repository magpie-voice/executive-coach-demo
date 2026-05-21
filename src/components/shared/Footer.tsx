import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--line)",
        padding: "32px 56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "var(--mute)",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Wordmark />
        <span className="mono" style={{ fontSize: 11, color: "var(--mute-2)" }}>
          v0.4 · INTERNAL PREVIEW
        </span>
      </div>
      <div style={{ display: "flex", gap: 22 }}>
        <span>About the method</span>
        <span>Privacy & recording policy</span>
        <span>Coach handbook</span>
      </div>
    </div>
  );
}
