import { create, getAll } from "@/server/services/PlayerServices";
import prisma from "@/lib/prisma";

afterEach(async () => {
  await prisma.player.deleteMany({
    where: { name: { startsWith: "Test" } },
  });
});

describe("Real integration test with dev DB", () => {
  it("creates and fetches a test player", async () => {
    const player = await create({ name: "Test Marko", number: 99 });

    expect(player.name).toBe("Test Marko");

    const all = await getAll("Test");
    expect(all[0].name).toBe("Test Marko");
  });
});
