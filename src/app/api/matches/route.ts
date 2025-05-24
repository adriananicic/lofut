import { NextRequest } from "next/server";
import * as MatchController from "@/server/controllers/MatchController";

export async function GET() {
  return MatchController.getAll();
}

export async function POST(req: NextRequest) {
  return MatchController.create(req);
}
