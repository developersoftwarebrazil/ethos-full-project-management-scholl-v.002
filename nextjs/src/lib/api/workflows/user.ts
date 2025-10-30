import { createUser, updateUser } from "../users";
import { assignRoleToUser } from "../users";

/**
 * Criar usuário genérico e opcionalmente atribuir um papel
 */
export const createUserWithRole = async (formData: any, role?: string) => {
  const user = await createUser(formData);

  if (role) {
    await assignRoleToUser(user.id, role);
  }

  return { user };
};

/**
 * Atualizar usuário genérico
 */
export const updateUserGeneric = async (
  formData: any,
  userId: number
) => {
  const user = await updateUser(userId, formData);
  return { user };
};
