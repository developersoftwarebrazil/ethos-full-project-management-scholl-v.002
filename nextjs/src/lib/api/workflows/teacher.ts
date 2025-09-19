import { createUser, assignRoleToUser, updateUser } from "../users";
import { createOrUpdateTeacher } from "../teachers";

// Criar usuário + professor
export const createUserAndTeacher = async (formData: any) => {
  const user = await createUser(formData);
  await assignRoleToUser(user.id, "teacher");
  const teacher = await createOrUpdateTeacher(formData, user.id, "create");
  return { user, teacher };
};

// Atualizar usuário + professor
export const updateUserAndTeacher = async (
  formData: any,
  userId: number,
  teacherId: number
) => {
  const user = await updateUser(userId, formData);
  const teacher = await createOrUpdateTeacher(
    formData,
    userId,
    "update",
    teacherId
  );
  return { user, teacher };
};
