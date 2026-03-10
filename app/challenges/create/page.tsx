"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TierRowEditor from "@/components/challenges/TierRowEditor";
import { TierRow } from "@/types";
import { useAppStore } from "@/stores/useAppStore";
import { generateId } from "@/utils/helpers";

export default function CreateChallengePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const monsters = useAppStore((s) => s.monsters);
  const setMonsters = useAppStore((s) => s.setMonsters);
  const addChallenge = useAppStore((s) => s.addChallenge);

  const [tiers, setTiers] = useState<TierRow[]>([]);

  useEffect(() => {
    if (monsters.length > 0) return;
    fetch("/api/monsters")
      .then((res) => res.json())
      .then((data) => setMonsters(data));
  }, [monsters.length, setMonsters]);

  const handleAddRow = () => {
    setTiers([
      ...tiers,
      {
        id: generateId(),
        rowNumber: tiers.length + 1,
        rowMinute: 1,
        groups: [],
      },
    ]);
  };

  const handleUpdateTier = (index: number, updatedTier: TierRow) => {
    const newTiers = [...tiers];
    newTiers[index] = updatedTier;
    setTiers(newTiers);
  };

  const handleRemoveTier = (index: number) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (name.trim() === "") return;

    addChallenge({
      id: generateId(),
      name: name.trim(),
      createdBy,
      createdAt: Date.now(),
      tiers,
      isTemplate: false,
    });

    router.push("/challenges");
  };

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-text mb-6 text-2xl font-bold">Create Challenge</h1>

      <div className="flex flex-col gap-6">
        <div className="border-border bg-bg-secondary flex flex-col gap-4 rounded-xl border p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-text-secondary text-sm font-medium">
              Challenge Name
            </label>
            <input
              type="text"
              placeholder="Enter challenge name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-border bg-bg text-text placeholder:text-text-secondary/50 focus:border-accent rounded-lg border px-3 py-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-text-secondary text-sm font-medium">
              Created By
            </label>
            <input
              type="text"
              placeholder="Your name..."
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="border-border bg-bg text-text placeholder:text-text-secondary/50 focus:border-accent rounded-lg border px-3 py-2 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-text text-lg font-semibold">Tier Rows</h2>
            <button
              onClick={handleAddRow}
              className="text-accent hover:text-accent-hover cursor-pointer text-sm font-medium transition-colors"
            >
              + Add Row
            </button>
          </div>

          {tiers.map((tier, index) => (
            <TierRowEditor
              key={tier.id}
              tier={tier}
              monsters={monsters}
              onUpdate={(updated) => handleUpdateTier(index, updated)}
              onRemove={() => handleRemoveTier(index)}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-accent text-bg hover:bg-accent-hover cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Create Challenge
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
