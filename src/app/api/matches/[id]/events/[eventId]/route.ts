import { NextRequest, NextResponse } from "next/server";
import * as MatchEventService from "@/server/services/MatchEventServices";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; eventId: string }> }
) {
  try {
    const { id, eventId } = await params;
    const body = await req.json();
    const updated = await MatchEventService.update(eventId, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; eventId: string }> }
) {
  try {
    const { id, eventId } = await params;
    await MatchEventService.remove(eventId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Greška prilikom brisanja događaja." },
      { status: 500 }
    );
  }
}
