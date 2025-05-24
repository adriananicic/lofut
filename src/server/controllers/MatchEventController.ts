import { NextRequest, NextResponse } from "next/server";
import * as MatchEventRepo from "@/server/repositories/MatchEventRepo";

export async function create(req: NextRequest, id: string) {
  const body = await req.json();
  const { playerId, minute, eventType } = body;

  if (!playerId || minute === undefined || !eventType) {
    return NextResponse.json(
      { error: "Sva polja su obavezna." },
      { status: 400 }
    );
  }

  const already = await MatchEventRepo.playerHasRedCard(id, playerId);
  if (eventType === "RED_CARD" && already) {
    return NextResponse.json(
      { error: "Igrač već ima crveni karton" },
      { status: 400 }
    );
  }

  const created = await MatchEventRepo.create(id, body);
  return NextResponse.json(created, { status: 201 });
}
