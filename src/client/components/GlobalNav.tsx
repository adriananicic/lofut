"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Početna" },
  { href: "/matches", label: "Utakmice" },
  { href: "/players", label: "Igrači" },
];

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-100 border-b p-4 mb-6 shadow">
      <ul className="flex gap-6 justify-center">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`px-3 py-1 rounded ${
                pathname === href
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:underline"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
