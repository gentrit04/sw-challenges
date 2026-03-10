"use client";

import Image from "next/image";
import { Monster } from "@/types";
import { getMonsterImageUrl } from "@/utils/helpers";
import { ELEMENT_COLORS } from "@/utils/constants";
import { Skull } from "lucide-react";

interface MonsterCardProps {
  monster: Monster;
  isPlayerList?: boolean;
  isAlreadyInTier?: boolean;
}

export default function MonsterCard({
  monster,
  isPlayerList = false,
  isAlreadyInTier,
}: MonsterCardProps) {
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
        className={`rounded ${isPlayerList || isAlreadyInTier ? "grayscale" : ""}`}
        unoptimized
      />
      <div className="flex flex-col">
        <span className="text-text text-sm font-medium">{monster.name}</span>
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
