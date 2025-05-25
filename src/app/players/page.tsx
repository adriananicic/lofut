"use client";

import { usePlayers } from "@/client/hooks/usePlayers";
import { useRouter } from "next/navigation";

export default function PlayersPage() {
  const {
    players,
    name,
    number,
    setName,
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
  } = usePlayers();

  const router = useRouter();

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Natrag
      </button>

      <h1 className="text-2xl font-bold">Popis igrača</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔎 Pretraga"
        className="border rounded px-3 py-2 w-full"
      />

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ime igrača"
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
          placeholder="Broj"
          className="border rounded px-3 py-2 w-24"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dodaj
        </button>
      </div>

      <ul className="divide-y border rounded">
        {players.map((p) => (
          <li key={p.id} className="flex justify-between items-center p-3">
            {editingId === p.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border rounded px-2 py-1 mr-2"
                />
                <input
                  type="number"
                  value={editNumber}
                  onChange={(e) => setEditNumber(parseInt(e.target.value))}
                  className="border rounded px-2 py-1 w-20 mr-2"
                />
                <button
                  onClick={() => handleEdit(p.id)}
                  className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                >
                  Spremi
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-500 hover:underline"
                >
                  Odustani
                </button>
              </>
            ) : (
              <>
                <span>
                  #{p.number} – {p.name}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(p.id);
                      setEditName(p.name);
                      setEditNumber(p.number);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Uredi
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Obriši
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
