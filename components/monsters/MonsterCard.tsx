import Image from "next/image";
import { Monster } from "@/types";
import { getMonsterImageUrl } from "@/utils/helpers";
import { ELEMENT_COLORS } from "@/utils/constants";

interface MonsterCardProps {
  monster: Monster;
  isAlreadyInTier?: boolean;
}

export default function MonsterCard({
  monster,
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
        className={`rounded ${isAlreadyInTier ? "grayscale" : ""}`}
        unoptimized
      />
      <div className="flex flex-col">
        <span className="text-text text-sm font-medium">{monster.name}</span>
      </div>
    </div>
  );
}
