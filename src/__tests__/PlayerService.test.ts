import * as PlayerService from "@/server/services/PlayerServices";
import * as PlayerRepo from "@/server/repositories/PlayerRepo";

jest.mock("@/server/repositories/PlayerRepo");

describe("PlayerService", () => {
  it("throws error for invalid input", async () => {
    await expect(
      PlayerService.create({ name: "", number: undefined as any })
    ).rejects.toThrow("Ime i broj su obavezni");
  });

  it("creates a player with valid input", async () => {
    (PlayerRepo.create as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Ivan",
      number: 5,
    });

    const result = await PlayerService.create({ name: "Ivan", number: 5 });
    expect(result.name).toBe("Ivan");
    expect(result.number).toBe(5);
  });
});
