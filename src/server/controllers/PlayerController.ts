import { NextRequest, NextResponse } from "next/server";
import { isValidPlayerName } from "@/lib/utils";
import * as PlayerRepo from "@/server/repositories/PlayerRepo";

export async function getAll(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") || "";
  const players = await PlayerRepo.getAll(search);
  return NextResponse.json(players);
}

export async function create(req: NextRequest) {
  const body = await req.json();
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!isValidPlayerName(body.name)) {
    return NextResponse.json(
      { error: "Ime mora započeti velikim slovom, a ostatak malim." },
      { status: 400 }
    );
  }
  const player = await PlayerRepo.create(body.name);
  return NextResponse.json(player, { status: 201 });
}

export async function update(req: NextRequest, id: string) {
  const body = await req.json();
  if (!isValidPlayerName(body.name)) {
    return NextResponse.json(
      { error: "Ime mora započeti velikim slovom, a ostatak malim." },
      { status: 400 }
    );
  }
  const updated = await PlayerRepo.update(id, body.name);
  return NextResponse.json(updated);
}

export async function remove(id: string) {
  await PlayerRepo.remove(id);
  return NextResponse.json({ status: "deleted" });
}
