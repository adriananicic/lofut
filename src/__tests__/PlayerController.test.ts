import * as PlayerController from "@/server/controllers/PlayerController";
import * as PlayerRepo from "@/server/repositories/PlayerRepo";
import { NextRequest } from "next/server";

jest.mock("@/server/repositories/PlayerRepo");
jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, opts?: any) => ({
      status: opts?.status || 200,
      json: async () => data,
    }),
  },
}));

describe("PlayerController", () => {
  it("returns error for invalid input", async () => {
    const req = {
      json: async () => ({ name: "", number: undefined }),
    } as unknown as NextRequest;

    const res = await PlayerController.create(req);
    expect(res.status).toBe(400);
  });

  it("creates a player with valid input", async () => {
    const req = {
      json: async () => ({ name: "Ivan", number: 5 }),
    } as unknown as NextRequest;

    (PlayerRepo.create as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Ivan",
      number: 5,
    });

    const res = await PlayerController.create(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.name).toBe("Ivan");
  });
});
