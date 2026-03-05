"use client";

import { Monster } from "@/types";
import MonsterCard from "./MonsterCard";

interface MonsterGridProps {
  monsters: Monster[];
}

export default function MonsterGrid({ monsters }: MonsterGridProps) {
  if (monsters.length === 0) {
    return (
      <div className="text-text-secondary flex flex-col items-center justify-center py-16">
        <span className="text-4xl">🔍</span>
        <p className="mt-2 text-sm">No monsters found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {monsters.map((monster) => (
        <MonsterCard key={monster.id} monster={monster} />
      ))}
    </div>
  );
}
