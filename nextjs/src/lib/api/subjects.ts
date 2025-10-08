// lib/api/subject.ts
import { Subject, SubjectResponse } from "@/lib/types/subject";

// Buscar todos os subjects (paginação opcional)
export const fetchSubjects = async (
  page: number = 1,
  pageSize: number = 10
): Promise<SubjectResponse> => {
  const res = await fetch(
    `http://localhost:8000/api/subjects/?page=${page}&page_size=${pageSize}`
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Criar um novo subject
export const createSubject = async (data: {
  name: string;
  description?: string;
  teachers?: number[]; // IDs dos professores
}): Promise<Subject> => {
  const res = await fetch(`http://localhost:8000/api/subjects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Atualizar um subject existente
export const updateSubject = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    teachers?: number[]; // IDs dos professores
  }
): Promise<Subject> => {
  const res = await fetch(`http://localhost:8000/api/subjects/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Deletar um subject
export const deleteSubject = async (id: number): Promise<void> => {
  const res = await fetch(`http://localhost:8000/api/subjects/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await res.text());
};
