// lib/api/workflows/student.ts
import { createUser, assignRoleToUser, updateUser } from "../user";
import { createOrUpdateStudent } from "../student";

// Criar usuário + aluno
export const createUserAndStudent = async (formData: any) => {
  // 1️⃣ Cria user
  const user = await createUser(formData);

  // 2️⃣ Atribui role 'student'
  await assignRoleToUser(user.id, "student");

  // 3️⃣ Cria student com os campos específicos
  const student = await createOrUpdateStudent(formData, user.id, "create");

  return { user, student };
};

// Atualizar usuário + aluno
export const updateUserAndStudent = async (
  formData: any,
  userId: number,
  studentId: number
) => {
  const user = await updateUser(userId, formData);
  const student = await createOrUpdateStudent(formData, userId, "update", studentId);
  return { user, student };
};
