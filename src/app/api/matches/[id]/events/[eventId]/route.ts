import { NextRequest } from "next/server";
import * as MatchEventController from "@/server/controllers/MatchEventController";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; eventId: string }> }
) {
  const { id, eventId } = await params;
  return MatchEventController.update(req, eventId);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; eventId: string }> }
) {
  const { id, eventId } = await params;
  return MatchEventController.remove(eventId);
}
