"use client";

import { MonsterGroup, TierRow } from "@/types";
import { useAppStore } from "@/stores/useAppStore";
import { generateId, getMonsterImageUrl } from "@/utils/helpers";
import { X } from "lucide-react";
import Image from "next/image";

interface BattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: MonsterGroup | null;
  tier: TierRow | null;
  playerId: string;
  challengeId: string;
}

export default function BattleModal({
  isOpen,
  onClose,
  group,
  tier,
  playerId,
  challengeId,
}: BattleModalProps) {
  const recordBattle = useAppStore((s) => s.recordBattle);

  if (!isOpen || !group || !tier) return null;

  const handleRecord = (outcome: "win" | "loss") => {
    const minutesAwarded =
      outcome === "win"
        ? tier.rowMinute * group.monsters.length
        : tier.rowMinute * group.monsters.length * -0.5;

    recordBattle({
      id: generateId(),
      playerId,
      challengeId,
      tierRowId: tier.id,
      groupId: group.id,
      outcome,
      minutesAwarded,
      timestamp: Date.now(),
    });

    onClose();
  };

  const winMinutes = tier.rowMinute * group.monsters.length;
  const lossMinutes = tier.rowMinute * group.monsters.length * -0.5;

  return (
    <div
      className="bg-bg/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="border-border bg-bg-secondary w-full max-w-sm rounded-xl border p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-text text-xl font-bold">Record Battle</h2>

          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text rounded-lg p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="my-4 flex items-center justify-center">
          {group.monsters.map((monster) => (
            <div
              key={monster.id}
              className="relative aspect-square w-12 sm:w-16"
            >
              <Image
                src={getMonsterImageUrl(monster.image_filename)}
                alt={monster.name}
                width={48}
                height={48}
                className="absolute inset-0 h-full w-full object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleRecord("win")}
            className="border-success bg-success/10 text-success hover:bg-success/20 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border py-3 transition-colors"
          >
            <span className="block text-lg font-bold">Win</span>
            <span className="block text-sm opacity-80">+{winMinutes} min</span>
          </button>

          <button
            onClick={() => handleRecord("loss")}
            className="border-danger bg-danger/10 text-danger hover:bg-danger/20 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border py-3 transition-colors"
          >
            <span className="block text-lg font-bold">Loss</span>
            <span className="block text-sm opacity-80">{lossMinutes} min</span>
          </button>
        </div>
      </div>
    </div>
  );
}
