import { NextRequest } from "next/server";
import * as MatchEventController from "@/server/controllers/MatchEventController";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return MatchEventController.create(req, id);
}
