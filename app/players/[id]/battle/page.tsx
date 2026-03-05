"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import { generateId } from "@/utils/helpers";
import { ELEMENT_COLORS } from "@/utils/constants";
import Image from "next/image";
import { getMonsterImageUrl } from "@/utils/helpers";

export default function BattlePage() {
  const router = useRouter();
  const params = useParams();
  const playerId = params.id as string;

  const players = useAppStore((s) => s.players);
  const challenges = useAppStore((s) => s.challenges);
  const recordBattle = useAppStore((s) => s.recordBattle);
  const battles = useAppStore((b) => b.battles);

  const player = players.find((p) => p.id === playerId);
  const challenge = challenges.find((c) => c.id === player?.assignedChallenge);

  const [selectedTierId, setSelectedTierId] = useState("");
  const [selectedMonsterIds, setSelectedMonsterIds] = useState<number[]>([]);
  const [outcome, setOutcome] = useState<"win" | "loss">("win");

  if (!player || !challenge) {
    return (
      <div className="mx-auto max-w-lg p-4 text-center sm:p-6">
        <p className="text-text-secondary">Player or challenge not found</p>
      </div>
    );
  }

  const selectedTier = challenge.tiers.find((t) => t.id === selectedTierId);

  const minutesAwarded = selectedTier
    ? outcome === "win"
      ? selectedTier.rowMinute
      : selectedTier.rowMinute * -0.5
    : 0;

  const handleSubmit = () => {
    if (!selectedTierId || selectedMonsterIds.length === 0 || !selectedTier)
      return;

    const now = Date.now();

    selectedMonsterIds.forEach((monsterId, index) => {
      recordBattle({
        id: generateId(),
        playerId,
        challengeId: challenge.id,
        tierRowId: selectedTierId,
        monsterId: monsterId,
        outcome,
        minutesAwarded,
        timestamp: now + index,
      });
    });

    router.push(`/players/${playerId}`);
  };

  return (
    <div className="mx-auto max-w-lg p-4 sm:p-6">
      <h1 className="text-text mb-1 text-2xl font-bold">Record Battle</h1>
      <p className="text-text-secondary mb-6 text-sm">
        {player.name} — {challenge.name}
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-sm font-medium">
            Tier Row
          </label>
          <select
            value={selectedTierId}
            onChange={(e) => {
              setSelectedTierId(e.target.value);
              setSelectedMonsterIds([]);
            }}
            className="border-border bg-bg-secondary text-text focus:border-accent rounded-lg border px-3 py-2 outline-none"
          >
            <option value="">Select a tier row...</option>
            {challenge.tiers.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.label || `Row ${tier.rowNumber}`} — {tier.rowMinute} min
              </option>
            ))}
          </select>
        </div>

        {selectedTier && (
          <div className="flex flex-col gap-1.5">
            <label className="text-text-secondary flex justify-between text-sm font-medium">
              <span>Monsters (Select 1-4)</span>
              <span>{selectedMonsterIds.length} / 4</span>
            </label>
            {selectedTier.monsters.length === 0 ? (
              <p className="text-text-secondary text-sm">
                No monsters in this tier row
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {selectedTier.monsters.map((monster) => {
                  const filteredWinsBattles = battles.some(
                    (b) =>
                      b.monsterId === monster.id &&
                      player.id === b.playerId &&
                      b.outcome === "win",
                  );
                  const isSelected = selectedMonsterIds.includes(monster.id);

                  const handleMonsterClick = () => {
                    if (isSelected) {
                      setSelectedMonsterIds((prev) =>
                        prev.filter((id) => id !== monster.id),
                      );
                    } else {
                      //max 4
                      if (selectedMonsterIds.length < 4) {
                        setSelectedMonsterIds((prev) => [...prev, monster.id]);
                      }
                    }
                  };

                  return (
                    <button
                      key={monster.id}
                      disabled={filteredWinsBattles}
                      onClick={handleMonsterClick}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        isSelected
                          ? "border-accent bg-accent/10"
                          : "border-border bg-bg hover:border-accent/50"
                      }`}
                    >
                      <Image
                        src={getMonsterImageUrl(monster.image_filename)}
                        alt={monster.name}
                        width={40}
                        height={40}
                        className={`rounded ${filteredWinsBattles ? "grayscale" : ""}`}
                        unoptimized
                      />
                      <div>
                        <p className="text-text text-sm font-medium">
                          {monster.name}
                        </p>
                        <p
                          className="text-xs capitalize"
                          style={{
                            color: filteredWinsBattles
                              ? "var(--text-secondary)"
                              : ELEMENT_COLORS[monster.element.toLowerCase()],
                          }}
                        >
                          {monster.element}
                        </p>
                        {filteredWinsBattles && (
                          <p className="text-danger text-xs capitalize">
                            defeated
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {selectedMonsterIds.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <label className="text-text-secondary text-sm font-medium">
              Outcome
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setOutcome("win")}
                className={`flex-1 cursor-pointer rounded-lg border py-2 text-center text-sm font-medium transition-colors ${
                  outcome === "win"
                    ? "border-success bg-success/15 text-success"
                    : "border-border text-text-secondary hover:border-success/50"
                }`}
              >
                Win
              </button>
              <button
                onClick={() => setOutcome("loss")}
                className={`flex-1 cursor-pointer rounded-lg border py-2 text-center text-sm font-medium transition-colors ${
                  outcome === "loss"
                    ? "border-danger bg-danger/15 text-danger"
                    : "border-border text-text-secondary hover:border-danger/50"
                }`}
              >
                Loss
              </button>
            </div>
          </div>
        )}

        {selectedMonsterIds.length > 0 && (
          <div className="border-border bg-bg-secondary rounded-xl border p-4 text-center">
            <span
              className={`text-2xl font-bold ${
                minutesAwarded >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {minutesAwarded * selectedMonsterIds.length > 0 ? "+" : ""}
              {minutesAwarded * selectedMonsterIds.length} min
            </span>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!selectedTierId || selectedMonsterIds.length === 0}
            className="bg-accent text-bg hover:bg-accent-hover cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Record Battle
          </button>
          <button
            onClick={() => router.back()}
            className="text-text-secondary hover:text-text cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
