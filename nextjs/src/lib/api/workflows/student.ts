import { createUser, assignRoleToUser, updateUser } from "../users";
import { createOrUpdateStudent } from "../students";

// Criar usuário + aluno
export const createUserAndStudent = async (formData: any) => {
  const user = await createUser(formData);
  await assignRoleToUser(user.id, "student");
  const student = await createOrUpdateStudent(formData, user.id, "create");
  return { user, student };
};

// Atualizar usuário + professor
export const updateUserAndStudent = async (
  formData: any,
  userId: number,
  studentId: number
) => {
  const user = await updateUser(userId, formData);
  const student = await createOrUpdateStudent(
    formData,
    userId,
    "update",
    studentId
  );
  return { user, student };
};
