import * as MatchEventController from "@/server/controllers/MatchEventController";
import * as MatchEventRepo from "@/server/repositories/MatchEventRepo";
import { NextRequest } from "next/server";

jest.mock("@/server/repositories/MatchEventRepo");
jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, opts?: any) => ({
      status: opts?.status || 200,
      json: async () => data,
    }),
  },
}));

describe("MatchEventController", () => {
  const matchId = "match1";

  it("returns error for missing fields", async () => {
    const req = {
      json: async () => ({ playerId: "", eventType: "", minute: undefined }),
    } as unknown as NextRequest;

    const res = await MatchEventController.create(req, matchId);
    expect(res.status).toBe(400);
  });

  it("returns error if red card already exists", async () => {
    const req = {
      json: async () => ({
        playerId: "p1",
        minute: 65,
        eventType: "RED_CARD",
      }),
    } as unknown as NextRequest;

    (MatchEventRepo.playerHasRedCard as jest.Mock).mockResolvedValue(true);

    const res = await MatchEventController.create(req, matchId);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toMatch(/crveni karton/i);
  });

  it("creates event when valid", async () => {
    const req = {
      json: async () => ({
        playerId: "p1",
        minute: 12,
        eventType: "GOAL",
      }),
    } as unknown as NextRequest;

    (MatchEventRepo.playerHasRedCard as jest.Mock).mockResolvedValue(false);
    (MatchEventRepo.create as jest.Mock).mockResolvedValue({
      id: "e1",
      playerId: "p1",
      eventType: "GOAL",
      minute: 12,
    });

    const res = await MatchEventController.create(req, matchId);
    expect(res.status).toBe(201);

    const json = await res.json();
    expect(json.eventType).toBe("GOAL");
  });
});
