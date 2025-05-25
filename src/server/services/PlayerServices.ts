import { isValidPlayerName } from "@/lib/utils";
import * as PlayerRepo from "@/server/repositories/PlayerRepo";

export async function getAll(search: string = "") {
  return await PlayerRepo.getAll(search);
}

export async function create(data: { name: string; number: number }) {
  const { name, number } = data;

  if (!name || number === undefined) {
    throw new Error("Ime i broj su obavezni");
  }

  if (!isValidPlayerName(name)) {
    throw new Error("Ime mora započeti velikim slovom, a ostatak malim.");
  }

  return await PlayerRepo.create({ name, number });
}

export async function update(
  id: string,
  data: { name: string; number: number }
) {
  const { name, number } = data;

  if (!name || number === undefined) {
    throw new Error("Ime i broj su obavezni");
  }

  if (!isValidPlayerName(name)) {
    throw new Error("Ime mora započeti velikim slovom, a ostatak malim.");
  }

  return await PlayerRepo.update(id, { name, number });
}

export async function remove(id: string) {
  return await PlayerRepo.remove(id);
}
