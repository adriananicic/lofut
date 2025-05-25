import { NextRequest, NextResponse } from "next/server";
import * as PlayerService from "@/server/services/PlayerServices";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") || "";
  const players = await PlayerService.getAll(search);
  return NextResponse.json(players);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const player = await PlayerService.create(body);
    return NextResponse.json(player, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
