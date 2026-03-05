import Link from "next/link";
import { Player } from "@/types";
import { useAppStore } from "@/stores/useAppStore";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const challenges = useAppStore((s) => s.challenges);
  const challenge = challenges.find((c) => c.id === player.assignedChallenge);

  return (
    <Link href={`/players/${player.id}`}>
      <div className="border-border hover:border-accent/50 bg-bg-secondary rounded-xl border p-4 transition-colors">
        <h3 className="text-text text-base font-semibold">{player.name}</h3>
        {challenge && (
          <p className="text-text-secondary mt-1 text-sm">
            Challenge: <span className="text-accent">{challenge.name}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
