"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import { formatDate, downloadJson } from "@/utils/helpers";
import MonsterGroupCard from "@/components/monsters/MonsterGroupCard";

export default function ChallengeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const challengeId = params.id as string;

  const challenges = useAppStore((s) => s.challenges);
  const players = useAppStore((s) => s.players);
  const deleteChallenge = useAppStore((s) => s.deleteChallenge);

  const challenge = challenges.find((c) => c.id === challengeId);
  const assignedPlayers = players.filter(
    (p) => p.assignedChallenge === challengeId,
  );

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

  const handleDelete = () => {
    deleteChallenge(challenge.id);
    router.push("/challenges");
  };

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-text text-center text-2xl font-bold sm:text-left">
            {challenge.name}
          </h1>
          <div className="text-text-secondary mt-1 flex gap-3 text-sm">
            {challenge.createdBy && <span>by {challenge.createdBy}</span>}
            <span>{formatDate(challenge.createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              downloadJson(
                challenge,
                `${challenge.name.replace(/\s+/g, "_").toLowerCase()}_challenge.json`,
              )
            }
            className="border-border bg-bg-secondary hover:border-accent/50 cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
          >
            Export
          </button>
          <Link
            href={`/challenges/${challenge.id}/edit`}
            className="bg-accent text-bg hover:bg-accent-hover cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-danger/15 text-danger hover:bg-danger/25 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {assignedPlayers.length > 0 && (
        <div className="mb-6">
          <h2 className="text-text mb-2 text-sm font-semibold">Players</h2>
          <div className="flex flex-wrap gap-2">
            {assignedPlayers.map((p) => (
              <Link
                key={p.id}
                href={`/players/${p.id}`}
                className="border-border bg-bg-secondary hover:border-accent/50 text-text rounded-lg border px-3 py-1.5 text-sm transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      )}

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
                {tier.groups?.length || 0} groups
              </span>
            </div>

            {tier.groups?.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {tier.groups.map((group) => (
                  <MonsterGroupCard key={group.id} group={group} />
                ))}
              </div>
            ) : (
              <p className="text-text-secondary py-2 text-sm">
                No groups in this row
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
