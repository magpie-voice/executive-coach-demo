"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import Icon from "@/components/shared/Icon";

const QUESTIONS = [
  {
    id: "q1",
    icon: "user",
    label: "The stakeholder",
    prompt: "Tell me about the stakeholder — their role, and what's at stake for them.",
    hint: "Title, region, what they'll lose or gain. The more specific, the harder the simulation pushes back.",
    placeholder:
      "e.g. Anh Le, VP of Channel Partners for Vietnam. The decision cuts her largest account's margin by 4 points the quarter she promised them an exclusivity extension…",
  },
  {
    id: "q2",
    icon: "flame",
    label: "The conflict",
    prompt: "What's the core issue driving this conflict?",
    hint: "One sentence. The thing you wish wasn't true.",
    placeholder:
      "e.g. I approved a regional pricing change without looping her in, and now she feels her authority over the account has been undermined.",
  },
  {
    id: "q3",
    icon: "target",
    label: "A win",
    prompt: "What outcome would you consider a win? What about from their perspective?",
    hint: "Two answers — yours and theirs. The simulation will pressure-test both.",
    placeholder:
      "For me: she stays bought-in to the change and we agree on a joint message to the account.\nFor her: a real role in shaping the rollout, and a commitment that this doesn't happen again…",
  },
];

export default function SetupPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: "Anh Le, VP of Channel Partners for Vietnam. She owns our largest regional account and the decision I made cuts her account's margin by 4 points the quarter she promised them an exclusivity extension.",
    q2: "I approved a regional pricing change without looping her in, and now she feels her authority over the account has been undermined.",
    q3: "For me: she stays bought-in to the change and we agree on a joint message to the account.\nFor her: a real role in shaping the rollout, and a commitment that this doesn't happen again.",
  });
  const [active, setActive] = useState("q1");

  const filled = QUESTIONS.filter((q) => (answers[q.id] || "").trim().length > 12).length;
  const canStart = filled === QUESTIONS.length;

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
          <div className="eyebrow" style={{ marginBottom: 12 }}>Scenario · 01 of 03 · Stakeholder conflict</div>
          <h1 className="h1" style={{ margin: 0 }}>Managing high-pressure stakeholder conflict.</h1>
          <p className="body-text" style={{ marginTop: 14, maxWidth: 620 }}>
            Three short questions to seed your counterpart. Write the way you&apos;d brief a colleague over coffee — fragments are fine. You can be as honest as you&apos;d like; nothing is shared with your team.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
            {QUESTIONS.map((q, idx) => {
              const isFilled = (answers[q.id] || "").trim().length > 12;
              const isActive = active === q.id;
              return (
                <div
                  key={q.id}
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
                        value={answers[q.id] || ""}
                        onFocus={() => setActive(q.id)}
                        onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                        style={{ minHeight: q.id === "q3" ? 130 : 100 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
            <div className="small">
              {filled}/3 answered · <span style={{ color: "var(--mute-2)" }}>autosaved 2s ago</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/" className="btn btn-secondary" style={{ textDecoration: "none" }}>Save draft</Link>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => canStart && router.push("/simulation")}
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
                  <div className="h3">{ready ? "Anh Le" : "—"}</div>
                  <div className="small">{ready ? "VP, Channel Partners · Vietnam" : "Seeded from your answers"}</div>
                </div>
              </div>
            </div>
            <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
              <PreviewRow k="Disposition" v={ready ? "Guarded · feels excluded" : "—"} tone={ready ? "amber" : "mute"} />
              <PreviewRow k="Leverage" v={ready ? "Account relationship, regional revenue" : "—"} />
              <PreviewRow k="Likely opener" v={ready ? '"I need to understand how this decision was made."' : "—"} italic />
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
