import prisma from "@/lib/prisma";
import * as MatchRepo from "@/server/repositories/MatchRepo";

describe("MatchRepo (integration)", () => {
  let matchId: string;

  afterAll(async () => {
    await prisma.match.deleteMany({
      where: { id: matchId },
    });

    await prisma.$disconnect();
  });

  it("can create and fetch a match", async () => {
    const created = await MatchRepo.create({
      teamA: "Test Team A",
      teamB: "Test Team B",
      location: "Split",
      date: new Date("2025-06-15T18:00:00.000Z"),
    });

    matchId = created.id;

    expect(created).toBeDefined();
    expect(created.teamA).toBe("Test Team A");

    const all = await MatchRepo.getAll();
    const found = all.find((m) => m.id === matchId);

    expect(found).toBeDefined();
    expect(found?.location).toBe("Split");

    const one = await MatchRepo.getOne(matchId);
    expect(one).toBeDefined();
    expect(one?.teamB).toBe("Test Team B");
  });
});
