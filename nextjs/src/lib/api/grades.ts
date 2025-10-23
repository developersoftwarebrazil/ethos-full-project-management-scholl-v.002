// src/lib/api/grades.ts
import { Grade } from "../types/grade";

/**
 * Observação:
 * - Este arquivo é usado em componentes client-side (ex: GradeForm),
 *   portanto o fetch será disparado pelo browser.
 * - O browser precisa de uma URL acessível a partir do host (ex: http://localhost:8000).
 * - Use NEXT_PUBLIC_API_URL no .env.local para configurar corretamente.
 */

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
 const API_URL =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:8000/api";


async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    // retorna o texto cru caso não seja JSON
    return text;
  }
}

export async function getGrades(): Promise<Grade[]> {
  const res = await fetch(`${API_URL}/grades/`, { cache: "no-store" });
  if (!res.ok) {
    const payload = await parseJsonSafe(res);
    throw new Error(`Erro ao buscar grades: ${res.status} ${JSON.stringify(payload)}`);
  }
  const data = await res.json();
  return data.results || data;
}

export async function createGrade(payload: Partial<Grade>) {
  const res = await fetch(`${API_URL}/grades/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await parseJsonSafe(res);
    throw new Error(`Erro ao criar grade: ${res.status} ${JSON.stringify(err)}`);
  }
  return res.json();
}

export async function updateGrade(id: number, payload: Partial<Grade>) {
  const res = await fetch(`${API_URL}/grades/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await parseJsonSafe(res);
    throw new Error(`Erro ao atualizar grade: ${res.status} ${JSON.stringify(err)}`);
  }
  return res.json();
}
