"use client";

import { useState } from "react";
import { TierRow, Monster } from "@/types";
import MonsterCard from "@/components/monsters/MonsterCard";
import MonsterSearch from "@/components/monsters/MonsterSearch";

interface TierRowEditorProps {
  tier: TierRow;
  monsters: Monster[];
  onUpdate: (updatedTier: TierRow) => void;
  onRemove: () => void;
}

export default function TierRowEditor({
  tier,
  monsters,
  onUpdate,
  onRemove,
}: TierRowEditorProps) {
  const [showSearch, setShowSearch] = useState(false);

  const handleAddMonster = (monster: Monster) => {
    if (tier.monsters.some((m) => m.id === monster.id)) return;

    onUpdate({ ...tier, monsters: [...tier.monsters, monster] });
  };

  const handleRemoveMonster = (monsterId: number) => {
    onUpdate({
      ...tier,
      monsters: tier.monsters.filter((m) => m.id !== monsterId),
    });
  };

  return (
    <div className="border-border bg-bg-secondary rounded-xl border p-4">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Row name (e.g. Hard)"
            value={tier.label ?? ""}
            onChange={(e) => onUpdate({ ...tier, label: e.target.value })}
            className="border-border bg-bg text-text placeholder:text-text-secondary/50 focus:border-accent rounded border px-2 py-1 text-sm font-medium outline-none sm:w-48"
          />
          <span className="text-border hidden sm:inline">|</span>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={tier.rowMinute}
              onChange={(e) =>
                onUpdate({ ...tier, rowMinute: Number(e.target.value) })
              }
              className="border-border bg-bg text-text focus:border-accent w-16 rounded border px-2 py-1 text-center text-sm outline-none"
              min={1}
            />
            <span className="text-text-secondary text-xs">min</span>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-text-secondary hover:text-danger cursor-pointer text-sm transition-colors"
        >
          Remove Row
        </button>
      </div>

      {tier.monsters.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tier.monsters.map((monster) => (
            <div key={monster.id} className="group relative">
              <MonsterCard monster={monster} />
              <button
                onClick={() => handleRemoveMonster(monster.id)}
                className="bg-danger absolute -top-1 -right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-xs text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      {showSearch ? (
        <div className="border-border bg-bg rounded-lg border p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-text text-sm font-medium">Add Monster</span>
            <button
              onClick={() => setShowSearch(false)}
              className="text-text-secondary hover:text-text cursor-pointer text-xs"
            >
              Close
            </button>
          </div>
          <MonsterSearch monsters={monsters} onSelect={handleAddMonster} />
        </div>
      ) : (
        <button
          onClick={() => setShowSearch(true)}
          className="border-border text-text-secondary hover:border-accent hover:text-accent w-full cursor-pointer rounded-lg border border-dashed py-2 text-sm transition-colors"
        >
          + Add Monster
        </button>
      )}
    </div>
  );
}
