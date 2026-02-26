import { NextRequest, NextResponse } from "next/server";

import { fetchGithubEvents } from "@/lib/github";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");
  const parsedLimit = Number(limitParam);
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 12) : 10;

  try {
    const events = await fetchGithubEvents(limit);

    return NextResponse.json(
      { events },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        events: [],
        error: error instanceof Error ? error.message : "Could not load GitHub activity.",
      },
      { status: 503 },
    );
  }
}
