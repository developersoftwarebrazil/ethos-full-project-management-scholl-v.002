// components/Shortcuts.tsx
"use client";

import { Role, Shortcut } from "@/lib/types";
import Link from "next/link";

interface ShortcutsProps {
  title?: string;
  role: Role | string; // Role do usuário
  shortcuts?: Shortcut[]; // opcional: permite sobrescrever os atalhos
}

export default function Shortcuts({
  title = "Shortcuts",
  role,
  shortcuts,
}: ShortcutsProps) {
  // Definindo atalhos padrões por role
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

  const currentShortcuts =
    shortcuts ??
    defaultShortcuts[typeof role === "string" ? role : role.name] ??
    [];

  return (
    <>
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex flex-wrap text-xs text-gray-500 gap-4 mt-4">
        {currentShortcuts.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`rounded-md p-4 ${item.colorClass}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
