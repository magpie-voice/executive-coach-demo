"use client";

import { useMemo } from "react";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import SectionHeader from "@/components/shared/SectionHeader";
import Icon from "@/components/shared/Icon";

const SCENARIOS = [
  {
    id: "stakeholder",
    badge: "Live",
    title: "High-Pressure Stakeholder Conflict",
    desc: "Navigate a tense conversation with a regional partner who feels blindsided by a commercial decision. Stay calm under direct pushback and hold the decision.",
    duration: "12–18 min",
    difficulty: "Advanced",
    icon: "handshake",
    featured: true,
    counterpart: "Anh Le — VP, Channel Partners (Vietnam)",
    agentId: "stakeholder",
  },
  {
    id: "team-conflict",
    badge: "Live",
    title: "Team Conflict",
    desc: "Your Sales Manager and PAM lead are in open conflict over territory ownership. Both are strong performers but the tension is hurting the wider team.",
    duration: "10–15 min",
    difficulty: "Intermediate",
    icon: "flame",
    featured: true,
    counterpart: "Raj Menon — Sales Manager",
    agentId: "team-conflict",
  },
  {
    id: "reactive-leadership",
    badge: "Live",
    title: "Reactive Leadership",
    desc: "Your regional director is about to tell you that you are too involved in operations and your team cannot make decisions without you. Hear the feedback and respond.",
    duration: "10–14 min",
    difficulty: "Advanced",
    icon: "target",
    featured: true,
    counterpart: "Karen Walsh — Regional Director",
    agentId: "reactive-leadership",
  },
  {
    id: "difficult-conversations",
    badge: "Live",
    title: "Difficult Conversations",
    desc: "Have a tough performance conversation with your longest-serving Operations Manager. Strong loyalty, but results have been slipping for a quarter.",
    duration: "10–15 min",
    difficulty: "Intermediate",
    icon: "user",
    featured: true,
    counterpart: "David Chen — Operations Manager, 6 yrs",
    agentId: "difficult-conversations",
  },
];

const REFLECTIONS = [
  {
    icon: "eye",
    q: "Where in the last 30 days did you step in when someone on your team could have handled it?",
    hint: "Think about the signal that sends — and what ownership shift would change it.",
  },
  {
    icon: "shield",
    q: "What decision are you avoiding right now, and what is it costing the business?",
    hint: "Leaders often delay the hardest conversations. Name it, then plan it.",
  },
  {
    icon: "compass",
    q: "If you were removed from the business for two weeks, what would break first?",
    hint: "That is your biggest dependency — and your first delegation priority.",
  },
  {
    icon: "heart",
    q: "Which team member has grown the most this quarter, and what did you do to enable it?",
    hint: "Replicate what worked. Leadership is about building capability, not just delivering results.",
  },
  {
    icon: "ear",
    q: "When was the last time you asked for feedback on your leadership — and actually changed something?",
    hint: "The team watches what you do, not what you say. Visible change builds trust.",
  },
];

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="fade-in">
        {/* Hero */}
        <section style={{ padding: "88px 56px 56px", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "radial-gradient(900px 360px at 78% -10%, oklch(0.95 0.035 200 / 0.75), transparent 60%)",
            }}
          />
          <div style={{ position: "relative", maxWidth: 1100, display: "grid", gridTemplateColumns: "1.25fr .9fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
                <div className="pill" style={{ background: "var(--teal-soft)", color: "var(--teal-2)", borderColor: "transparent" }}>
                  <Icon name="sparkles2" size={13} /> AI-powered leadership performance
                </div>
              </div>
              <h1 className="h-display" style={{ margin: 0 }}>
                Build leadership capability
                <br />
                that drives <span className="serif" style={{ color: "var(--teal)" }}>business results.</span>
              </h1>
              <p className="body-text" style={{ marginTop: 22, fontSize: 17, maxWidth: 540 }}>
                A performance platform that connects leadership behavior directly to commercial outcomes. Practice real scenarios, track ownership shifts, and drive measurable movement — not just awareness.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 32, alignItems: "center" }}>
                <Link href="/setup" className="btn btn-primary btn-lg" style={{ textDecoration: "none" }}>
                  Start a practice session <Icon name="arrowRight" size={16} />
                </Link>
                <Link href="/dashboard" className="btn btn-ghost btn-lg" style={{ textDecoration: "none" }}>
                  View GM dashboard
                </Link>
              </div>
              <div style={{ display: "flex", gap: 28, marginTop: 36, color: "var(--mute)" }}>
                <Stat n="8" l="GMs enrolled" />
                <Sep />
                <Stat n="5" l="countries" />
                <Sep />
                <Stat n="+0.6" l="avg score lift / 90 days" />
              </div>
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* Scenarios */}
        <section style={{ padding: "40px 56px 64px" }}>
          <SectionHeader
            eyebrow="Practice scenarios"
            title="Four scenarios. Tailored to your development needs."
            sub="Each scenario seeds a counterpart with their own goals, leverage, and emotional state. Matched to your Deeper Signals assessment."
            right={
              <button className="btn btn-secondary btn-sm">
                <Icon name="plus" size={14} /> Request a custom scenario
              </button>
            }
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "stretch" }}>
            {SCENARIOS.map((s) => (
              <ScenarioCard key={s.id} s={s} />
            ))}
          </div>
        </section>

        {/* Reflection Prompts */}
        <section style={{ padding: "40px 56px 64px" }}>
          <SectionHeader
            eyebrow="Monthly reflections"
            title="Questions to sit with before your next sprint."
            sub="These prompts are designed to surface patterns in your leadership. Review them before your coaching session — come prepared, not reactive."
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {REFLECTIONS.map((r, i) => (
              <div key={i} className="card" style={{ padding: "22px 26px", display: "flex", gap: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "var(--teal-soft)",
                    color: "var(--teal-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Icon name={r.icon} size={17} />
                </div>
                <div>
                  <div className="h3" style={{ fontSize: 15, lineHeight: 1.45 }}>{r.q}</div>
                  <div className="small" style={{ marginTop: 6, color: "var(--mute)" }}>{r.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LPS Method strip */}
        <section style={{ padding: "0 56px 80px" }}>
          <div className="card" style={{ padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--teal-soft)",
                  color: "var(--teal-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="book" size={20} />
              </div>
              <div>
                <div className="h3">Leadership Performance System</div>
                <div className="small" style={{ marginTop: 4 }}>
                  Actions → Impact → Results. Connecting leadership behavior directly to business performance.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["Assessment", "Performance input", "Review session", "Action plan", "Monthly follow-up"].map((m, i) => (
                <div key={i} className="pill" style={{ background: "var(--bg)", borderColor: "var(--line)" }}>
                  <span className="mono" style={{ color: "var(--teal)", fontSize: 11 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {m}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="h2" style={{ color: "var(--ink)" }}>{n}</div>
      <div className="small" style={{ marginTop: 2 }}>{l}</div>
    </div>
  );
}

function Sep() {
  return <div style={{ width: 1, alignSelf: "stretch", background: "var(--line)" }} />;
}

function ScenarioCard({ s }: { s: (typeof SCENARIOS)[number] }) {
  return (
    <Link href={`/setup?scenario=${s.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        className="card hover-lift"
        style={{
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          height: "100%",
          background: "#fff",
          position: "relative",
        }}
      >
        {s.badge && (
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              fontSize: 11,
              fontWeight: 500,
              color: "var(--teal-2)",
              background: "#fff",
              border: "1px solid oklch(0.86 0.030 200)",
              padding: "4px 10px",
              borderRadius: 999,
              letterSpacing: ".01em",
            }}
          >
            {s.badge}
          </div>
        )}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "var(--teal-soft)",
            color: "var(--teal-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={s.icon} size={20} />
        </div>
        <div>
          <div className="h2" style={{ marginBottom: 8, fontSize: 19 }}>{s.title}</div>
          <p className="body-text" style={{ margin: 0 }}>{s.desc}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <KV k="Counterpart" v={s.counterpart} />
          <KV k="Duration" v={s.duration} />
          <KV k="Difficulty" v={s.difficulty} />
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8 }}>
          <span className="btn btn-primary">
            Start practice <Icon name="arrowRight" size={15} />
          </span>
          <span className="small" style={{ color: "var(--mute-2)" }}>Voice · 1:1</span>
        </div>
      </div>
    </Link>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.5 }}>
      <span className="mono" style={{ color: "var(--mute-2)", textTransform: "uppercase", fontSize: 10, letterSpacing: ".12em", minWidth: 86, paddingTop: 2 }}>
        {k}
      </span>
      <span style={{ color: "var(--ink-2)" }}>{v}</span>
    </div>
  );
}

function HeroVisual() {
  const bars = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => {
        const t = i / 56;
        const h = Math.sin(t * 9) * 0.35 + Math.sin(t * 22 + 1) * 0.25 + 0.5;
        return Math.max(0.12, Math.min(1, h));
      }),
    []
  );
  return (
    <div className="card" style={{ padding: 22, background: "#fff", boxShadow: "var(--shadow-3)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--rose)" }} />
          <span className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".1em", textTransform: "uppercase" }}>Live · 04:21</span>
        </div>
        <div className="pill">
          <Icon name="mic" size={12} /> Listening
        </div>
      </div>

      {/* Orb */}
      <div style={{ position: "relative", height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 999,
            background: "radial-gradient(circle at 35% 30%, oklch(0.62 0.09 200), oklch(0.40 0.07 200) 70%)",
            boxShadow: "0 24px 60px -16px oklch(0.40 0.07 200 / 0.55), inset 0 1px 0 rgba(255,255,255,.18)",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", inset: -14, borderRadius: 999, border: "1px solid oklch(0.40 0.07 200 / 0.18)", animation: "pulseRing 2.6s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: -28, borderRadius: 999, border: "1px solid oklch(0.40 0.07 200 / 0.10)", animation: "pulseRing 2.6s ease-out infinite .8s" }} />
        </div>
      </div>

      {/* Waveform strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 44, marginTop: 4 }}>
        {bars.map((b, i) => (
          <div key={i} style={{ flex: 1, height: `${b * 100}%`, borderRadius: 2, background: i < 38 ? "var(--teal)" : "var(--line)", opacity: i < 38 ? 0.55 + b * 0.45 : 1 }} />
        ))}
      </div>

      {/* Transcript line */}
      <div style={{ marginTop: 18, padding: "12px 14px", borderRadius: 10, background: "var(--bg-alt)", border: "1px solid var(--line-2)", fontSize: 14, lineHeight: 1.5, color: "var(--ink-2)" }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: ".12em", color: "var(--mute)", display: "block", marginBottom: 4 }}>
          ANH LE · STAKEHOLDER
        </span>
        &ldquo;I wasn&apos;t consulted on the margin cut. My team has spent eight months earning that account&apos;s trust — what am I supposed to tell them now?&rdquo;
      </div>
    </div>
  );
}
