"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import Icon from "@/components/shared/Icon";
import { SCENARIO_META } from "@/lib/scenarios";

function SetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get("scenario") || "stakeholder";
  const meta = SCENARIO_META[scenarioId] || SCENARIO_META["stakeholder"];

  const [answers, setAnswers] = useState<Record<string, string>>(meta.prefill);
  const [active, setActive] = useState("q1");

  const questions = meta.questions;
  const filled = questions.filter((q) => (answers[q.id] || "").trim().length > 12).length;
  const canStart = filled === questions.length;
  const ready = (answers.q1 || "").trim().length > 12;

  return (
    <>
      <NavBar />
      <div className="fade-in" style={{ padding: "40px 56px 80px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 48, alignItems: "flex-start" }}>
        {/* Left — form */}
        <div>
          <Link href="/" className="btn btn-ghost btn-sm" style={{ marginBottom: 18, paddingLeft: 4, textDecoration: "none" }}>
            <Icon name="arrowLeft" size={14} /> Back to scenarios
          </Link>
          <div className="eyebrow" style={{ marginBottom: 12 }}>{meta.eyebrow}</div>
          <h1 className="h1" style={{ margin: 0 }}>{meta.title}</h1>
          <p className="body-text" style={{ marginTop: 14, maxWidth: 620 }}>
            Three short questions to seed your counterpart. Write the way you&apos;d brief a colleague over coffee — fragments are fine. You can be as honest as you&apos;d like; nothing is shared with your team.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
            {questions.map((q, idx) => {
              const qId = q.id;
              const isFilled = (answers[qId] || "").trim().length > 12;
              const isActive = active === qId;
              return (
                <div
                  key={qId}
                  className="card"
                  style={{
                    padding: "24px 28px",
                    borderColor: isActive ? "oklch(0.78 0.04 200)" : "var(--line)",
                    boxShadow: isActive ? "0 0 0 4px oklch(0.40 0.060 200 / 0.07)" : "var(--shadow-1)",
                    transition: "all .2s ease",
                  }}
                >
                  <div style={{ display: "flex", gap: 18 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        flexShrink: 0,
                        background: isFilled ? "var(--teal)" : "var(--bg-alt)",
                        color: isFilled ? "#fff" : "var(--ink-2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isFilled ? <Icon name="check" size={18} /> : <Icon name={q.icon} size={18} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 2 }}>
                        <span className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".1em" }}>
                          Q{String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="small" style={{ color: "var(--mute)" }}>{q.label}</span>
                      </div>
                      <div className="h3" style={{ marginBottom: 4 }}>{q.prompt}</div>
                      <div className="small" style={{ marginBottom: 14 }}>{q.hint}</div>
                      <textarea
                        className="textarea"
                        placeholder={q.placeholder}
                        value={answers[qId] || ""}
                        onFocus={() => setActive(qId)}
                        onChange={(e) => setAnswers({ ...answers, [qId]: e.target.value })}
                        style={{ minHeight: qId === "q3" ? 130 : 100 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
            <div className="small">
              {filled}/{questions.length} answered · <span style={{ color: "var(--mute-2)" }}>autosaved 2s ago</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/" className="btn btn-secondary" style={{ textDecoration: "none" }}>Save draft</Link>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => canStart && router.push(`/simulation?scenario=${scenarioId}`)}
                style={{
                  opacity: canStart ? 1 : 0.55,
                  pointerEvents: canStart ? "auto" : "none",
                }}
              >
                Begin simulation <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right — counterpart preview */}
        <div style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "20px 22px 18px", borderBottom: "1px solid var(--line-2)" }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Your counterpart</div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    background: "linear-gradient(135deg, oklch(0.85 0.04 180), oklch(0.72 0.06 220))",
                    border: "1px solid var(--line)",
                  }}
                />
                <div>
                  <div className="h3">{ready ? meta.counterpartName : "—"}</div>
                  <div className="small">{ready ? meta.counterpartRole : "Seeded from your answers"}</div>
                </div>
              </div>
            </div>
            <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
              <PreviewRow k="Disposition" v={ready ? meta.disposition : "—"} tone={ready ? "amber" : "mute"} />
              <PreviewRow k="Leverage" v={ready ? meta.leverage : "—"} />
              <PreviewRow k="Likely opener" v={ready ? meta.opener : "—"} italic />
              <PreviewRow k="Voice" v="Calm, formal, accented English" />
            </div>
          </div>

          <div className="card" style={{ padding: 18, background: "var(--teal-soft)", borderColor: "transparent", display: "flex", gap: 12 }}>
            <Icon name="shield" size={18} color="var(--teal-2)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div className="h3" style={{ fontSize: 14, color: "var(--teal-2)", marginBottom: 2 }}>Private by default</div>
              <div className="small" style={{ color: "oklch(0.40 0.04 200)" }}>
                Audio is processed in-region and discarded after your debrief unless you choose to save.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={<div style={{ padding: 56 }}>Loading…</div>}>
      <SetupContent />
    </Suspense>
  );
}

function PreviewRow({ k, v, tone, italic }: { k: string; v: string; tone?: string; italic?: boolean }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--mute-2)", marginBottom: 4 }}>
        {k}
      </div>
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          color: tone === "amber" ? "oklch(0.50 0.10 65)" : tone === "mute" ? "var(--mute-2)" : "var(--ink-2)",
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {v}
      </div>
    </div>
  );
}
