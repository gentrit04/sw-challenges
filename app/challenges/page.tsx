"use client";

import ChallengeCard from "@/components/challenges/ChallengeCard";
import { useAppStore } from "@/stores/useAppStore";
import { Challenge } from "@/types";
import Link from "next/link";

export default function ChallengesPage() {
  const challenges = useAppStore((s) => s.challenges);

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="text-text text-2xl font-bold">Challenges</h1>
        <div className="flex gap-2">
          <label className="border-border bg-bg-secondary hover:border-accent/50 cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors">
            Import List
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  const helpers = await import("@/utils/helpers");
                  const data = await helpers.readJsonFile(file);
                  if (data && data.name && data.tiers) {
                    useAppStore.getState().addChallenge({
                      ...(data as unknown as Challenge),
                      id: helpers.generateId(),
                    });
                  }
                } catch (err) {
                  console.error("Failed to import", err);
                  alert("Invalid challenge file");
                }
                e.target.value = "";
              }}
            />
          </label>
          <Link
            href="/challenges/create"
            className="bg-accent text-bg hover:bg-accent-hover rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            + New Challenge
          </Link>
        </div>
      </div>

      {challenges.length === 0 ? (
        <div className="border-border flex flex-col items-center gap-4 rounded-xl border border-dashed py-16">
          <p className="text-text-secondary text-lg">No challenges yet</p>
          <Link
            href="/challenges/create"
            className="bg-accent text-bg hover:bg-accent-hover rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            Create your first challenge
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
}
