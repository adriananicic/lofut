import * as MatchRepo from "@/server/repositories/MatchRepo";
import prisma from "@/lib/prisma";

describe("MatchRepo", () => {
  let createdId = "";

  afterAll(async () => {
    if (createdId) {
      await prisma.match.delete({ where: { id: createdId } });
    }
  });

  it("can create and fetch a match", async () => {
    const match = await MatchRepo.create({
      teamA: "Repo A",
      teamB: "Repo B",
      location: "Split",
      date: new Date().toISOString(),
    });

    createdId = match.id;
    expect(match.teamA).toBe("Repo A");

    const fetched = await MatchRepo.getOne(createdId);
    expect(fetched?.teamB).toBe("Repo B");
  });
});
