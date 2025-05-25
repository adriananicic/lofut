import * as PlayerRepo from "@/server/repositories/PlayerRepo";
import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  player: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("PlayerRepo", () => {
  it("fetches all players", async () => {
    const mockPlayers = [
      { id: "1", name: "Luka", number: 10 },
      { id: "aerae", name: "Juraj", number: 9 },
    ];
    (prisma.player.findMany as jest.Mock).mockResolvedValue(mockPlayers);

    const players = await PlayerRepo.getAll("Luka");
    expect(players).toEqual(mockPlayers);
  });

  it("creates a player", async () => {
    const mockPlayer = { id: "1", name: "Luka", number: 10 };
    (prisma.player.create as jest.Mock).mockResolvedValue(mockPlayer);

    const result = await PlayerRepo.create({ name: "Luka", number: 10 });
    expect(result).toEqual(mockPlayer);
  });

  it("updates a player", async () => {
    const updatedPlayer = { id: "1", name: "Ivan", number: 9 };
    (prisma.player.update as jest.Mock).mockResolvedValue(updatedPlayer);

    const result = await PlayerRepo.update("1", { name: "Ivan", number: 9 });
    expect(result).toEqual(updatedPlayer);
  });

  it("deletes a player", async () => {
    (prisma.player.delete as jest.Mock).mockResolvedValue({ id: "1" });

    const result = await PlayerRepo.remove("1");
    expect(result.id).toBe("1");
  });
});
