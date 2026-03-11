"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import MonsterGroupCard from "@/components/monsters/MonsterGroupCard";
import BattleModal from "@/components/monsters/BattleModal";
import { MonsterGroup, TierRow } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PlayerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const playerId = params.id as string;

  const players = useAppStore((s) => s.players);
  const challenges = useAppStore((s) => s.challenges);
  const battles = useAppStore((s) => s.battles);
  const deletePlayer = useAppStore((s) => s.deletePlayer);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<MonsterGroup | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierRow | null>(null);

  const [hideBattleHistory, setHideBattleHistory] = useState(true);

  const player = players.find((p) => p.id === playerId);
  const challenge = challenges.find((c) => c.id === player?.assignedChallenge);
  const playerBattles = battles.filter((b) => b.playerId === playerId);

  if (!player) {
    return (
      <div className="mx-auto max-w-3xl p-4 text-center sm:p-6">
        <p className="text-text-secondary text-lg">Player not found</p>
        <Link
          href="/players"
          className="text-accent mt-2 inline-block text-sm hover:underline"
        >
          Back to Players
        </Link>
      </div>
    );
  }

  const totalMinutes = playerBattles.reduce(
    (sum, b) => sum + b.minutesAwarded,
    0,
  );
  const wins = playerBattles.filter((b) => b.outcome === "win").length;
  const winRate =
    playerBattles.length > 0
      ? Math.round((wins / playerBattles.length) * 100)
      : null;

  const handleDelete = () => {
    deletePlayer(player.id);
    router.push("/players");
  };

  const handleGroupClick = (group: MonsterGroup, tier: TierRow) => {
    setSelectedGroup(group);
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-text text-2xl font-bold">{player.name}</h1>
          {challenge && (
            <p className="text-text-secondary text-sm">
              Challenge:{" "}
              <Link
                href={`/challenges/${challenge.id}`}
                className="text-accent hover:underline"
              >
                {challenge.name}
              </Link>
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="bg-danger/15 text-danger hover:bg-danger/25 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="border-border bg-bg-secondary rounded-xl border p-4 text-center">
          <p className="text-success text-2xl font-bold">
            {totalMinutes.toFixed(1)}
          </p>
          <p className="text-text-secondary mt-1 text-xs">Total Minutes</p>
        </div>
        <div className="border-border bg-bg-secondary rounded-xl border p-4 text-center">
          <p className="text-accent text-2xl font-bold">
            {playerBattles.length}
          </p>
          <p className="text-text-secondary mt-1 text-xs">Battles</p>
        </div>
        <div className="border-border bg-bg-secondary rounded-xl border p-4 text-center">
          <p className="text-accent text-2xl font-bold">
            {winRate !== null ? `${winRate}%` : "-"}
          </p>
          <p className="text-text-secondary mt-1 text-xs">Win Rate</p>
        </div>
      </div>

      {challenge && (
        <div className="mb-6 flex flex-col gap-4">
          <h2 className="text-text text-lg font-semibold">
            Tier Rows ({challenge.tiers.length})
          </h2>

          {challenge.tiers.map((tier) => (
            <div
              key={tier.id}
              className="border-border bg-bg-secondary rounded-xl border p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-text font-medium">
                  {tier.label || `Row ${tier.rowNumber}`}
                </span>
                <span className="text-accent text-sm font-medium">
                  {tier.rowMinute} min
                </span>
                <span className="text-text-secondary text-sm">
                  {tier.groups?.length || 0} groups
                </span>
              </div>

              {tier.groups?.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                  {tier.groups.map((group) => {
                    const filteredWinsBattles = battles.some(
                      (b) =>
                        b.groupId === group.id &&
                        player.id === b.playerId &&
                        b.outcome === "win",
                    );

                    return (
                      <button
                        key={group.id}
                        onClick={() => handleGroupClick(group, tier)}
                        disabled={filteredWinsBattles}
                        className={`relative cursor-pointer text-left transition-transform hover:scale-105 ${
                          filteredWinsBattles
                            ? "cursor-not-allowed opacity-100 hover:scale-100"
                            : ""
                        }`}
                      >
                        <div className={filteredWinsBattles ? "grayscale" : ""}>
                          <MonsterGroupCard group={group} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-text-secondary py-2 text-sm">
                  No groups in this row
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-text text-lg font-semibold">Battle History</h2>
          <button onClick={() => setHideBattleHistory(!hideBattleHistory)}>
            {hideBattleHistory ? <ChevronDown /> : <ChevronUp />}
          </button>
        </div>

        {!hideBattleHistory &&
          (playerBattles.length === 0 ? (
            <div className="border-border flex flex-col items-center gap-2 rounded-xl border border-dashed py-10">
              <p className="text-text-secondary">No battles recorded yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {playerBattles.map((battle) => (
                <div
                  key={battle.id}
                  className="border-border bg-bg-secondary flex items-center gap-3 rounded-lg border px-4 py-3"
                >
                  <span
                    className={`text-sm font-bold ${
                      battle.outcome === "win" ? "text-success" : "text-danger"
                    }`}
                  >
                    {battle.outcome === "win" ? "W" : "L"}
                  </span>
                  <div className="flex-1">
                    <p className="text-text text-sm">
                      {challenge?.tiers
                        .flatMap((t) => t.groups || [])
                        .find((g) => g.id === battle.groupId)
                        ?.monsters.map((m) => m.name)
                        .join(", ") ?? `Unknown Group`}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      battle.minutesAwarded > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {battle.minutesAwarded > 0 ? "+" : ""}
                    {battle.minutesAwarded} min
                  </span>
                </div>
              ))}
            </div>
          ))}
      </div>

      {challenge && (
        <BattleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          group={selectedGroup}
          tier={selectedTier}
          playerId={player.id}
          challengeId={challenge.id}
        />
      )}
    </div>
  );
}
