import * as MatchController from "@/server/controllers/MatchController";
import * as MatchRepo from "@/server/repositories/MatchRepo";
import { NextRequest } from "next/server";

jest.mock("@/server/repositories/MatchRepo");
jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, opts?: any) => ({
      status: opts?.status || 200,
      json: async () => data,
    }),
  },
}));

describe("MatchController", () => {
  it("returns error for missing fields", async () => {
    const req = {
      json: async () => ({ teamA: "", teamB: "", location: "", date: "" }),
    } as unknown as NextRequest;

    const res = await MatchController.create(req);
    expect(res.status).toBe(400);
  });

  it("creates a match with valid input", async () => {
    const req = {
      json: async () => ({
        teamA: "Team One",
        teamB: "Team Two",
        location: "Zagreb",
        date: "2024-05-25T15:00",
      }),
    } as unknown as NextRequest;

    (MatchRepo.create as jest.Mock).mockResolvedValue({
      id: "1",
      teamA: "Team One",
      teamB: "Team Two",
      location: "Zagreb",
      date: "2024-05-25T15:00",
    });

    const res = await MatchController.create(req);
    const json = await res.json();
    expect(res.status).toBe(201);
    expect(json.teamA).toBe("Team One");
  });
});
