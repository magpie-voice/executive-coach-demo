"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import Wordmark from "@/components/shared/Wordmark";
import Icon from "@/components/shared/Icon";
import { AGENT_IDS, SCENARIO_META } from "@/lib/scenarios";

type Line = { role: "agent" | "user"; text: string };

export default function SimulationPage() {
  return (
    <ConversationProvider>
      <Suspense fallback={<div style={{ padding: 56 }}>Loading…</div>}>
        <SimulationContent />
      </Suspense>
    </ConversationProvider>
  );
}

function SimulationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get("scenario") || "stakeholder";
  const meta = SCENARIO_META[scenarioId] || SCENARIO_META["stakeholder"];
  const agentId = AGENT_IDS[scenarioId] || AGENT_IDS["stakeholder"];

  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [transcript, setTranscript] = useState<Line[]>([]);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onMessage: (message: { source: string; message: string }) => {
      if (message.source === "ai") {
        setTranscript((prev) => [...prev, { role: "agent", text: message.message }]);
      } else if (message.source === "user") {
        setTranscript((prev) => [...prev, { role: "user", text: message.message }]);
      }
    },
    onError: (error: unknown) => {
      console.error("ElevenLabs error:", error);
    },
    onDisconnect: () => {
      console.warn("ElevenLabs disconnected");
    },
  });

  const status = conversation.status;
  const isConnected = status === "connected";
  const isConnecting = status === "connecting";
  const isSpeaking = conversation.isSpeaking;
  const isMuted = conversation.isMuted;

  useEffect(() => {
    if (!isConnected) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isConnected]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  async function startConversation() {
    setTranscript([]);
    setPermissionError(null);
    setStarted(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setPermissionError("Microphone access is needed. Please allow mic permission and try again.");
      setStarted(false);
      return;
    }
    try {
      await conversation.startSession({ agentId, connectionType: "webrtc" });
    } catch (e) {
      console.error("Failed to start session:", e);
      setPermissionError("Couldn't connect to the agent. Please try again.");
      setStarted(false);
    }
  }

  async function endConversation() {
    await conversation.endSession();
    router.push("/report");
  }

  const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const agentState = !started ? "idle" : isConnecting ? "thinking" : isSpeaking ? "speaking" : "listening";

  // Extract scenario label and counterpart first name for display
  const counterpartFirst = meta.counterpartName.split(" ")[0] + " " + meta.counterpartName.split(" ").slice(1).join(" ");
  const eyebrowParts = meta.eyebrow.split(" · ");
  const scenarioLabel = eyebrowParts.length > 1 ? eyebrowParts.slice(1).join(" · ") : meta.eyebrow;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(1200px 600px at 50% 35%, oklch(0.96 0.02 200), var(--bg) 70%)",
        display: "flex",
        flexDirection: "column",
      }}
      className="fade-in"
    >
      {/* Minimal header */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--line)", padding: "16px 56px" }}>
        <Wordmark />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 56px 48px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="pill" style={{ background: "#fff", height: 30, padding: "0 14px" }}>
            {isConnected && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "var(--rose)",
                  animation: "recPulse 1.4s ease-in-out infinite",
                }}
              />
            )}
            <span className="mono tabular" style={{ fontSize: 12, color: "var(--ink)", letterSpacing: ".08em" }}>
              {isConnected ? `REC · ${mmss(seconds)}` : started ? "CONNECTING…" : "READY"}
            </span>
          </div>
          <div className="small" style={{ color: "var(--mute)" }}>
            Scenario · <span style={{ color: "var(--ink-2)" }}>{scenarioLabel}</span> · with{" "}
            <span style={{ color: "var(--ink-2)" }}>{meta.counterpartName}</span>
          </div>
          <div style={{ width: 140 }} />
        </div>

        {/* Center — orb + state + transcript */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, padding: "20px 0" }}>
          <Orb state={agentState} />
          <div style={{ textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--mute)", marginBottom: 10 }}>
              {agentState === "speaking"
                ? `${meta.counterpartName.toUpperCase()} · SPEAKING`
                : agentState === "listening"
                ? "LISTENING · YOUR TURN"
                : agentState === "thinking"
                ? "CONNECTING"
                : "READY TO BEGIN"}
            </div>
            {agentState === "idle" && (
              <button className="btn btn-primary btn-lg" onClick={startConversation} disabled={isConnecting}>
                <Icon name="mic" size={16} /> Start conversation
              </button>
            )}
            {agentState === "thinking" && (
              <div style={{ fontSize: 18, color: "var(--mute)" }}>Connecting to {meta.counterpartName}…</div>
            )}
            {permissionError && (
              <div style={{ marginTop: 16, fontSize: 14, color: "var(--rose)" }}>{permissionError}</div>
            )}
          </div>
        </div>

        {/* Bottom — transcript bubbles + controls */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          {transcript.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 720, maxWidth: "100%", maxHeight: 220, overflowY: "auto" }}>
              {transcript.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: line.role === "user" ? "oklch(0.97 0.012 230)" : "#fff",
                    border: "1px solid var(--line-2)",
                  }}
                >
                  <span className="mono" style={{ fontSize: 10, letterSpacing: ".12em", color: "var(--mute-2)", minWidth: 70, textTransform: "uppercase", paddingTop: 3 }}>
                    {line.role === "user" ? "You" : meta.counterpartName}
                  </span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-2)" }}>{line.text}</span>
                </div>
              ))}
              <div ref={transcriptEndRef} />
            </div>
          )}

          {isConnected && (
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <CircleBtn
                icon={isMuted ? "mic" : "mic"}
                active={!isMuted}
                label={isMuted ? "Unmute" : "Mute"}
                onClick={() => conversation.setMuted(!isMuted)}
                muted={isMuted}
              />
              <button
                className="btn btn-primary"
                onClick={() => setConfirmEnd(true)}
                style={{ background: "var(--rose)", borderColor: "var(--rose)", padding: "10px 24px" }}
              >
                <Icon name="stop" size={14} /> End call
              </button>
            </div>
          )}
        </div>
      </div>

      {/* End confirm modal */}
      {confirmEnd && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,28,36,.32)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            backdropFilter: "blur(4px)",
          }}
          className="fade-in"
        >
          <div className="card" style={{ width: 440, padding: 28, boxShadow: "var(--shadow-3)" }}>
            <div className="h2">End this simulation?</div>
            <p className="body-text" style={{ marginTop: 8 }}>
              You&apos;ve been talking for <span className="tabular" style={{ color: "var(--ink)" }}>{mmss(seconds)}</span>. Ending now will generate a partial debrief.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
              <button className="btn btn-secondary" onClick={() => setConfirmEnd(false)}>Keep going</button>
              <button className="btn btn-primary" onClick={endConversation}>End & see debrief</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Orb({ state }: { state: "idle" | "speaking" | "listening" | "thinking" }) {
  const isSpeaking = state === "speaking";
  const isThinking = state === "thinking";
  return (
    <div style={{ position: "relative", width: 320, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 320 - i * 36,
            height: 320 - i * 36,
            borderRadius: 999,
            border: `1px solid oklch(0.40 0.07 200 / ${0.08 + i * 0.03})`,
            animation: isSpeaking ? `orbRing 3.2s ease-out infinite ${i * 0.8}s` : "none",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: 999,
          background: "radial-gradient(circle, oklch(0.60 0.10 200 / 0.18), transparent 65%)",
          filter: "blur(8px)",
          transform: isSpeaking ? "scale(1.05)" : "scale(1)",
          transition: "transform 1s ease",
        }}
      />
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 999,
          position: "relative",
          background: "radial-gradient(circle at 32% 28%, oklch(0.70 0.08 200) 0%, oklch(0.42 0.07 200) 55%, oklch(0.30 0.06 200) 100%)",
          boxShadow: "0 30px 80px -20px oklch(0.30 0.07 200 / 0.5), inset 0 2px 0 rgba(255,255,255,.18), inset 0 -20px 40px oklch(0.20 0.05 200 / 0.4)",
          animation: isSpeaking ? "orbBreathe 1.4s ease-in-out infinite" : isThinking ? "orbThink 0.9s ease-in-out infinite" : "orbIdle 4s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 16,
            borderRadius: 999,
            background: "radial-gradient(circle at 60% 70%, oklch(0.55 0.09 200 / 0.6), transparent 50%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}

function CircleBtn({ icon, label, active = true, onClick, muted }: { icon: string; label: string; active?: boolean; onClick?: () => void; muted?: boolean }) {
  return (
    <div onClick={onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 999,
          background: muted ? "oklch(0.92 0.005 230)" : "#fff",
          border: `1px solid ${muted ? "var(--rose)" : "var(--line)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: muted ? "var(--rose)" : "var(--ink)",
          boxShadow: "var(--shadow-1)",
          transition: "all .15s",
        }}
      >
        <Icon name={icon} size={18} />
      </div>
      <span className="mono" style={{ fontSize: 10, letterSpacing: ".08em", color: muted ? "var(--rose)" : "var(--mute)", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}
