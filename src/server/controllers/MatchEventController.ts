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

  const alreadyRed = await MatchEventRepo.playerHasRedCard(id, playerId);
  if (alreadyRed) {
    return NextResponse.json(
      { error: "Igrač već ima crveni karton." },
      { status: 400 }
    );
  }

  const maxMinute = await MatchEventRepo.getMaxMinute(id);
  if (minute < maxMinute) {
    return NextResponse.json(
      { error: `Minuta mora biti veća ili jednaka ${maxMinute}.` },
      { status: 400 }
    );
  }

  if (minute > 120) {
    return NextResponse.json(
      { error: `Utakmica ne moze imati vise od 120 minuta` },
      { status: 400 }
    );
  }

  const created = await MatchEventRepo.create(id, body);
  return NextResponse.json(created, { status: 201 });
}

export async function update(req: NextRequest, eventId: string) {
  const body = await req.json();
  const updated = await MatchEventRepo.update(eventId, body);
  return NextResponse.json(updated);
}

export async function remove(eventId: string) {
  await MatchEventRepo.remove(eventId);
  return NextResponse.json({ success: true });
}
