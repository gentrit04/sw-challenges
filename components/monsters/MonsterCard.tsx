"use client";

import Image from "next/image";
import { Monster } from "@/types";
import { getMonsterImageUrl } from "@/utils/helpers";
import { ELEMENT_COLORS } from "@/utils/constants";
import { Skull } from "lucide-react";

interface MonsterCardProps {
  monster: Monster;
  isPlayerList: boolean;
}

export default function MonsterCard({
  monster,
  isPlayerList,
}: MonsterCardProps) {
  console.log(isPlayerList);
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
        className={`rounded ${isPlayerList ? "grayscale" : ""}`}
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
        {isPlayerList && (
          <p className="text-danger flex items-center gap-1 text-xs capitalize">
            <Skull className="text-text h-4 w-4" />
            defeated
          </p>
        )}
      </div>
    </div>
  );
}
