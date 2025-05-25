import { NextRequest } from "next/server";
import * as MatchController from "@/server/controllers/MatchController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const par = await params;
  return MatchController.getOne(par);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return MatchController.update(req, id);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return MatchController.remove(id);
}
