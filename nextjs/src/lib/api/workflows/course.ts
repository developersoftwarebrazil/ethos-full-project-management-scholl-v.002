import { createOrUpdateCourse } from "../courses";

/**
 * Cria um novo curso
 * @param formData Dados do curso (titleCourse, description, classroom_ids, subject_ids)
 */
export const createCourseWorkflow = async (formData: any) => {
  const course = await createOrUpdateCourse(formData, "create");
  return course;
};

/**
 * Atualiza um curso existente
 * @param formData Dados atualizados do curso
 * @param courseId ID do curso a ser atualizado
 */
export const updateCourseWorkflow = async (formData: any, courseId: number) => {
  const course = await createOrUpdateCourse(formData, "update", courseId);
  return course;
};
