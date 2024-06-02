import { NextResponse, type NextRequest } from "next/server";

function buildApiUrl(query: string): string {
  const key = query.split("-")[1];
  const encodedKey = encodeURIComponent(JSON.stringify({ json: key }));
  return `https://api.nextapi.fun/api/trpc/public.queryKeyUsage?input=${encodedKey}`;
}

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is missing" });
  }

  const url = buildApiUrl(query);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      error: (error as any)?.message || String(error),
    });
  }
}
