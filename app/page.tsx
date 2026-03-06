"use client";

import { useAppStore } from "@/stores/useAppStore";
import Link from "next/link";

export default function Home() {
  const challenges = useAppStore((c) => c.challenges);
  const players = useAppStore((p) => p.players);
  const battles = useAppStore((b) => b.battles);

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="mb-8 text-center">
        <h1 className="text-accent mb-2 text-3xl font-bold sm:text-4xl">
          SW Challenges
        </h1>
        <p className="text-text-secondary">
          Manage tier-based monster battles and track player progression
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/challenges"
          className="border-border hover:border-accent/50 bg-bg-secondary rounded-xl border p-6 transition-colors"
        >
          <h2 className="text-text mb-1 text-lg font-semibold">Challenges</h2>
          <p className="text-text-secondary text-sm">
            Create and manage tier-based monster challenges
          </p>
        </Link>

        <Link
          href="/players"
          className="border-border hover:border-accent/50 bg-bg-secondary rounded-xl border p-6 transition-colors"
        >
          <h2 className="text-text mb-1 text-lg font-semibold">Players</h2>
          <p className="text-text-secondary text-sm">
            Add players and assign them to challenges
          </p>
        </Link>
      </div>

      <div className="border-border bg-bg-secondary relative rounded-xl border p-6">
        <h2 className="text-text mb-4 text-center text-lg font-semibold">
          Overview
        </h2>
        <button
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
          className="bg-accent text-bg hover:bg-accent-hover absolute top-2 right-2 cursor-pointer rounded-lg px-2 py-1 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm"
        >
          Reset Data
        </button>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-accent text-2xl font-bold">
              {challenges.length}
            </p>
            <p className="text-text-secondary text-xs">Challenges</p>
          </div>
          <div>
            <p className="text-accent text-2xl font-bold">{players.length}</p>
            <p className="text-text-secondary text-xs">Players</p>
          </div>
          <div>
            <p className="text-accent text-2xl font-bold">{battles.length}</p>
            <p className="text-text-secondary text-xs">Battles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
