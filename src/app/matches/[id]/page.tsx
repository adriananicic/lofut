"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useMatchDetail } from "@/client/hooks/useMatchDetails";
import { useState } from "react";

export default function MatchDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const {
    match,
    players,
    playerId,
    setPlayerId,
    minute,
    setMinute,
    eventType,
    setEventType,
    createEvent,
    updateEvent,
    deleteEvent,
    editingEventId,
    setEditingEventId,
    teamA,
    setTeamA,
    teamB,
    setTeamB,
    location,
    setLocation,
    date,
    setDate,
    updateMatch,
  } = useMatchDetail(id);

  const [editingMatch, setEditingMatch] = useState(false);

  if (!match) return <div className="p-6">Učitavanje...</div>;

  const handleEventSubmit = () => {
    if (editingEventId) {
      updateEvent(editingEventId, { playerId, minute, eventType });
    } else {
      createEvent();
    }
  };

  const handleMatchUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateMatch();
    setEditingMatch(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <Link href="/matches" className="text-blue-600 hover:underline">
        ← Povratak na utakmice
      </Link>

      {/* Prikaz utakmice */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {match.teamA} vs {match.teamB}
          </h1>
          {!editingMatch && (
            <button
              onClick={() => setEditingMatch(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              ✏️ Uredi utakmicu
            </button>
          )}
        </div>
        <p className="text-gray-600">
          {match.location} | {new Date(match.date).toLocaleString("hr-HR")}
        </p>
      </div>

      {/* Forma za uređivanje utakmice */}
      {editingMatch && (
        <form
          onSubmit={handleMatchUpdate}
          className="space-y-2 border p-4 rounded"
        >
          <h2 className="text-lg font-semibold">Uredi utakmicu</h2>

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

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Spremi
            </button>
            <button
              type="button"
              onClick={() => setEditingMatch(false)}
              className="text-gray-500 hover:underline"
            >
              Odustani
            </button>
          </div>
        </form>
      )}

      {/* Lista događaja */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Događaji</h2>
        <ul className="space-y-1">
          {match.events.map((event) => (
            <li
              key={event.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <span>
                ⏱ {event.minute}' - {event.player.name} ({event.eventType})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingEventId(event.id);
                    setPlayerId(event.player.id);
                    setMinute(event.minute);
                    setEventType(event.eventType);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Uredi
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-red-600 hover:underline"
                >
                  Obriši
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Forma za dodavanje/uređivanje događaja */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {editingEventId ? "Uredi događaj" : "Dodaj događaj"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEventSubmit();
          }}
          className="space-y-2"
        >
          <select
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Odaberi igrača --</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={minute || ""}
            onChange={(e) => setMinute(parseInt(e.target.value))}
            className="border p-2 rounded w-full"
            placeholder="Minuta"
          />

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="GOAL">Gol</option>
            <option value="YELLOW_CARD">Žuti karton</option>
            <option value="RED_CARD">Crveni karton</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingEventId ? "Spremi izmjene" : "Dodaj događaj"}
            </button>
            {editingEventId && (
              <button
                type="button"
                onClick={() => {
                  setEditingEventId(null);
                  setPlayerId("");
                  setMinute(0);
                  setEventType("GOAL");
                }}
                className="text-gray-600 hover:underline"
              >
                Odustani
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
