import prisma from "@/lib/prisma";
import * as MatchEventRepo from "@/server/repositories/MatchEventRepo";
import { MatchEventType } from "@prisma/client";

describe("MatchEventRepo (integration)", () => {
  let matchId: string;
  let playerId: string;

  beforeAll(async () => {
    const player = await prisma.player.create({
      data: {
        name: "TEST_Player",
        number: 99,
      },
    });

    const match = await prisma.match.create({
      data: {
        teamA: "Team X",
        teamB: "Team Y",
        location: "Zagreb",
        date: new Date(),
      },
    });

    matchId = match.id;
    playerId = player.id;
  });

  afterAll(async () => {
    await prisma.matchEvent.deleteMany({
      where: { playerId },
    });

    await prisma.match.deleteMany({
      where: { id: matchId },
    });

    await prisma.player.deleteMany({
      where: { id: playerId },
    });

    await prisma.$disconnect();
  });

  it("can create RED_CARD and detect it", async () => {
    const event = await MatchEventRepo.create(matchId, {
      playerId,
      minute: 42,
      eventType: MatchEventType.RED_CARD,
    });

    expect(event).toBeDefined();
    expect(event.eventType).toBe("RED_CARD");

    const already = await MatchEventRepo.playerHasRedCard(matchId, playerId);
    expect(already?.eventType).toBe("RED_CARD");
  });
});
