"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import { generateId } from "@/utils/helpers";
import Link from "next/link";

export default function CreatePlayerPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [challengeId, setChallengeId] = useState("");

  const challenges = useAppStore((s) => s.challenges);
  const addPlayer = useAppStore((s) => s.addPlayer);

  const handleSubmit = () => {
    if (name.trim() === "" || challengeId.length === 0) return;

    addPlayer({
      id: generateId(),
      name: name.trim(),
      assignedChallenge: challengeId,
    });

    router.push("/players");
  };

  return (
    <div className="mx-auto max-w-lg p-4 sm:p-6">
      <h1 className="text-text mb-6 text-2xl font-bold">Add Player</h1>

      <div className="border-border bg-bg-secondary flex flex-col gap-6 rounded-xl border p-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-sm font-medium">
            Player Name
          </label>
          <input
            type="text"
            placeholder="Enter player name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-border bg-bg text-text placeholder:text-text-secondary/50 focus:border-accent rounded-lg border px-3 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-sm font-medium">
            Assign Challenge
          </label>
          {challenges.length > 0 ? (
            <select
              value={challengeId}
              onChange={(e) => setChallengeId(e.target.value)}
              className="border-border bg-bg text-text focus:border-accent rounded-lg border px-3 py-2 outline-none"
            >
              <option value="">Select a challenge...</option>
              {challenges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-text-secondary text-sm">
              No challenges available.{" "}
              <Link href="/challenges/create" className="text-accent underline">
                Create one first
              </Link>
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-accent text-bg hover:bg-accent-hover cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Create Player
          </button>
          <button
            onClick={() => router.back()}
            className="text-text-secondary hover:text-text cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
