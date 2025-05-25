"use client";

import { useState, useEffect } from "react";
import { usePopupBanner } from "@/client/context/PopupBannerContext";

export interface Match {
  id: string;
  teamA: string;
  teamB: string;
  date: string;
  location: string;
}

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const { showMessage } = usePopupBanner();

  const fetchMatches = async () => {
    const res = await fetch("/api/matches");
    const data = await res.json();
    setMatches(data);
  };

  const deleteMatch = async (id: string) => {
    const res = await fetch(`/api/matches/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      showMessage({ type: "success", text: "Utakmica obrisana" });
      fetchMatches();
    } else {
      const err = await res.json();
      showMessage({
        type: "error",
        text: err.error || "Greška kod brisanja",
      });
    }
  };

  const createMatch = async (match: {
    teamA: string;
    teamB: string;
    location: string;
    date: string;
  }) => {
    const res = await fetch("/api/matches", {
      method: "POST",
      body: JSON.stringify(match),
    });

    if (res.ok) {
      showMessage({ type: "success", text: "Utakmica dodana" });
      fetchMatches();
    } else {
      const err = await res.json();
      showMessage({
        type: "error",
        text: err.error || "Greška kod dodavanja",
      });
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return {
    matches,
    fetchMatches,
    deleteMatch,
    createMatch,
  };
};
