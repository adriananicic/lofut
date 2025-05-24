import prisma from "@/lib/prisma";

export function playerHasRedCard(matchId: string, playerId: string) {
  return prisma.matchEvent.findFirst({
    where: {
      matchId,
      playerId,
      eventType: "RED_CARD",
    },
  });
}

export function create(matchId: string, data: any) {
  return prisma.matchEvent.create({
    data: {
      matchId,
      playerId: data.playerId,
      minute: data.minute,
      eventType: data.eventType,
    },
  });
}
