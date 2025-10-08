// lib/api/workflows/subject.ts
import { Subject } from "@/lib/types/subject";
import { createSubject, updateSubject } from "../subjects";

/**
 * Cria um subject e opcionalmente vincula professores
 * @param formData Objeto com name, description e array de teacherIds
 */
export const createSubjectWorkflow = async (formData: {
  name: string;
  description?: string;
  teacherIds?: number[];
}): Promise<Subject> => {
  const subject = await createSubject({
    name: formData.name,
    description: formData.description,
    teachers: formData.teacherIds,
  });

  return subject;
};

/**
 * Atualiza um subject existente e opcionalmente altera professores
 * @param subjectId ID do subject a ser atualizado
 * @param formData Objeto com name, description e array de teacherIds
 */
export const updateSubjectWorkflow = async (
  subjectId: number,
  formData: {
    name?: string;
    description?: string;
    teacherIds?: number[];
  }
): Promise<Subject> => {
  const subject = await updateSubject(subjectId, {
    name: formData.name,
    description: formData.description,
    teachers: formData.teacherIds,
  });

  return subject;
};
