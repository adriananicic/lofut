import { NextRequest, NextResponse } from "next/server";
import { isValidPlayerName } from "@/lib/utils";
import * as PlayerRepo from "@/server/repositories/PlayerRepo";

export async function getAll(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") || "";
  const players = await PlayerRepo.getAll(search);
  return NextResponse.json(players);
}

export async function create(req: NextRequest) {
  const { name, number } = await req.json();
  if (!name || number === undefined) {
    return NextResponse.json(
      { error: "Ime i broj su obavezni" },
      { status: 400 }
    );
  }
  if (!isValidPlayerName(name)) {
    return NextResponse.json(
      { error: "Ime mora započeti velikim slovom, a ostatak malim." },
      { status: 400 }
    );
  }
  const player = await PlayerRepo.create(name);
  return NextResponse.json(player, { status: 201 });
}

export async function update(req: NextRequest, id: string) {
  const { name, number } = await req.json();
  if (!name || number === undefined) {
    return NextResponse.json(
      { error: "Ime i broj su obavezni" },
      { status: 400 }
    );
  }

  if (!isValidPlayerName(name)) {
    return NextResponse.json(
      { error: "Ime mora započeti velikim slovom, a ostatak malim." },
      { status: 400 }
    );
  }
  const updated = await PlayerRepo.update(id, name);
  return NextResponse.json(updated);
}

export async function remove(id: string) {
  await PlayerRepo.remove(id);
  return NextResponse.json({ status: "deleted" });
}
