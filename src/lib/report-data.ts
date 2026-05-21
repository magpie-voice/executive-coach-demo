export interface Dimension {
  name: string;
  weight: number;
  score: number;
  maxScore: number;
  label: string;
  feedback: string;
}

export interface ReportData {
  overallScore: number;
  maxScore: number;
  overallLabel: string;
  dimensions: Dimension[];
  reflections: { question: string; insight: string }[];
}

export const reportData: ReportData = {
  overallScore: 3.2,
  maxScore: 4.0,
  overallLabel: "Proficient",
  dimensions: [
    {
      name: "Active Listening & Inquiry",
      weight: 20,
      score: 3,
      maxScore: 4,
      label: "Proficient",
      feedback:
        "You asked clarifying questions and paraphrased the stakeholder's position effectively. To reach advanced level, try uncovering underlying interests and motivations — not just their stated position.",
    },
    {
      name: "Emotional Regulation",
      weight: 20,
      score: 4,
      maxScore: 4,
      label: "Advanced",
      feedback:
        "Excellent composure under pressure. You named emotions explicitly and used them to de-escalate rather than react. This is executive-level emotional intelligence.",
    },
    {
      name: "Perspective-Taking & Empathy",
      weight: 20,
      score: 3,
      maxScore: 4,
      label: "Proficient",
      feedback:
        "You acknowledged the stakeholder's valid concerns and constraints. To improve, try articulating their position as well as they could themselves — find unexpected common ground.",
    },
    {
      name: "Strategic Framing & Influence",
      weight: 20,
      score: 3,
      maxScore: 4,
      label: "Proficient",
      feedback:
        "You connected the issue to shared business outcomes and showed how your proposal benefits both parties. Consider reframing the conversation around shared strategic imperatives to create new options.",
    },
    {
      name: "Boundary Setting & Assertiveness",
      weight: 20,
      score: 3,
      maxScore: 4,
      label: "Proficient",
      feedback:
        "You stated your limits clearly and respectfully. There were moments where you could have held the line more firmly — knowing when to adapt vs. when to be firm is the key to advancing here.",
    },
  ],
  reflections: [
    {
      question:
        "On a scale of 1-10, how likely is this stakeholder to support you after that conversation?",
      insight:
        "Based on the simulation, the estimated support likelihood is 7/10. You built genuine rapport and found shared ground on the timeline issue. To move it to 9, focus on offering a concrete concession that addresses their headcount concern.",
    },
    {
      question:
        "What's one thing you should practice again before the real conversation?",
      insight:
        "The transition from empathy to assertiveness. You were strong at both individually, but the pivot between acknowledging their constraints and then firmly stating your non-negotiables could be smoother.",
    },
    {
      question:
        "What did you learn about this stakeholder's motivations that you didn't see before?",
      insight:
        "The simulation revealed that the stakeholder's resistance is less about resources and more about feeling sidelined in strategic decisions. Addressing their need for visibility and influence may unlock the negotiation faster than any resource compromise.",
    },
  ],
};
