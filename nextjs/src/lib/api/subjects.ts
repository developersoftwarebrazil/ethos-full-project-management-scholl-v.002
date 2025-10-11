// lib/api/subject.ts
import { Subject, SubjectResponse } from "@/lib/types/subject";

// Helper para logar dados com formatação
const logApi = (label: string, data: any) => {
  console.log(`🔹 [API - ${label}]`);
  console.log(JSON.stringify(data, null, 2));
};

// Buscar todos os subjects (paginação opcional)
export const fetchSubjects = async (
  page: number = 1,
  pageSize: number = 10
): Promise<SubjectResponse> => {
  const url = `http://localhost:8000/api/subjects/?page=${page}&page_size=${pageSize}`;
  logApi("fetchSubjects - URL", url);

  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Erro ao buscar subjects:", err);
    throw new Error(err);
  }

  const data = await res.json();
  logApi("fetchSubjects - Response", data);
  return data;
};

// Criar um novo subject
export const createSubject = async (data: {
  name: string;
  description?: string;
  teacher_ids?: number[]; // 🔹 importante: usar teacher_ids conforme o serializer
}): Promise<Subject> => {
  logApi("createSubject - Payload enviado", data);

  const res = await fetch(`http://localhost:8000/api/subjects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseText = await res.text();
  logApi("createSubject - Resposta bruta", responseText);

  if (!res.ok) {
    console.error("❌ Erro na criação do subject:", responseText);
    throw new Error(responseText);
  }

  const parsed = JSON.parse(responseText);
  logApi("createSubject - Resposta JSON", parsed);
  return parsed;
};

// Atualizar um subject existente
export const updateSubject = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    teacher_ids?: number[];
  }
): Promise<Subject> => {
  logApi(`updateSubject - Payload para ID ${id}`, data);

  const res = await fetch(`http://localhost:8000/api/subjects/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseText = await res.text();
  logApi("updateSubject - Resposta bruta", responseText);

  if (!res.ok) {
    console.error("❌ Erro ao atualizar subject:", responseText);
    throw new Error(responseText);
  }

  const parsed = JSON.parse(responseText);
  logApi("updateSubject - Resposta JSON", parsed);
  return parsed;
};

// Deletar um subject
export const deleteSubject = async (id: number): Promise<void> => {
  logApi("deleteSubject - ID", id);

  const res = await fetch(`http://localhost:8000/api/subjects/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Erro ao deletar subject:", err);
    throw new Error(err);
  }

  console.log(`✅ Subject ${id} deletado com sucesso.`);
};
