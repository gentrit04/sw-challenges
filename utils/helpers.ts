import { SWARMFARM_IMAGE_BASE } from "./constants";

export function generateId() {
  return crypto.randomUUID();
}

export function getMonsterImageUrl(filename: string) {
  return `${SWARMFARM_IMAGE_BASE}/${filename}`;
}

export function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(timestamp));
}
