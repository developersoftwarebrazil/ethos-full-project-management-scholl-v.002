// lib/api/workflows/student.ts
import { createUser, assignRoleToUser, updateUser } from "../users";
import { createOrUpdateStudent } from "../students";

// Função auxiliar para unir user + student em um único objeto
const mergeUserAndStudent = (user: any, student: any) => {
  return {
    // --- Campos do usuário ---
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    roles: user.roles,
    description: user.description,
    phone: user.phone,
    address: user.address,
    img: user.img,

    // --- Campos do aluno ---
    student_id: student.id,
    birthday: student.birthday,
    sex: student.sex,
    bloodType: student.bloodType,
    classroom: student.classroom,
    grade: student.grade,
    createdAt: student.createdAt,
  };
};

// Criar usuário + aluno
export const createUserAndStudent = async (formData: any) => {
  const user = await createUser(formData);
  await assignRoleToUser(user.id, "student");
  const student = await createOrUpdateStudent(formData, user.id, "create");

  return mergeUserAndStudent(user, student);
};

// Atualizar usuário + aluno
export const updateUserAndStudent = async (
  formData: any,
  userId: number,
  studentId: number
) => {
  const user = await updateUser(userId, formData);
  const student = await createOrUpdateStudent(formData, userId, "update", studentId);

  return mergeUserAndStudent(user, student);
};
