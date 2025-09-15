// components/Shortcuts.tsx
"use client";

import { Role, Shortcut } from "@/lib/types";
import Link from "next/link";

interface ShortcutsProps {
  title?: string;
  role: Role | string; // Role do usuário
  shortcuts?: Shortcut[]; // opcional: sobrescreve atalhos padrões
}

export default function Shortcuts({
  title = "Shortcuts",
  role,
  shortcuts,
}: ShortcutsProps) {
  // Atalhos padrões por role
  const defaultShortcuts: Record<string, Shortcut[]> = {
    teacher: [
      {
        label: "Classes",
        href: "/list/classes",
        colorClass: "bg-lamaSkyLight",
      },
      {
        label: "Students",
        href: "/list/students",
        colorClass: "bg-lamaPurpleLight",
      },
      {
        label: "Lessons",
        href: "/list/lessons",
        colorClass: "bg-lamaYellowLight",
      },
      { label: "Exams", href: "/list/exams", colorClass: "bg-pink-50" },
      {
        label: "Assignments",
        href: "/list/assignments",
        colorClass: "bg-lamaSkyLight",
      },
    ],

    student: [
      {
        label: "My Classes",
        href: "/list/my-classes",
        colorClass: "bg-lamaSkyLight",
      },
      {
        label: "My Lessons",
        href: "/my-lessons",
        colorClass: "bg-lamaPurpleLight",
      },
      {
        label: "My Exams",
        href: "/my-exams",
        colorClass: "bg-lamaYellowLight",
      },
      {
        label: "Assignments",
        href: "/my-assignments",
        colorClass: "bg-pink-50",
      },
      { label: "Results", href: "/results", colorClass: "bg-green-100" },
    ],
  };

  // Pega atalhos customizados ou os padrões por role
  const currentShortcuts =
    shortcuts ??
    defaultShortcuts[typeof role === "string" ? role : role.name] ??
    [];

  return (
    <div className="w-full">
      {title && <h1 className="text-xl font-semibold mb-4">{title}</h1>}

      {/* Grid em 2 colunas (igual ao primeiro exemplo) */}
      <div className="grid grid-cols-2 gap-4">
        {currentShortcuts.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`flex items-center justify-center rounded-lg p-4 text-sm font-medium transition ${item.colorClass} hover:opacity-80`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
