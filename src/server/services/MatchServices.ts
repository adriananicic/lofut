import { isValidTeamName } from "@/lib/utils";
import * as MatchRepo from "@/server/repositories/MatchRepo";

export async function getAll() {
  return await MatchRepo.getAll();
}

export async function create(data: {
  teamA: string;
  teamB: string;
  date: string;
  location: string;
}) {
  const { teamA, teamB, date, location } = data;

  if (!teamA || !teamB || !date || !location) {
    throw new Error("Sva polja su obavezna.");
  }

  if (teamA === teamB) {
    throw new Error("Tim A i Tim B ne mogu biti isti.");
  }

  if (!isValidTeamName(teamA) || !isValidTeamName(teamB)) {
    throw new Error("Imena timova moraju početi velikim slovom.");
  }

  return await MatchRepo.create(data);
}

export async function getOne(id: string) {
  const match = await MatchRepo.getOne(id);
  if (!match) {
    throw new Error("Utakmica nije pronađena.");
  }
  return match;
}

export async function update(
  id: string,
  data: {
    teamA: string;
    teamB: string;
    date: string;
    location: string;
  }
) {
  const { teamA, teamB, date, location } = data;

  if (!teamA || !teamB || !date || !location) {
    throw new Error("Sva polja su obavezna.");
  }

  if (teamA === teamB) {
    throw new Error("Tim A i Tim B ne mogu biti isti.");
  }

  if (!isValidTeamName(teamA) || !isValidTeamName(teamB)) {
    throw new Error("Imena timova moraju početi velikim slovom.");
  }

  return await MatchRepo.update(id, data);
}

export async function remove(id: string) {
  return await MatchRepo.deleteById(id);
}
