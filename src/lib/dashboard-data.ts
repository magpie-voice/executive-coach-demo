export interface GMData {
  id: string;
  name: string;
  region: string;
  country: string;
  sessions: number;
  avgScore: number;
  maxScore: number;
  lastActive: string;
  trend: "up" | "down" | "stable";
  recentScores: number[];
}

export const dashboardData: GMData[] = [
  {
    id: "gm-1",
    name: "Nguyen Minh Duc",
    region: "APAC",
    country: "Vietnam",
    sessions: 12,
    avgScore: 3.6,
    maxScore: 4.0,
    lastActive: "2 hours ago",
    trend: "up",
    recentScores: [2.8, 3.0, 3.2, 3.4, 3.6],
  },
  {
    id: "gm-2",
    name: "Maria Santos Cruz",
    region: "APAC",
    country: "Philippines",
    sessions: 8,
    avgScore: 3.1,
    maxScore: 4.0,
    lastActive: "1 day ago",
    trend: "up",
    recentScores: [2.5, 2.7, 2.9, 3.0, 3.1],
  },
  {
    id: "gm-3",
    name: "Tan Wei Liang",
    region: "APAC",
    country: "Singapore",
    sessions: 10,
    avgScore: 3.4,
    maxScore: 4.0,
    lastActive: "5 hours ago",
    trend: "stable",
    recentScores: [3.2, 3.3, 3.4, 3.3, 3.4],
  },
  {
    id: "gm-4",
    name: "Siriporn Chaiyasit",
    region: "APAC",
    country: "Thailand",
    sessions: 6,
    avgScore: 2.8,
    maxScore: 4.0,
    lastActive: "3 days ago",
    trend: "down",
    recentScores: [3.0, 2.9, 2.8, 2.9, 2.8],
  },
  {
    id: "gm-5",
    name: "Budi Santoso",
    region: "APAC",
    country: "Indonesia",
    sessions: 9,
    avgScore: 3.3,
    maxScore: 4.0,
    lastActive: "12 hours ago",
    trend: "up",
    recentScores: [2.6, 2.9, 3.1, 3.2, 3.3],
  },
];
