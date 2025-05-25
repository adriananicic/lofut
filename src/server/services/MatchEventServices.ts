import * as MatchEventRepo from "@/server/repositories/MatchEventRepo";

export async function create(
  matchId: string,
  data: {
    playerId: string;
    minute: number;
    eventType: string;
  }
) {
  const { playerId, minute, eventType } = data;

  if (!playerId || minute === undefined || !eventType) {
    throw new Error("Sva polja su obavezna.");
  }

  const alreadyRed = await MatchEventRepo.playerHasRedCard(matchId, playerId);
  if (alreadyRed) {
    throw new Error("Igrač već ima crveni karton.");
  }

  const maxMinute = await MatchEventRepo.getMaxMinute(matchId);
  if (minute < maxMinute) {
    throw new Error(`Minuta mora biti veća ili jednaka ${maxMinute}.`);
  }

  if (minute > 120) {
    throw new Error("Utakmica ne može imati više od 120 minuta.");
  }

  return await MatchEventRepo.create(matchId, data);
}

export async function update(
  eventId: string,
  data: {
    playerId?: string;
    minute?: number;
    eventType?: string;
  }
) {
  return await MatchEventRepo.update(eventId, data);
}

export async function remove(eventId: string) {
  return await MatchEventRepo.remove(eventId);
}
