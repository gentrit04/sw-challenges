"use client";

import PlayerCard from "@/components/players/PlayerCard";
import { useAppStore } from "@/stores/useAppStore";
import Link from "next/link";

export default function PlayersPage() {
  const players = useAppStore((s) => s.players);

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-text text-2xl font-bold">Players</h1>
        <Link
          href="/players/create"
          className="bg-accent text-bg hover:bg-accent-hover rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          + New Player
        </Link>
      </div>

      {players.length === 0 ? (
        <div className="border-border flex flex-col items-center gap-4 rounded-xl border border-dashed py-16">
          <p className="text-text-secondary text-lg">No players yet</p>
          <Link
            href="/players/create"
            className="bg-accent text-bg hover:bg-accent-hover rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            Add your first player
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}
