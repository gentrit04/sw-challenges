import { SWARMFARM_API_BASE } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function GET() {
  let url: string | null =
    `${SWARMFARM_API_BASE}/monsters/?format=json&page_size=100`;

  const allMonsters = [];
  try {
    while (url) {
      const res = await fetch(url);
      const data = await res.json();
      allMonsters.push(...data.results);
      url = data.next as string | null;
    }

    return NextResponse.json(allMonsters);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch monsters" },
      { status: 500 },
    );
  }
}
