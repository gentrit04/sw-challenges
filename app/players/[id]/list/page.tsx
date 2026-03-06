"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import { formatDate, downloadJson } from "@/utils/helpers";
import MonsterCard from "@/components/monsters/MonsterCard";

export default function PlayerListDetailPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const playerId = params.id as string;

  const challengeId = searchParams.get("challengeId");

  const challenges = useAppStore((s) => s.challenges);
  const battles = useAppStore((b) => b.battles);
  const players = useAppStore((p) => p.players);

  const challenge = challenges.find((c) => c.id === challengeId);
  const player = players.find((p) => p.id === playerId);

  if (!challenge) {
    return (
      <div className="mx-auto max-w-3xl p-4 text-center sm:p-6">
        <p className="text-text-secondary text-lg">Challenge not found</p>
        <Link
          href="/challenges"
          className="text-accent mt-2 inline-block text-sm hover:underline"
        >
          Back to Challenges
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-text text-center text-2xl font-bold sm:text-left">
            {challenge.name} |{" "}
            <span className="text-accent">{player?.name}</span>
          </h1>
          <div className="text-text-secondary mt-1 flex gap-3 text-sm">
            {challenge.createdBy && <span>by {challenge.createdBy}</span>}
            <span>{formatDate(challenge.createdAt)}</span>
          </div>
          <div className="text-accent mt-1 flex gap-3 text-sm">list view</div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
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
                {tier.monsters.length} monsters
              </span>
            </div>

            {tier.monsters.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {tier.monsters.map((monster) => {
                  const filteredWinsBattles = battles.some(
                    (b) =>
                      b.monsterId === monster.id &&
                      playerId === b.playerId &&
                      b.outcome === "win",
                  );

                  return (
                    <MonsterCard
                      key={monster.id}
                      monster={monster}
                      isPlayerList={filteredWinsBattles}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-text-secondary py-2 text-sm">
                No monsters in this row
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
