"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import SectionHeader from "@/components/shared/SectionHeader";
import Icon from "@/components/shared/Icon";

const DIMENSIONS = [
  { id: "listen", name: "Active Listening & Inquiry", weight: 20, score: 3.4, label: "Strong", icon: "ear",
    note: 'You asked two clarifying questions before defending the decision — and one of them ("what would help you bring this back to your team?") reframed the conversation.' },
  { id: "regulate", name: "Emotional Regulation", weight: 20, score: 3.6, label: "Strong", icon: "heart",
    note: "You held composure when Anh said your decision had \"undermined her authority.\" A short pause before responding bought you the moment you needed." },
  { id: "assert", name: "Boundary Setting & Assertiveness", weight: 20, score: 2.8, label: "Developing", icon: "shield",
    note: "You twice softened the commercial rationale. The change is happening — owning that earlier would have shortened the conflict, not extended it." },
  { id: "empathy", name: "Perspective-Taking & Empathy", weight: 20, score: 3.5, label: "Strong", icon: "eye",
    note: "Naming what was at stake for her team — not just for her — visibly shifted her tone around the 6-minute mark." },
  { id: "frame", name: "Strategic Framing & Influence", weight: 20, score: 2.7, label: "Developing", icon: "compass",
    note: "You led with what changed. Leading with why the change protects the relationship long-term would have given her something to bring back." },
];

const OVERALL = DIMENSIONS.reduce((a, d) => a + d.score, 0) / DIMENSIONS.length;

const REFLECTIONS = [
  { q: "Where in the conversation did you feel most reactive — and what was the trigger?",
    a: 'You moved fastest to defend yourself right after Anh used the word "undermined." The simulator detected a 1.8s gap, then a justification. That\'s the place to practice a different opener.' },
  { q: "What did Anh actually need from you — beyond the answer to her question?",
    a: "Recognition that the way she found out was the deeper injury. You acknowledged it once, briefly, at minute 1. Returning to it later — unprompted — would have moved her further than the commercial argument did." },
  { q: "If you ran this again, what is the one move you would change?",
    a: 'Front-load the apology and the boundary in the same breath. "I should have told you first, and the decision still stands — here\'s why I\'ll back it with you." You arrived at this around minute 9; getting there at minute 2 changes the rest.' },
];

export default function ReportPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const pct = (OVERALL / 4) * 100;
  const C = 2 * Math.PI * 78;
  const dash = (pct / 100) * C;

  return (
    <>
      <NavBar />
      <div className="fade-in" style={{ padding: "40px 56px 80px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <Link href="/" className="btn btn-ghost btn-sm" style={{ marginBottom: 14, paddingLeft: 4, textDecoration: "none" }}>
              <Icon name="arrowLeft" size={14} /> Back to scenarios
            </Link>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Session debrief · May 21, 2026 · 14 min 32 sec</div>
            <h1 className="h1" style={{ margin: 0 }}>Stakeholder conflict with Anh Le.</h1>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary"><Icon name="book" size={15} /> Save to library</button>
            <button className="btn btn-secondary"><Icon name="play" size={14} /> Replay audio</button>
          </div>
        </div>

        {/* Score + Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 24, marginBottom: 32 }}>
          {/* Score card */}
          <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div className="eyebrow">Overall</div>
            <div style={{ position: "relative", width: 200, height: 200, marginTop: 6 }}>
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="78" stroke="var(--line)" strokeWidth="10" fill="none" />
                <circle cx="100" cy="100" r="78" stroke="var(--teal)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${C}`} transform="rotate(-90 100 100)" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="tabular" style={{ fontSize: 56, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--ink)" }}>
                  {OVERALL.toFixed(1)}
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".12em", marginTop: 4 }}>/ 4.00</div>
              </div>
            </div>
            <div style={{ marginTop: 8, padding: "6px 14px", borderRadius: 999, background: "var(--teal-soft)", color: "var(--teal-2)", fontSize: 14, fontWeight: 500 }}>
              Proficient
            </div>
            <div className="small" style={{ textAlign: "center", marginTop: 4, maxWidth: 260 }}>
              Above the GM cohort median (2.9) and a +0.4 lift on your last stakeholder run.
            </div>
          </div>

          {/* Summary card */}
          <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div className="eyebrow">What worked</div>
              <p style={{ marginTop: 8, marginBottom: 0, fontSize: 17, lineHeight: 1.55, color: "var(--ink)", letterSpacing: "-0.005em" }}>
                You stayed in the conversation under direct emotional pressure, and you named what was at stake for her team before you defended the decision. That&apos;s the move that turned the room.
              </p>
            </div>
            <div style={{ height: 1, background: "var(--line-2)" }} />
            <div>
              <div className="eyebrow" style={{ color: "oklch(0.55 0.10 30)" }}>What to work on</div>
              <p style={{ marginTop: 8, marginBottom: 0, fontSize: 17, lineHeight: 1.55, color: "var(--ink)", letterSpacing: "-0.005em" }}>
                Boundary-setting and strategic framing both dipped into the developing range. You arrived at a clean position — but you arrived late. The next rep is about getting there in minute two, not minute nine.
              </p>
            </div>
            <div style={{ display: "flex", gap: 18, marginTop: 6, paddingTop: 14, borderTop: "1px solid var(--line-2)" }}>
              <Mini k="Turns taken" v="14" />
              <Mini k="Avg response" v="7.2s" />
              <Mini k="Longest pause" v="3.1s" />
              <Mini k="Words per minute" v="142" />
              <Mini k="Counterpart's tone shift" v="+0.8" trend="up" />
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>The five dimensions</div>
              <div className="h2">How you scored, dimension by dimension</div>
            </div>
            <div className="small">Click a dimension to see the coach&apos;s note.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {DIMENSIONS.map((d, i) => (
              <DimensionRow key={d.id} d={d} first={i === 0} open={openId === d.id} onToggle={() => setOpenId(openId === d.id ? null : d.id)} />
            ))}
          </div>
        </div>

        {/* Reflections */}
        <div style={{ marginTop: 40 }}>
          <SectionHeader
            eyebrow="Three reflections"
            title="Things to sit with."
            sub="These aren't grades — they're the questions your coach would ask if you'd run this together."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {REFLECTIONS.map((r, i) => (
              <ReflectionCard key={i} idx={i} r={r} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 56,
            padding: "32px 36px",
            background: "linear-gradient(180deg, var(--teal-soft), #fff 80%)",
            border: "1px solid oklch(0.86 0.030 200)",
            borderRadius: "var(--radius-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div>
            <div className="h2">Run it again with one variable changed.</div>
            <div className="body-text" style={{ marginTop: 6 }}>
              Same stakeholder, this time she opens by asking you to reverse the decision entirely. See how your moves hold.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/dashboard" className="btn btn-secondary" style={{ textDecoration: "none" }}>View dashboard</Link>
            <Link href="/setup" className="btn btn-primary btn-lg" style={{ textDecoration: "none" }}>
              <Icon name="refresh" size={15} /> Practice again
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function Mini({ k, v, trend }: { k: string; v: string; trend?: string }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".12em", color: "var(--mute-2)", textTransform: "uppercase" }}>{k}</div>
      <div className="tabular" style={{ fontSize: 18, color: "var(--ink)", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
        {v}
        {trend === "up" && <Icon name="arrowUp" size={14} color="var(--emerald)" strokeWidth={2} />}
      </div>
    </div>
  );
}

function DimensionRow({ d, first, open, onToggle }: { d: typeof DIMENSIONS[number]; first: boolean; open: boolean; onToggle: () => void }) {
  const pct = (d.score / 4) * 100;
  const tone = d.score >= 3.2 ? "strong" : d.score >= 2.5 ? "dev" : "low";
  const toneColor = tone === "strong" ? "var(--emerald)" : tone === "dev" ? "var(--amber)" : "var(--rose)";
  return (
    <div style={{ borderTop: first ? "none" : "1px solid var(--line-2)" }}>
      <div
        onClick={onToggle}
        style={{
          display: "grid",
          gridTemplateColumns: "36px 1.3fr 1fr 90px 90px 24px",
          gap: 24,
          alignItems: "center",
          padding: "22px 4px",
          cursor: "default",
        }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--bg-alt)", color: "var(--ink-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={d.icon} size={17} />
        </div>
        <div>
          <div className="h3" style={{ fontSize: 16 }}>{d.name}</div>
          <div className="small" style={{ marginTop: 2 }}>Weight · {d.weight}%</div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ height: 8, borderRadius: 999, background: "var(--bg-alt)", overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: toneColor, borderRadius: 999, transition: "width .6s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className="mono" style={{ fontSize: 10, color: "var(--mute-2)" }}>{n}</span>
            ))}
          </div>
        </div>
        <div className="tabular" style={{ fontSize: 22, letterSpacing: "-0.015em", color: "var(--ink)" }}>
          {d.score.toFixed(1)} <span style={{ fontSize: 13, color: "var(--mute-2)" }}>/4</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, color: toneColor }}>{d.label}</div>
        <Icon name={open ? "chevronD" : "chevronR"} size={16} color="var(--mute)" />
      </div>
      {open && (
        <div className="fade-up" style={{ padding: "6px 4px 22px", paddingLeft: 60, maxWidth: 880 }}>
          <div style={{ padding: "16px 20px", borderRadius: 10, background: "var(--bg-alt)", borderLeft: `3px solid ${toneColor}`, fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)" }}>
            {d.note}
          </div>
        </div>
      )}
    </div>
  );
}

function ReflectionCard({ idx, r }: { idx: number; r: typeof REFLECTIONS[number] }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="card" style={{ padding: "22px 28px" }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "flex-start", gap: 16, cursor: "default" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".12em", minWidth: 28, paddingTop: 5 }}>
          0{idx + 1}
        </div>
        <div style={{ flex: 1 }}>
          <div className="h3" style={{ fontSize: 17, color: "var(--ink)" }}>{r.q}</div>
          {open && (
            <div className="fade-up" style={{ marginTop: 12, display: "flex", gap: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: "var(--teal-soft)", color: "var(--teal-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <Icon name="sparkles2" size={14} />
              </div>
              <div style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-2)", paddingTop: 4 }}>{r.a}</div>
            </div>
          )}
        </div>
        <Icon name={open ? "chevronD" : "chevronR"} size={16} color="var(--mute)" style={{ marginTop: 6 }} />
      </div>
    </div>
  );
}
