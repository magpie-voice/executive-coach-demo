"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "./Wordmark";
import Icon from "./Icon";

export default function NavBar() {
  const pathname = usePathname();

  const link = (href: string, label: string) => {
    const active = pathname === href || (href === "/" && pathname === "/");
    return (
      <Link
        href={href}
        className="btn btn-ghost btn-sm"
        style={{
          color: active ? "var(--ink)" : "var(--mute)",
          background: active ? "var(--bg-alt)" : "transparent",
          fontWeight: active ? 500 : 400,
          textDecoration: "none",
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 56px",
        borderBottom: "1px solid var(--line)",
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <Wordmark />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {link("/", "Practice")}
        {link("/dashboard", "Team")}
        <span className="btn btn-ghost btn-sm" style={{ color: "var(--mute)" }}>Library</span>
        <span className="btn btn-ghost btn-sm" style={{ color: "var(--mute)" }}>Settings</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div className="pill">
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--emerald)" }} />
          Voice ready
        </div>
        <button className="btn btn-ghost btn-sm" style={{ width: 36, padding: 0, justifyContent: "center" }}>
          <Icon name="bell" size={16} />
        </button>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            background: "var(--teal)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: ".02em",
          }}
        >
          BN
        </div>
      </div>
    </div>
  );
}
