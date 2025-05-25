"use client";

import { useEffect, useState } from "react";
import { usePopupBanner } from "@/client/context/PopupBannerContext";

export interface MatchEvent {
  id: string;
  minute: number;
  eventType: string;
  player: { id: string; name: string };
}

export interface Match {
  id: string;
  teamA: string;
  teamB: string;
  date: string;
  location: string;
  events: MatchEvent[];
}

export const useMatchDetail = (id: string) => {
  const [match, setMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [playerId, setPlayerId] = useState("");
  const [minute, setMinute] = useState<number>(0);
  const [eventType, setEventType] = useState("GOAL");
  const { showMessage } = usePopupBanner();
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const fetchMatch = async () => {
    const res = await fetch(`/api/matches/${id}`);
    const data = await res.json();
    setMatch(data);
    setTeamA(data.teamA);
    setTeamB(data.teamB);
    setLocation(data.location);
    setDate(new Date(data.date).toISOString().slice(0, 16));
  };

  const fetchPlayers = async () => {
    const res = await fetch("/api/players");
    const data = await res.json();
    setPlayers(data);
  };

  const createEvent = async () => {
    const res = await fetch(`/api/matches/${id}/events`, {
      method: "POST",
      body: JSON.stringify({ playerId, minute, eventType }),
    });

    if (res.ok) {
      showMessage({ type: "success", text: "Događaj dodan" });
      setPlayerId("");
      setMinute(0);
      setEventType("GOAL");
      fetchMatch();
    } else {
      const err = await res.json();
      showMessage({ type: "error", text: err.error || "Greška kod unosa" });
    }
  };

  const updateEvent = async (eventId: string, updateData: any) => {
    const res = await fetch(`/api/matches/${id}/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
    if (res.ok) {
      fetchMatch();
      showMessage({ type: "success", text: "Događaj ažuriran" });
    } else {
      const err = await res.json();
      showMessage({
        type: "error",
        text: err.error || "Greška kod ažuriranja",
      });
    }
  };

  const deleteEvent = async (eventId: string) => {
    const res = await fetch(`/api/matches/${id}/events/${eventId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchMatch();
      showMessage({ type: "success", text: "Događaj obrisan" });
    } else {
      const err = await res.json();
      showMessage({ type: "error", text: err.error || "Greška kod brisanja" });
    }
  };

  const updateMatch = async () => {
    const res = await fetch(`/api/matches/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        teamA,
        teamB,
        location,
        date: new Date(date).toISOString(),
      }),
    });

    if (res.ok) {
      showMessage({ type: "success", text: "Utakmica ažurirana" });
      fetchMatch();
    } else {
      const err = await res.json();
      showMessage({
        type: "error",
        text: err.error || "Greška kod ažuriranja",
      });
    }
  };

  useEffect(() => {
    fetchMatch();
    fetchPlayers();
  }, [id]);

  return {
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
  };
};
