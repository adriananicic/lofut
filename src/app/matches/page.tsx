"use client";

import React from "react";
import { useMatches } from "@/client/hooks/useMatches";
import Link from "next/link";
import { useState } from "react";

export default function MatchesPage() {
  const { matches, deleteMatch, createMatch } = useMatches();

  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMatch({ teamA, teamB, location, date });
    setTeamA("");
    setTeamB("");
    setLocation("");
    setDate("");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Popis utakmica</h1>

      <ul className="space-y-4">
        {matches.map((match) => (
          <li
            key={match.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">
                {match.teamA} vs {match.teamB}
              </div>
              <div className="text-sm text-gray-600">
                {match.location} |{" "}
                {new Date(match.date).toLocaleString("hr-HR")}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/matches/${match.id}`}
                className="text-blue-600 hover:underline"
              >
                Detalji
              </Link>
              <button
                onClick={() => deleteMatch(match.id)}
                className="text-red-600 hover:underline"
              >
                Obriši
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreate} className="space-y-2 border p-4 rounded">
        <h2 className="text-lg font-semibold">Nova utakmica</h2>

        <input
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
          placeholder="Tim A"
          className="border p-2 rounded w-full"
        />
        <input
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
          placeholder="Tim B"
          className="border p-2 rounded w-full"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Lokacija"
          className="border p-2 rounded w-full"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dodaj utakmicu
        </button>
      </form>
    </div>
  );
}
