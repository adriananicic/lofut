import { NextRequest, NextResponse } from "next/server";
import * as PlayerController from "@/server/controllers/PlayerController";

export async function GET(req: NextRequest) {
  return PlayerController.getAll(req);
}

export async function POST(req: NextRequest) {
  return PlayerController.create(req);
}
