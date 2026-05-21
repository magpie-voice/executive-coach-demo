"use client";

import { useEffect, useRef, useState } from "react";

interface ElevenLabsWidgetProps {
  agentId: string;
  dynamicVariables?: Record<string, string>;
}

export default function ElevenLabsWidget({
  agentId,
  dynamicVariables,
}: ElevenLabsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;

    const timeout = setTimeout(() => {
      if (!cancelled) setError("Widget took too long to load. Please refresh.");
    }, 15000);

    script.onload = () => {
      if (cancelled) return;
      clearTimeout(timeout);
      const widget = document.createElement("elevenlabs-convai");
      widget.setAttribute("agent-id", agentId);

      if (dynamicVariables) {
        widget.setAttribute(
          "dynamic-variables",
          JSON.stringify(dynamicVariables)
        );
      }

      container.appendChild(widget);
      setLoading(false);
    };

    script.onerror = () => {
      if (cancelled) return;
      clearTimeout(timeout);
      setError("Failed to load the voice widget.");
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      try { document.body.removeChild(script); } catch {}
      if (container) container.innerHTML = "";
    };
  }, [agentId, dynamicVariables]);

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-sm text-score-low">
        {error}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      {loading && (
        <div className="flex items-center justify-center p-8 text-sm text-text-secondary">
          Connecting to voice agent...
        </div>
      )}
    </div>
  );
}
