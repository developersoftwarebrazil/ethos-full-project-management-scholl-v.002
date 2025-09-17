// lib/api/teachers.ts

// Criar ou atualizar professor
export const createOrUpdateTeacher = async (
  formData: any,
  userId: number,
  type: "create" | "update",
  teacherId?: number
) => {
  const teacherForm = new FormData();
  teacherForm.append("user_id", userId.toString());

  if (formData.birthday) teacherForm.append("birthday", formData.birthday);
  if (formData.sex) teacherForm.append("sex", formData.sex);
  if (formData.hire_date) teacherForm.append("hire_date", formData.hire_date);
  if (formData.bloodType) teacherForm.append("bloodType", formData.bloodType);

  const url =
    type === "create"
      ? "http://localhost:8000/api/teachers/"
      : `http://localhost:8000/api/teachers/${teacherId}/`;

  const res = await fetch(url, {
    method: type === "create" ? "POST" : "PUT",
    body: teacherForm,
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
};
