export const scenarios = [
  {
    id: "stakeholder-conflict",
    title: "High-Pressure Stakeholder Conflict",
    description:
      "Practice navigating a tense conversation with a peer executive who's blocking your initiative, challenging your authority, or competing for resources.",
    active: true,
    icon: "🎯",
  },
  {
    id: "performance-accountability",
    title: "Performance & Accountability",
    description:
      "Simulate addressing a team member or function that's missed critical goals. Balance empathy with accountability.",
    active: false,
    icon: "📊",
  },
  {
    id: "budget-negotiation",
    title: "Budget & Resource Negotiations",
    description:
      "Rehearse asking functional leaders to cut budgets, reallocate headcount, or deprioritize their initiatives.",
    active: false,
    icon: "💰",
  },
] as const;

export const setupQuestions = [
  {
    id: "stakeholder",
    label: "About the Stakeholder",
    question:
      "Tell me about the stakeholder you're in conflict with. What's their role, and what's at stake for them?",
    placeholder:
      "e.g., VP of Engineering who controls the platform team. They're worried about losing headcount to my initiative...",
  },
  {
    id: "core-issue",
    label: "Core Issue",
    question:
      "What's the core issue driving this conflict — is it about resources, priorities, authority, or something else?",
    placeholder:
      "e.g., We both need the same data engineering team for Q3, and neither of us wants to deprioritize our roadmap...",
  },
  {
    id: "desired-outcome",
    label: "Desired Outcome",
    question:
      "What outcome would you consider a win? What about from their perspective?",
    placeholder:
      "e.g., I'd consider it a win if we get 60% of the shared team's capacity. From their perspective, they need at least...",
  },
] as const;
