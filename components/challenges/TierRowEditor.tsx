"use client";

import { useState } from "react";
import { TierRow, Monster } from "@/types";
import MonsterCard from "@/components/monsters/MonsterCard";

import MonsterSearch from "@/components/monsters/MonsterSearch";
import { generateId } from "@/utils/helpers";
import MonsterGroupCard from "../monsters/MonsterGroupCard";

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
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [pendingGroupMonsters, setPendingGroupMonsters] = useState<Monster[]>(
    [],
  );

  const handleAddMonster = (monster: Monster) => {
    const isAlreadyInTier = tier.groups.some((group) =>
      group.monsters.some((m) => m.id === monster.id),
    );
    if (isAlreadyInTier) return;

    if (isGroupMode) {
      if (pendingGroupMonsters.some((m) => m.id === monster.id)) return;
      if (pendingGroupMonsters.length >= 4) return;
      setPendingGroupMonsters([...pendingGroupMonsters, monster]);
    } else {
      onUpdate({
        ...tier,
        groups: [...tier.groups, { id: generateId(), monsters: [monster] }],
      });
    }
  };

  const handleConfirmGroup = () => {
    if (pendingGroupMonsters.length === 0) return;
    onUpdate({
      ...tier,
      groups: [
        ...tier.groups,
        { id: generateId(), monsters: pendingGroupMonsters },
      ],
    });
    setPendingGroupMonsters([]);
    setShowSearch(false);
  };

  const handleRemoveGroup = (groupId: string) => {
    onUpdate({
      ...tier,
      groups: tier.groups.filter((g) => g.id !== groupId),
    });
  };

  const handleRemovePendingMonster = (monsterId: number) => {
    setPendingGroupMonsters(
      pendingGroupMonsters.filter((m) => m.id !== monsterId),
    );
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

      {tier.groups?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tier.groups.map((group) => (
            <div key={group.id} className="group relative">
              <MonsterGroupCard group={group} />
              <button
                onClick={() => handleRemoveGroup(group.id)}
                className="bg-danger absolute -top-1 -right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-xs text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      {showSearch ? (
        <div className="border-border bg-bg flex flex-col gap-3 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <span className="text-text text-sm font-medium">Add Monster</span>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer touch-none items-center gap-2">
                <span className="text-text-secondary text-xs">Group Mode</span>
                <div
                  className={`h-4 w-8 rounded-full p-0.5 transition-colors ${isGroupMode ? "bg-accent" : "bg-border"}`}
                  onClick={() => setIsGroupMode(!isGroupMode)}
                >
                  <div
                    className={`h-3 w-3 rounded-full bg-white transition-transform ${isGroupMode ? "translate-x-4" : "translate-x-0"}`}
                  />
                </div>
              </label>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setPendingGroupMonsters([]);
                }}
                className="text-text-secondary hover:text-text cursor-pointer text-xs"
              >
                Close
              </button>
            </div>
          </div>

          {isGroupMode && pendingGroupMonsters.length > 0 && (
            <div className="border-border bg-bg-secondary flex flex-col gap-2 rounded-lg border p-2">
              <div className="text-text-secondary text-xs font-medium">
                Pending Group:
              </div>
              <div className="flex flex-wrap gap-2">
                {pendingGroupMonsters.map((monster) => (
                  <div key={monster.id} className="group relative">
                    <MonsterCard monster={monster} />
                    <button
                      onClick={() => handleRemovePendingMonster(monster.id)}
                      className="bg-danger absolute -top-1 -right-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-[10px] text-white"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleConfirmGroup}
                className="bg-accent text-bg hover:bg-accent-hover cursor-pointer self-end rounded px-3 py-1.5 text-xs font-medium transition-colors"
              >
                Confirm Group ({pendingGroupMonsters.length}/4)
              </button>
            </div>
          )}
          <MonsterSearch
            monsters={monsters}
            onSelect={handleAddMonster}
            tier={tier}
          />
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
