// src/lib/api/workflows/grade.ts
import { createGrade as apiCreateGrade, updateGrade as apiUpdateGrade } from "../grades";
import { Grade } from "@/lib/types/grade";

export const createGrade = async (formData: Partial<Grade>) => {
  // aqui você pode colocar validações adicionais antes de chamar a API
  return apiCreateGrade(formData);
};

export const updateGrade = async (id: number, formData: Partial<Grade>) => {
  return apiUpdateGrade(id, formData);
};
