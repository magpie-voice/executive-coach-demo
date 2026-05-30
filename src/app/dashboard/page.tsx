"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import SectionHeader from "@/components/shared/SectionHeader";
import Icon from "@/components/shared/Icon";

const GMs = [
  { name: "Linh Tran", region: "Vietnam", sessions: 16, score: 3.5, last: "Today", trend: "up" as const, delta: "+0.5", tier: "gold" as const, spark: [2.5, 2.7, 2.9, 3.0, 3.1, 3.2, 3.4, 3.5] },
  { name: "Bruce Nguyen", region: "Vietnam", sessions: 14, score: 3.2, last: "Today", trend: "up" as const, delta: "+0.6", tier: "silver" as const, spark: [2.4, 2.5, 2.6, 2.6, 2.8, 2.9, 3.0, 3.2], you: true },
  { name: "Marco Santos", region: "Philippines", sessions: 12, score: 3.1, last: "Yesterday", trend: "up" as const, delta: "+0.2", tier: "silver" as const, spark: [2.7, 2.8, 2.9, 2.9, 2.9, 3.0, 3.0, 3.1] },
  { name: "Channary Sok", region: "Cambodia", sessions: 10, score: 3.0, last: "2d ago", trend: "up" as const, delta: "+0.3", tier: "silver" as const, spark: [2.5, 2.6, 2.6, 2.7, 2.8, 2.8, 2.9, 3.0] },
  { name: "Kasun Perera", region: "Sri Lanka", sessions: 9, score: 2.9, last: "3d ago", trend: "flat" as const, delta: "±0.0", tier: "bronze" as const, spark: [2.9, 2.9, 2.8, 2.9, 2.9, 2.8, 2.9, 2.9] },
  { name: "Dewi Pratiwi", region: "Indonesia", sessions: 8, score: 2.8, last: "4d ago", trend: "up" as const, delta: "+0.1", tier: "bronze" as const, spark: [2.6, 2.6, 2.7, 2.7, 2.7, 2.7, 2.8, 2.8] },
  { name: "Maria Clara Reyes", region: "Philippines", sessions: 7, score: 2.7, last: "5d ago", trend: "flat" as const, delta: "±0.0", tier: "bronze" as const, spark: [2.7, 2.7, 2.6, 2.7, 2.7, 2.6, 2.7, 2.7] },
  { name: "Nuwan Silva", region: "Sri Lanka", sessions: 5, score: 2.4, last: "8d ago", trend: "down" as const, delta: "-0.2", tier: "bronze" as const, spark: [2.6, 2.6, 2.5, 2.5, 2.5, 2.4, 2.4, 2.4] },
];

const COHORT_MEDIAN = 2.94;

export default function DashboardPage() {
  const [sort, setSort] = useState("score");
  const sorted = useMemo(() => {
    const arr = [...GMs];
    if (sort === "score") arr.sort((a, b) => b.score - a.score);
    if (sort === "sessions") arr.sort((a, b) => b.sessions - a.sessions);
    if (sort === "region") arr.sort((a, b) => a.region.localeCompare(b.region));
    return arr;
  }, [sort]);

  return (
    <>
      <NavBar />
      <div className="fade-in" style={{ padding: "40px 56px 80px" }}>
        <SectionHeader
          eyebrow="GM cohort · Kerry Travel"
          title="Leadership performance dashboard."
          sub="Eight GMs across five countries, ranked by 30-day average. Tracking ownership shifts, accountability, and commercial execution."
          right={
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary btn-sm"><Icon name="chart" size={14} /> Export</button>
              <Link href="/setup" className="btn btn-primary btn-sm" style={{ textDecoration: "none" }}>
                <Icon name="plus" size={14} /> Assign a scenario
              </Link>
            </div>
          }
        />

        {/* KPI strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          <KPI k="Active GMs" v="8" sub="of 8 enrolled" />
          <KPI k="Sessions this month" v="81" sub="+18 vs. last month" trend="up" />
          <KPI k="Cohort avg score" v="2.95" sub="median 2.90" trend="up" />
          <KPI k="At-risk practitioners" v="1" sub="last active 8d ago" trend="down" warn />
        </div>

        {/* Leaderboard */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "56px 1.6fr 1.1fr 1fr 1fr 1.4fr 1fr 1fr 40px", gap: 16, alignItems: "center", padding: "14px 28px", borderBottom: "1px solid var(--line-2)", background: "var(--bg-alt)" }}>
            <ColHd>#</ColHd>
            <ColHd onClick={() => setSort("name")}>GM</ColHd>
            <ColHd onClick={() => setSort("region")}>Region</ColHd>
            <ColHd onClick={() => setSort("sessions")} right>Sessions</ColHd>
            <ColHd onClick={() => setSort("score")} right>Avg score</ColHd>
            <ColHd>30-day trajectory</ColHd>
            <ColHd>Trend</ColHd>
            <ColHd>Last active</ColHd>
            <ColHd>&nbsp;</ColHd>
          </div>
          {sorted.map((gm, i) => (
            <GMRow key={gm.name} gm={gm} rank={i + 1} />
          ))}
        </div>

        {/* Bottom section */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginTop: 32 }}>
          <CoachQueue />
          <CohortByDimension />
        </div>
      </div>
    </>
  );
}

function ColHd({ children, onClick, right }: { children?: React.ReactNode; onClick?: () => void; right?: boolean }) {
  return (
    <div onClick={onClick} className="mono" style={{ fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--mute)", fontWeight: 500, textAlign: right ? "right" : "left", cursor: onClick ? "default" : "auto" }}>
      {children}
    </div>
  );
}

function GMRow({ gm, rank }: { gm: typeof GMs[number]; rank: number }) {
  const isYou = "you" in gm && gm.you;
  const init = gm.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  const h = [...gm.name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "56px 1.6fr 1.1fr 1fr 1fr 1.4fr 1fr 1fr 40px", gap: 16, alignItems: "center", padding: "18px 28px", borderBottom: "1px solid var(--line-2)", background: isYou ? "oklch(0.985 0.012 200)" : "transparent", position: "relative" }}>
      {isYou && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "var(--teal)" }} />}
      <div><TierBadge tier={gm.tier} rank={rank} /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: `oklch(0.82 0.05 ${h})`, color: `oklch(0.30 0.04 ${h})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600 }}>
          {init}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", display: "flex", alignItems: "center", gap: 8 }}>
            {gm.name}
            {isYou && <span className="pill" style={{ background: "var(--teal-soft)", color: "var(--teal-2)", borderColor: "transparent", height: 20, padding: "0 8px", fontSize: 11 }}>You</span>}
          </div>
          <div className="small" style={{ marginTop: 1 }}>General Manager</div>
        </div>
      </div>
      <div style={{ fontSize: 14, color: "var(--ink-2)" }}>{gm.region}</div>
      <div className="tabular" style={{ fontSize: 15, color: "var(--ink)", textAlign: "right" }}>{gm.sessions}</div>
      <div style={{ textAlign: "right" }}>
        <span className="tabular" style={{ fontSize: 18, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.01em" }}>{gm.score.toFixed(1)}</span>
        <span style={{ fontSize: 12, color: "var(--mute-2)", marginLeft: 4 }}>/4</span>
        <div style={{ fontSize: 11, color: gm.score >= COHORT_MEDIAN ? "var(--emerald)" : "oklch(0.55 0.10 30)", marginTop: 1 }}>
          {gm.score >= COHORT_MEDIAN ? "↑" : "↓"} {Math.abs(gm.score - COHORT_MEDIAN).toFixed(2)} vs median
        </div>
      </div>
      <Sparkline data={gm.spark} />
      <TrendChip trend={gm.trend} delta={gm.delta} />
      <div className="small">{gm.last}</div>
      <Icon name="chevronR" size={16} color="var(--mute-2)" />
    </div>
  );
}

function TierBadge({ tier, rank }: { tier: "gold" | "silver" | "bronze"; rank: number }) {
  const colors = {
    gold: { bg: "oklch(0.93 0.05 85)", fg: "oklch(0.45 0.08 60)", ring: "oklch(0.78 0.10 75)" },
    silver: { bg: "oklch(0.95 0.003 230)", fg: "oklch(0.40 0.01 230)", ring: "oklch(0.82 0.005 230)" },
    bronze: { bg: "oklch(0.94 0.025 50)", fg: "oklch(0.45 0.06 40)", ring: "oklch(0.78 0.06 45)" },
  };
  const c = colors[tier];
  return (
    <div style={{ width: 34, height: 34, borderRadius: 10, background: c.bg, color: c.fg, border: `1px solid ${c.ring}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>
      {rank}
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const W = 140, H = 36;
  const min = Math.min(...data) - 0.1, max = Math.max(...data) + 0.1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((d - min) / (max - min)) * H;
    return [x, y] as [number, number];
  });
  const path = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  const areaPath = `${path} L ${W} ${H} L 0 ${H} Z`;
  const trendUp = data[data.length - 1] > data[0];
  const color = trendUp ? "var(--teal)" : "oklch(0.55 0.10 30)";
  const gId = `g-${data[0]}-${data.length}`;
  return (
    <svg width={W} height={H} style={{ display: "block" }}>
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.18} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gId})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 2.5 : 0} fill={color} />
      ))}
    </svg>
  );
}

function TrendChip({ trend, delta }: { trend: "up" | "down" | "flat"; delta: string }) {
  const cfg = {
    up: { c: "var(--emerald)", bg: "oklch(0.96 0.04 160)", icon: "arrowUp" },
    down: { c: "oklch(0.55 0.12 25)", bg: "oklch(0.96 0.04 25)", icon: "arrowDown" },
    flat: { c: "var(--mute)", bg: "var(--bg-alt)", icon: "arrowRight" },
  }[trend];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, background: cfg.bg, color: cfg.c, fontSize: 12.5, fontWeight: 500, width: "fit-content" }}>
      <Icon name={cfg.icon} size={12} strokeWidth={2.2} />
      <span className="tabular">{delta}</span>
    </div>
  );
}

function KPI({ k, v, sub, trend, warn }: { k: string; v: string; sub: string; trend?: string; warn?: boolean }) {
  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--mute)" }}>{k}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
        <div className="tabular" style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", color: warn ? "oklch(0.55 0.12 25)" : "var(--ink)" }}>{v}</div>
        {trend === "up" && <Icon name="arrowUp" size={14} color="var(--emerald)" strokeWidth={2} />}
        {trend === "down" && <Icon name="arrowDown" size={14} color="oklch(0.55 0.12 25)" strokeWidth={2} />}
      </div>
      <div className="small" style={{ marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function CoachQueue() {
  const items = [
    { who: "Dewi Pratiwi", region: "Indonesia", issue: "No session in 6 days. Trend negative on last 3 runs.", cta: "Send nudge", urgent: true },
    { who: "Siriporn Jaidee", region: "Thailand", issue: "Score plateau on strategic framing — 4 sessions stuck at 2.6.", cta: "Suggest scenario", urgent: false },
    { who: "Marco Santos", region: "Philippines", issue: "Strong on listening (3.7), behind on assertiveness (2.4).", cta: "Pair with Priya", urgent: false },
  ];
  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>For your attention</div>
          <div className="h2">Coach&apos;s queue</div>
        </div>
        <button className="btn btn-ghost btn-sm">See all</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((it, i) => {
          const init = it.who.split(" ").map((n) => n[0]).slice(0, 2).join("");
          const h = [...it.who].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderTop: i ? "1px solid var(--line-2)" : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: it.urgent ? "var(--rose)" : "var(--amber)", flexShrink: 0 }} />
              <div style={{ width: 36, height: 36, borderRadius: 999, background: `oklch(0.82 0.05 ${h})`, color: `oklch(0.30 0.04 ${h})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>
                {init}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
                  {it.who} <span style={{ color: "var(--mute)", fontWeight: 400 }}>· {it.region}</span>
                </div>
                <div className="small" style={{ marginTop: 2 }}>{it.issue}</div>
              </div>
              <button className="btn btn-secondary btn-sm">{it.cta}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CohortByDimension() {
  const data = [
    { name: "Active Listening", cohort: 3.2, you: 3.4 },
    { name: "Emotional Regulation", cohort: 3.1, you: 3.6 },
    { name: "Assertiveness", cohort: 2.7, you: 2.8 },
    { name: "Perspective-Taking", cohort: 3.0, you: 3.5 },
    { name: "Strategic Framing", cohort: 2.8, you: 2.7 },
  ];
  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>By dimension</div>
      <div className="h2" style={{ marginBottom: 4 }}>You vs. cohort</div>
      <div className="small" style={{ marginBottom: 20 }}>Last 30 days · 58 sessions</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.map((d) => {
          const cPct = (d.cohort / 4) * 100;
          const yPct = (d.you / 4) * 100;
          return (
            <div key={d.name}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--ink-2)" }}>{d.name}</span>
                <span className="tabular" style={{ color: "var(--mute)" }}>
                  <span style={{ color: "var(--teal)" }}>{d.you.toFixed(1)}</span> · cohort {d.cohort.toFixed(1)}
                </span>
              </div>
              <div style={{ position: "relative", height: 10 }}>
                <div style={{ position: "absolute", inset: 0, height: 4, top: 3, background: "var(--bg-alt)", borderRadius: 999 }} />
                <div style={{ position: "absolute", height: 4, top: 3, width: `${cPct}%`, background: "oklch(0.82 0.005 230)", borderRadius: 999 }} />
                <div style={{ position: "absolute", height: 10, top: 0, width: 2, left: `calc(${yPct}% - 1px)`, background: "var(--teal)", borderRadius: 1 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
