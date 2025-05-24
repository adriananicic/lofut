import { NextRequest, NextResponse } from "next/server";
import * as PlayerController from "@/server/controllers/PlayerController";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return PlayerController.update(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return PlayerController.remove(id);
}
