// lib/api/workflows/teacher.ts
import { UserData } from "@/lib/types";
import { createUser, assignRoleToUser, updateUser } from "../users";
import { createOrUpdateTeacher } from "../teachers";

export const createUserAndTeacher = async (formData: any): Promise<{ user: UserData; teacher: any }> => {
  const user: UserData = await createUser(formData);
  await assignRoleToUser(user.id, "teacher");
  const teacher = await createOrUpdateTeacher(formData, user.id, "create");
  return { user, teacher };
};

export const updateUserAndTeacher = async (
  formData: any,
  userId: number,
  teacherId: number
): Promise<{ user: UserData; teacher: any }> => {
  const user: UserData = await updateUser(userId, formData);
  const teacher = await createOrUpdateTeacher(formData, userId, "update", teacherId);
  return { user, teacher };
};
