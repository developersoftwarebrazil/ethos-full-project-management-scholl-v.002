// lib/api/workflows/subject.ts
import { Subject } from "@/lib/types/subject";
import { createSubject, updateSubject } from "../subjects";

// Helper simples para logs
const logWorkflow = (label: string, data: any) => {
  console.log(`🧩 [WORKFLOW - ${label}]`);
  console.log(JSON.stringify(data, null, 2));
};

/**
 * Cria um subject e opcionalmente vincula professores
 * @param formData Objeto com name, description e array de teacherIds
 */
export const createSubjectWorkflow = async (formData: {
  name: string;
  description?: string;
  teacherIds?: number[];
}): Promise<Subject> => {
  const payload = {
    name: formData.name,
    description: formData.description,
    teacher_ids: formData.teacherIds ?? [],
  };

  logWorkflow("createSubjectWorkflow - Payload enviado", payload);

  const subject = await createSubject(payload);

  logWorkflow("createSubjectWorkflow - Resposta recebida", subject);

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
  const payload = {
    name: formData.name,
    description: formData.description,
    teacher_ids: formData.teacherIds ?? [],
  };

  logWorkflow(`updateSubjectWorkflow - Payload para ID ${subjectId}`, payload);

  const subject = await updateSubject(subjectId, payload);

  logWorkflow("updateSubjectWorkflow - Resposta recebida", subject);

  return subject;
};
