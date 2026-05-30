export const AGENT_IDS: Record<string, string> = {
  "stakeholder": process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_3901ks4qyqvtf0jtcmzg1wsxp02y",
  "team-conflict": "agent_8401ksxevzw3fe9sq64cnd78vr3z",
  "reactive-leadership": "agent_6401ksxewerbey2aqjmez6psb188",
  "difficult-conversations": "agent_1101ksxewyz9fs99zwwefn85k6t1",
};

export type ScenarioId = keyof typeof AGENT_IDS;

export const SCENARIO_META: Record<string, {
  title: string;
  eyebrow: string;
  counterpartName: string;
  counterpartRole: string;
  disposition: string;
  leverage: string;
  opener: string;
  prefill: { q1: string; q2: string; q3: string };
  questions: { id: string; label: string; prompt: string; hint: string; placeholder: string; icon: string }[];
}> = {
  "stakeholder": {
    title: "Managing high-pressure stakeholder conflict.",
    eyebrow: "Scenario · Stakeholder conflict",
    counterpartName: "Anh Le",
    counterpartRole: "VP, Channel Partners · Vietnam",
    disposition: "Guarded · feels excluded",
    leverage: "Account relationship, regional revenue",
    opener: '"I need to understand how this decision was made."',
    prefill: {
      q1: "Anh Le, VP of Channel Partners for Vietnam. She owns our largest regional account and the decision I made cuts her account's margin by 4 points the quarter she promised them an exclusivity extension.",
      q2: "I approved a regional pricing change without looping her in, and now she feels her authority over the account has been undermined.",
      q3: "For me: she stays bought-in to the change and we agree on a joint message to the account.\nFor her: a real role in shaping the rollout, and a commitment that this doesn't happen again.",
    },
    questions: [
      { id: "q1", icon: "user", label: "The stakeholder", prompt: "Tell me about the stakeholder — their role, and what's at stake for them.", hint: "Title, region, what they'll lose or gain.", placeholder: "e.g. Anh Le, VP of Channel Partners for Vietnam…" },
      { id: "q2", icon: "flame", label: "The conflict", prompt: "What's the core issue driving this conflict?", hint: "One sentence. The thing you wish wasn't true.", placeholder: "e.g. I approved a regional pricing change without looping her in…" },
      { id: "q3", icon: "target", label: "A win", prompt: "What outcome would you consider a win?", hint: "Two answers — yours and theirs.", placeholder: "For me: …\nFor her: …" },
    ],
  },
  "team-conflict": {
    title: "Resolving a team conflict between two strong performers.",
    eyebrow: "Scenario · Team conflict",
    counterpartName: "Raj Menon",
    counterpartRole: "Sales Manager",
    disposition: "Frustrated · territorial",
    leverage: "Strong commercial results, key account relationships",
    opener: '"I have been raising this for weeks and nothing has changed."',
    prefill: {
      q1: "Raj Menon, Sales Manager. He is in open conflict with Sarah, the PAM lead, over territory ownership. Both are strong performers but the tension is affecting the whole team.",
      q2: "Sarah has been stepping into Raj's accounts and presenting directly to agents he built relationships with. Territory boundaries are unclear and I haven't resolved it.",
      q3: "For me: a clear territory structure both can live with and the tension stops.\nFor Raj: his key accounts are protected and he feels heard.",
    },
    questions: [
      { id: "q1", icon: "user", label: "The team member", prompt: "Tell me about the person you're meeting — their role and the conflict.", hint: "Who are they, and who are they in conflict with?", placeholder: "e.g. Raj Menon, Sales Manager, in conflict with the PAM lead…" },
      { id: "q2", icon: "flame", label: "The tension", prompt: "What's the core issue driving the conflict?", hint: "What's really going on beneath the surface?", placeholder: "e.g. Territory boundaries are unclear and both feel undermined…" },
      { id: "q3", icon: "target", label: "A resolution", prompt: "What would a good outcome look like?", hint: "For you and for them.", placeholder: "For me: …\nFor them: …" },
    ],
  },
  "reactive-leadership": {
    title: "Receiving feedback on reactive leadership habits.",
    eyebrow: "Scenario · Reactive leadership",
    counterpartName: "Karen Walsh",
    counterpartRole: "Regional Director",
    disposition: "Supportive but firm · this isn't new feedback",
    leverage: "Oversight of five country GMs, escalation reports from your team",
    opener: '"Your commercial results are strong — but I need to talk about what is underneath them."',
    prefill: {
      q1: "Karen Walsh, Regional Director who oversees five country GMs including me. She's calm and supportive but direct. This is not the first time she's raised concerns about my leadership style.",
      q2: "I'm too involved in day-to-day operations. My team can't make decisions without me signing off, and it's slowing the business down.",
      q3: "For me: leave with a clear picture of what to change and not feel attacked.\nFor Karen: a concrete commitment to a specific ownership shift in the next 30 days.",
    },
    questions: [
      { id: "q1", icon: "user", label: "The feedback giver", prompt: "Who is giving you this feedback and what's their relationship to you?", hint: "Their role, how long they've observed you.", placeholder: "e.g. Karen Walsh, Regional Director, oversees five country GMs…" },
      { id: "q2", icon: "flame", label: "The pattern", prompt: "What's the leadership habit they're concerned about?", hint: "Be honest about the pattern, not just one incident.", placeholder: "e.g. I'm too involved in operations, my team can't decide without me…" },
      { id: "q3", icon: "target", label: "The shift", prompt: "What would genuine change look like?", hint: "What would you stop doing, and what would you hand over?", placeholder: "For me: …\nFor them: …" },
    ],
  },
  "difficult-conversations": {
    title: "Having a tough performance conversation with a loyal team member.",
    eyebrow: "Scenario · Difficult conversations",
    counterpartName: "David Chen",
    counterpartRole: "Operations Manager · 6 years tenure",
    disposition: "Defensive · feels underappreciated",
    leverage: "Institutional knowledge, team loyalty, covering a vacant role",
    opener: '"I have a feeling I know what this meeting is about."',
    prefill: {
      q1: "David Chen, Operations Manager with six years at the company. He's loyal and hardworking but his performance has dropped — turnaround times slipped 15% last quarter. His best coordinator left and hasn't been replaced.",
      q2: "His results are slipping but he's also covering a vacant role. I need to hold him accountable without losing him — he's too valuable and too tired.",
      q3: "For me: honest acknowledgment of the performance gap and a plan to close it.\nFor David: recognition of what he's carrying and a commitment to replace the coordinator.",
    },
    questions: [
      { id: "q1", icon: "user", label: "The team member", prompt: "Tell me about the person — their role, tenure, and what's changed.", hint: "How long have they been with you? What shifted?", placeholder: "e.g. David Chen, Ops Manager, 6 years, performance has slipped…" },
      { id: "q2", icon: "flame", label: "The gap", prompt: "What's the core performance issue?", hint: "Be specific about what's slipping and why.", placeholder: "e.g. Turnaround times are down 15%, his best coordinator left…" },
      { id: "q3", icon: "target", label: "The outcome", prompt: "What does a good conversation look like?", hint: "Accountability AND support.", placeholder: "For me: …\nFor them: …" },
    ],
  },
};
