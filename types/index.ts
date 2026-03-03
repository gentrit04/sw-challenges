export interface Monster {
  id: number;
  name: string;
  image_filename: string;
  element: "fire" | "water" | "wind" | "light" | "dark";
}

export interface TierRow {
  id: string;
  rowNumber: number;
  rowMinute: number;
  label?: string;
  monsters: Monster[];
}

export interface Challenge {
  id: string;
  name: string;
  createdAt: number;
  createdBy: string;
  tiers: TierRow[];
  isTemplate: boolean;
}

export interface Player {
  id: string;
  name: string;
  assignedChallenge: string;
}

export interface BattleEvent {
  id: string;
  playerId: string;
  challengeId: string;
  tierRowId: string;
  monsterId: number;
  outcome: "win" | "loss";
  minutesAwarded: number;
  timestamp: number;
}
