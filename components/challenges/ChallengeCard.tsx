import Link from "next/link";
import { Challenge } from "@/types";
import { formatDate } from "@/utils/helpers";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const totalMonsters = challenge.tiers.reduce(
    (sum, tier) => sum + tier.monsters.length,
    0,
  );

  return (
    <Link href={`/challenges/${challenge.id}`}>
      <div className="border-border hover:border-accent/50 bg-bg-secondary rounded-xl border p-5 transition-colors">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-text text-lg font-semibold">{challenge.name}</h3>
          <span className="text-text-secondary text-xs">
            {formatDate(challenge.createdAt)}
          </span>
        </div>

        {challenge.createdBy && (
          <p className="text-text-secondary mb-3 text-sm">
            by {challenge.createdBy}
          </p>
        )}

        <div className="flex gap-4">
          <span className="text-accent text-sm font-medium">
            {challenge.tiers.length} rows
          </span>
          <span className="text-text-secondary text-sm">
            {totalMonsters} monsters
          </span>
        </div>
      </div>
    </Link>
  );
}
