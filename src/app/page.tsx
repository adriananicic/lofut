import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold">LoFuT</h1>

      <div className="flex flex-col gap-4">
        <Link
          href="/matches"
          className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-center"
        >
          Master / Detail prikaz (Utakmice)
        </Link>

        <Link
          href="/players"
          className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 text-center"
        >
          Šifrarnik (Igrači)
        </Link>
      </div>
    </main>
  );
}
