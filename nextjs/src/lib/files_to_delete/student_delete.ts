// // import { createOrUpdatestudent } from "./student_delete";
// import {
//   assignRoleToUser,
//   createUser,
//   updateUser,
//   findUserByUsername,
// } from "../api/users";

// /**
//  * Workflow que garante usuário + student
//  */
// export const createUserAndStudent = async (formData: any) => {
//   const username = formData.username;

//   // 1️⃣ Verifica se já existe um usuário com esse username
//   let user = await findUserByUsername(username);

//   if (!user) {
//     // Usuário não existe → cria
//     user = await createUser(formData);
//     console.log("✅ Usuário criado:", user.username);
//   } else {
//     console.log("⚠️ Usuário existente encontrado:", user.username);
//   }

//   // 2️⃣ Garante role STUDENT
//   await assignRoleToUser(user.id, "student");

//   // 3️⃣ Cria ou atualiza o student vinculado ao user
//   const student = await createOrUpdatestudent(formData, user.id, "create");

//   return { user, student };
// };

// /**
//  * Atualiza usuário + student
//  */
// export const updateUserAndStudent = async (
//   formData: any,
//   userId: number,
//   studentId: number
// ) => {
//   // Atualiza usuário
//   const user = await updateUser(userId, formData);

//   // Atualiza student vinculado
//   const student = await createOrUpdatestudent(
//     formData,
//     userId,
//     "update",
//     studentId
//   );

//   // Garante role STUDENT
//   await assignRoleToUser(user.id, "student");

//   return { user, student };
// };
