/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import MatchesPage from "@/app/matches/page";
import { PopupBannerProvider } from "@/client/context/PopupBannerContext";
import "@testing-library/jest-dom";

jest.mock("@/client/hooks/useMatches", () => ({
  useMatches: () => ({
    matches: [
      {
        id: "1",
        teamA: "X",
        teamB: "Y",
        location: "Stadion",
        date: new Date().toISOString(),
      },
    ],
    deleteMatch: jest.fn(),
    createMatch: jest.fn(),
    fetchMatches: jest.fn(),
  }),
}));

describe("MatchesPage", () => {
  it("displays match list", () => {
    render(
      <PopupBannerProvider>
        <MatchesPage />
      </PopupBannerProvider>
    );

    expect(screen.getByText(/Popis utakmica/i)).toBeInTheDocument();
    expect(screen.getByText(/X vs Y/)).toBeInTheDocument();
  });
});
