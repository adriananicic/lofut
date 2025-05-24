import { NextRequest, NextResponse } from "next/server";
import { isValidTeamName } from "@/lib/utils";
import * as MatchRepo from "@/server/repositories/MatchRepo";

export async function getAll() {
  const matches = await MatchRepo.getAll();
  return NextResponse.json(matches);
}

export async function create(req: NextRequest) {
  const body = await req.json();
  const { teamA, teamB, date, location } = body;

  if (!teamA || !teamB || !date || !location) {
    return NextResponse.json(
      { error: "Sva polja su obavezna." },
      { status: 400 }
    );
  }

  if (teamA === teamB) {
    return NextResponse.json(
      { error: "Tim A i Tim B ne mogu biti isti." },
      { status: 400 }
    );
  }

  if (!isValidTeamName(teamA) || !isValidTeamName(teamB)) {
    return NextResponse.json(
      { error: "Imena timova moraju početi velikim slovom." },
      { status: 400 }
    );
  }

  const match = await MatchRepo.create(body);
  return NextResponse.json(match, { status: 201 });
}

export async function getOne(params: { id: string }) {
  const match = await MatchRepo.getOne(params.id);
  if (!match) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(match);
}

export async function update(req: NextRequest, id: string) {
  const body = await req.json();
  const { teamA, teamB, date, location } = body;

  if (!teamA || !teamB || !date || !location) {
    return NextResponse.json(
      { error: "Sva polja su obavezna." },
      { status: 400 }
    );
  }

  if (teamA === teamB) {
    return NextResponse.json(
      { error: "Tim A i Tim B ne mogu biti isti." },
      { status: 400 }
    );
  }

  if (!isValidTeamName(teamA) || !isValidTeamName(teamB)) {
    return NextResponse.json(
      { error: "Imena timova moraju početi velikim slovom." },
      { status: 400 }
    );
  }

  const updated = await MatchRepo.update(id, body);
  return NextResponse.json(updated);
}
