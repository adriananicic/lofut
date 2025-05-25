import * as MatchEventRepo from "@/server/repositories/MatchEventRepo";
import prisma from "@/lib/prisma";

describe("MatchEventRepo", () => {
  let matchId = "";
  let playerId = "";
  let eventId = "";

  beforeAll(async () => {
    const match = await prisma.match.create({
      data: {
        teamA: "A",
        teamB: "B",
        location: "Rijeka",
        date: new Date().toISOString(),
      },
    });
    matchId = match.id;

    const player = await prisma.player.create({
      data: { name: "Event Player", number: 9 },
    });
    playerId = player.id;
  });

  afterAll(async () => {
    await prisma.matchEvent.deleteMany({ where: { matchId } });
    await prisma.match.delete({ where: { id: matchId } });
    await prisma.player.delete({ where: { id: playerId } });
  });

  it("can create and check red card rule", async () => {
    const event = await MatchEventRepo.create(matchId, {
      playerId,
      eventType: "RED_CARD",
      minute: 15,
    });
    eventId = event.id;

    const already = await MatchEventRepo.playerHasRedCard(matchId, playerId);
    expect(already?.eventType).toBe("RED_CARD");
  });
});
