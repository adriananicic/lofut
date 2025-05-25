"use client";

import { useState, useEffect } from "react";
import { usePopupBanner } from "@/client/context/PopupBannerContext";

export interface Player {
  id: string;
  name: string;
  number: number;
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState<number>(0);
  const { showMessage } = usePopupBanner();

  const fetchPlayers = async () => {
    const res = await fetch(`/api/players?search=${search}`);
    const data = await res.json();
    setPlayers(data);
  };

  const handleCreate = async () => {
    const res = await fetch("/api/players", {
      method: "POST",
      body: JSON.stringify({ name, number }),
    });

    if (res.ok) {
      showMessage({ type: "success", text: "Igrač dodan" });
      setName("");
      setNumber(0);
      fetchPlayers();
    } else {
      const err = await res.json();
      showMessage({
        type: "error",
        text: err.error || "Greška prilikom spremanja",
      });
    }
  };

  const handleEdit = async (id: string) => {
    const res = await fetch(`/api/players/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: editName, number: editNumber }),
    });

    if (res.ok) {
      showMessage({ type: "success", text: "Igrač ažuriran" });
      setEditingId(null);
      setEditName("");
      setEditNumber(0);
      fetchPlayers();
    } else {
      const err = await res.json();
      showMessage({ type: "error", text: err.error || "Greška" });
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/players/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      showMessage({ type: "success", text: "Igrač obrisan" });
      fetchPlayers();
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [search]);

  return {
    players,
    name,
    setName,
    number,
    setNumber,
    search,
    setSearch,
    editingId,
    setEditingId,
    editName,
    setEditName,
    editNumber,
    setEditNumber,
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
