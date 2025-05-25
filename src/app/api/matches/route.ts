import { NextRequest, NextResponse } from "next/server";
import * as MatchService from "@/server/services/MatchServices";

export async function GET() {
  const matches = await MatchService.getAll();
  return NextResponse.json(matches);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const match = await MatchService.create(body);
    return NextResponse.json(match, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
