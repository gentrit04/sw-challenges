"use client";

import Image from "next/image";
import { Monster } from "@/types";
import { getMonsterImageUrl } from "@/utils/helpers";
import { ELEMENT_COLORS } from "@/utils/constants";

interface MonsterCardProps {
  monster: Monster;
}

export default function MonsterCard({ monster }: MonsterCardProps) {
  return (
    <div
      className="bg-bg hover:bg-bg-secondary flex items-center gap-3 rounded-lg border p-3 transition-colors"
      style={{ borderColor: ELEMENT_COLORS[monster.element.toLowerCase()] }}
    >
      <Image
        src={getMonsterImageUrl(monster.image_filename)}
        alt={monster.name}
        width={48}
        height={48}
        className="rounded"
        unoptimized
      />
      <div className="flex flex-col">
        <span className="text-text text-sm font-medium">{monster.name}</span>
        <span
          className="text-xs capitalize"
          style={{
            color: ELEMENT_COLORS[monster.element.toLowerCase()],
          }}
        >
          {monster.element}
        </span>
      </div>
    </div>
  );
}
