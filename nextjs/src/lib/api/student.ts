// lib/api/students.ts
import { createUser, assignRoleToUser, updateUser } from "./user";

export const createOrUpdateStudent = async (
  formData: any,
  userId: number,
  type: "create" | "update",
  studentId?: number
) => {
  const studentForm = new FormData();
  studentForm.append("user_id", userId.toString());
  if (formData.birthday) studentForm.append("birthday", formData.birthday);
  if (formData.sex) studentForm.append("sex", formData.sex);
  if (formData.bloodType) studentForm.append("bloodType", formData.bloodType);
  if (formData.classroom) studentForm.append("classroom", formData.classroom.toString());
  if (formData.grade) studentForm.append("grade", formData.grade.toString());

  const url =
    type === "create"
      ? "http://localhost:8000/api/students/"
      : `http://localhost:8000/api/students/${studentId}/`;

  const res = await fetch(url, {
    method: type === "create" ? "POST" : "PUT",
    body: studentForm,
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
};
