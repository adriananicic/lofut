import * as MatchEventService from "@/server/services/MatchEventServices";
import * as MatchEventRepo from "@/server/repositories/MatchEventRepo";

jest.mock("@/server/repositories/MatchEventRepo");

describe("MatchEventService", () => {
  const matchId = "match1";

  it("throws error for missing fields", async () => {
    await expect(
      MatchEventService.create(matchId, {
        playerId: "",
        minute: undefined as any,
        eventType: "",
      })
    ).rejects.toThrow("Sva polja su obavezna");
  });

  it("throws error if red card exists", async () => {
    (MatchEventRepo.playerHasRedCard as jest.Mock).mockResolvedValue(true);

    await expect(
      MatchEventService.create(matchId, {
        playerId: "p1",
        minute: 60,
        eventType: "RED_CARD",
      })
    ).rejects.toThrow("Igrač već ima crveni karton");
  });

  it("creates valid event", async () => {
    (MatchEventRepo.playerHasRedCard as jest.Mock).mockResolvedValue(false);
    (MatchEventRepo.getMaxMinute as jest.Mock).mockResolvedValue(10);
    (MatchEventRepo.create as jest.Mock).mockResolvedValue({
      id: "e1",
      playerId: "p1",
      eventType: "GOAL",
      minute: 12,
    });

    const result = await MatchEventService.create(matchId, {
      playerId: "p1",
      minute: 12,
      eventType: "GOAL",
    });

    expect(result.eventType).toBe("GOAL");
  });
});
