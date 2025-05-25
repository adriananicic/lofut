/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import PlayersPage from "@/app/players/page";
import { PopupBannerProvider } from "@/client/context/PopupBannerContext";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

jest.mock("@/client/hooks/usePlayers", () => ({
  usePlayers: () => ({
    players: [{ id: "1", name: "Marko", number: 7 }],
    name: "",
    number: 0,
    setName: jest.fn(),
    setNumber: jest.fn(),
    search: "",
    setSearch: jest.fn(),
    editingId: null,
    setEditingId: jest.fn(),
    editName: "",
    editNumber: 0,
    setEditName: jest.fn(),
    setEditNumber: jest.fn(),
    handleCreate: jest.fn(),
    handleEdit: jest.fn(),
    handleDelete: jest.fn(),
  }),
}));

describe("PlayersPage", () => {
  it("displays player list and form", () => {
    render(
      <PopupBannerProvider>
        <PlayersPage />
      </PopupBannerProvider>
    );

    expect(screen.getByText("Popis igrača")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ime igrača")).toBeInTheDocument();
    expect(screen.getByText("#7 – Marko")).toBeInTheDocument();
  });
});
