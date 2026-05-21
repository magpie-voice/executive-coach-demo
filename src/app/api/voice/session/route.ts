import { NextResponse } from "next/server";

export async function GET() {
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!agentId) {
    return NextResponse.json(
      { error: "Agent ID not configured" },
      { status: 500 }
    );
  }

  return NextResponse.json({ agentId });
}
