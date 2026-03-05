import { BattleEvent, Challenge, Monster, Player } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  challenges: Challenge[];
  players: Player[];
  monsters: Monster[];
  battles: BattleEvent[];

  addChallenge: (challenge: Challenge) => void;
  updateChallenge: (id: string, updated: Challenge) => void;
  deleteChallenge: (id: string) => void;

  addPlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;

  recordBattle: (event: BattleEvent) => void;
  deleteBattle: (id: string) => void;

  setMonsters: (monster: Monster[]) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // state
      challenges: [],
      players: [],
      monsters: [],
      battles: [],

      addChallenge: (challenge) =>
        set((state) => ({
          challenges: [...state.challenges, challenge],
        })),

      updateChallenge: (id, updated) =>
        set((state) => ({
          challenges: state.challenges.map((c) => (c.id === id ? updated : c)),
        })),

      deleteChallenge: (id) =>
        set((state) => ({
          challenges: state.challenges.filter((c) => c.id !== id),
        })),

      addPlayer: (player) =>
        set((state) => ({
          players: [...state.players, player],
        })),

      deletePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
          battles: state.battles.filter((b) => b.playerId !== id),
        })),

      recordBattle: (battle) =>
        set((state) => ({
          battles: [...state.battles, battle],
        })),

      deleteBattle: (id) =>
        set((state) => ({
          battles: state.battles.filter((b) => b.id !== id),
        })),

      setMonsters: (newMonsters) => set({ monsters: newMonsters }),
    }),
    { name: "sw-challenges-storage" },
  ),
);
