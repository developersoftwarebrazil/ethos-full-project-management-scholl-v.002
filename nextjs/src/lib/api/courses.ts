// lib/api/courses.ts

export const createOrUpdateCourse = async (
  formData: any,
  type: "create" | "update",
  courseId?: number
) => {
  const courseForm = new FormData();

  // Campos básicos obrigatórios
  if (formData.titleCourse)
    courseForm.append("titleCourse", formData.titleCourse);
  if (formData.description)
    courseForm.append("description", formData.description);

  // Campos relacionais (muitos para muitos)
  // classroom_ids e subject_ids devem ser arrays de IDs
  if (Array.isArray(formData.classroom_ids)) {
    formData.classroom_ids.forEach((id: number) =>
      courseForm.append("classrooms", id.toString())
    );
  }

  if (Array.isArray(formData.subject_ids)) {
    formData.subject_ids.forEach((id: number) =>
      courseForm.append("subjects", id.toString())
    );
  }

  // Define a URL correta
  const url =
    type === "create"
      ? "http://localhost:8000/api/courses/"
      : `http://localhost:8000/api/courses/${courseId}/`;

  const res = await fetch(url, {
    method: type === "create" ? "POST" : "PUT",
    body: courseForm,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};
