import { NextRequest, NextResponse } from "next/server";
import * as MatchService from "@/server/services/MatchServices";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const match = await MatchService.getOne(id);
    return NextResponse.json(match);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await MatchService.update(id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await MatchService.remove(id);
    return NextResponse.json({ message: "Utakmica obrisana" });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Greška prilikom brisanja utakmice" },
      { status: 500 }
    );
  }
}
