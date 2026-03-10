import { MonsterGroup } from "@/types";
import MonsterCard from "./MonsterCard";
import { getMonsterImageUrl } from "@/utils/helpers";
import Image from "next/image";

interface MonsterGroupCardProps {
  group: MonsterGroup;
}

export default function MonsterGroupCard({ group }: MonsterGroupCardProps) {
  if (group.monsters.length === 1) {
    return <MonsterCard monster={group.monsters[0]} />;
  }

  return (
    <div className="bg-bg-secondary border-border relative flex h-fit w-fit flex-col overflow-hidden rounded-lg border">
      <div className="grid h-fit w-fit grid-cols-2 gap-[1px]">
        {group.monsters.map((monster) => (
          <div key={monster.id} className="relative aspect-square w-12 sm:w-16">
            <Image
              src={getMonsterImageUrl(monster.image_filename)}
              alt={monster.name}
              width={48}
              height={48}
              className="absolute inset-0 h-full w-full object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
