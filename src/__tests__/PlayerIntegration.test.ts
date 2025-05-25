import { create, getAll } from "@/server/controllers/PlayerController";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, opts?: any) => ({
      status: opts?.status || 200,
      json: async () => data,
    }),
  },
}));

afterEach(async () => {
  await prisma.player.deleteMany({
    where: { name: { startsWith: "Test" } },
  });
});

describe("Real integration test with dev DB", () => {
  it("creates and fetches a test player", async () => {
    const req = {
      json: async () => ({ name: "Test Marko", number: 99 }),
      nextUrl: new URL("http://localhost/api/players?search=TEST_Marko"),
    } as unknown as NextRequest;

    const res = await create(req);
    expect(res.status).toBe(201);

    const getRes = await getAll(req);
    const data = await getRes.json();

    expect(data[0].name).toBe("Test Marko");
  });
});
