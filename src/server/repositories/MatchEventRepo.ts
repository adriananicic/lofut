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

export async function getMaxMinute(matchId: string): Promise<number> {
  const result = await prisma.matchEvent.aggregate({
    where: { matchId },
    _max: { minute: true },
  });

  return result._max.minute ?? 0;
}

export function update(eventId: string, data: any) {
  return prisma.matchEvent.update({
    where: { id: eventId },
    data,
  });
}

export function remove(eventId: string) {
  return prisma.matchEvent.delete({
    where: { id: eventId },
  });
}
