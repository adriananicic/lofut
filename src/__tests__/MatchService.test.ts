import * as MatchService from "@/server/services/MatchServices";
import * as MatchRepo from "@/server/repositories/MatchRepo";

jest.mock("@/server/repositories/MatchRepo");

describe("MatchService", () => {
  it("throws error for missing fields", async () => {
    await expect(
      MatchService.create({ teamA: "", teamB: "", date: "", location: "" })
    ).rejects.toThrow("Sva polja su obavezna");
  });

  it("creates match with valid input", async () => {
    (MatchRepo.create as jest.Mock).mockResolvedValue({
      id: "1",
      teamA: "Team One",
      teamB: "Team Two",
      date: "2024-05-25T15:00",
      location: "Zagreb",
    });

    const result = await MatchService.create({
      teamA: "Team One",
      teamB: "Team Two",
      date: "2024-05-25T15:00",
      location: "Zagreb",
    });

    expect(result.teamA).toBe("Team One");
  });
});
