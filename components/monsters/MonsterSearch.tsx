"use client";

import { useState } from "react";
import { Monster, TierRow } from "@/types";
import MonsterCard from "./MonsterCard";

interface MonsterSearchProps {
  monsters: Monster[];
  onSelect: (monster: Monster) => void;
  tier: TierRow;
}

export default function MonsterSearch({
  monsters,
  onSelect,
  tier,
}: MonsterSearchProps) {
  const [search, setSearch] = useState("");
  const [elementFilter, setElementFilter] = useState("");

  const filtered = monsters
    .filter(
      (m, index, self) =>
        index ===
        self.findIndex(
          (other) =>
            other.name === m.name &&
            other.element.toLowerCase() === m.element.toLowerCase(),
        ),
    )
    .filter((m) => {
      const matchesName = m.name.toLowerCase().includes(search.toLowerCase());
      const matchesElement =
        elementFilter === "" || m.element.toLowerCase() === elementFilter;
      return matchesName && matchesElement;
    });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Search monster name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-border bg-bg text-text placeholder:text-text-secondary/50 focus:border-accent flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
        />
        <select
          value={elementFilter}
          onChange={(e) => setElementFilter(e.target.value)}
          className="border-border bg-bg text-text focus:border-accent rounded-lg border px-3 py-2 text-sm outline-none"
        >
          <option value="">All Elements</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="wind">Wind</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="max-h-64 overflow-y-auto rounded-lg">
        {filtered.length === 0 ? (
          <p className="text-text-secondary py-8 text-center text-sm">
            No monsters loaded. Wait a bit!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filtered.slice(0, 6).map((monster) => {
              const isAlreadyInTier = tier.groups.some((group) =>
                group.monsters.some((m) => m.id === monster.id),
              );
              return (
                <div
                  key={monster.id}
                  onClick={() => onSelect(monster)}
                  className="cursor-pointer"
                >
                  <MonsterCard
                    monster={monster}
                    isAlreadyInTier={isAlreadyInTier}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
