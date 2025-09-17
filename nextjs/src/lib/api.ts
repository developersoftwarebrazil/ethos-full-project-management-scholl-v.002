// lib/api.ts

// Cria um usuário
export const createUser = async (formData: any) => {
  const userForm = new FormData();
  userForm.append("username", formData.username);
  userForm.append("email", formData.email);
  if (formData.password) userForm.append("password", formData.password);
  userForm.append("first_name", formData.first_name);
  userForm.append("last_name", formData.last_name);
  if (formData.phone) userForm.append("phone", formData.phone);
  if (formData.address) userForm.append("address", formData.address);
  if (formData.img && formData.img[0]) userForm.append("img", formData.img[0]);

  const res = await fetch("http://localhost:8000/api/users/", {
    method: "POST",
    body: userForm,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.json(); // retorna o objeto usuário criado
};


// Atribui role ao usuário (cria se não existir)
export const assignRoleToUser = async (userId: number, roleName: string) => {
  const res = await fetch(`http://localhost:8000/api/users/${userId}/assign-role/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: roleName }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.json();
};

// Cria professor
export const createTeacher = async (formData: any, userId: number, type: "create" | "update", teacherId?: number) => {
  const teacherForm = new FormData();
   teacherForm.append("user_id", userId.toString()); // 👈 agora usamos user_id

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

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.json();
};

// Função "macro" para criar usuário + role + professor em uma única chamada
export const createUserAndTeacher = async (formData: any) => {
  // 1️⃣ Criar usuário
  const user = await createUser(formData);

  // 2️⃣ Atribuir role 'teacher' pelo name
  await assignRoleToUser(user.id, "teacher");

  // 3️⃣ Criar professor usando user.id
  const teacher = await createTeacher(formData, user.id, "create");

  return { user, teacher };
};

// Função "macro" para atualizar usuário + professor em uma única chamada
// Atualiza um usuário existente
export const updateUser = async (userId: number, formData: any) => {
  const userForm = new FormData();
  userForm.append("username", formData.username);
  userForm.append("email", formData.email);
  if (formData.password) userForm.append("password", formData.password);
  userForm.append("first_name", formData.first_name);
  userForm.append("last_name", formData.last_name);
  if (formData.phone) userForm.append("phone", formData.phone);
  if (formData.address) userForm.append("address", formData.address);
  if (formData.img && formData.img[0]) userForm.append("img", formData.img[0]);

  const res = await fetch(`http://localhost:8000/api/users/${userId}/`, {
    method: "PUT",
    body: userForm,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.json();
};

// Função "macro" para atualizar usuário + professor
export const updateUserAndTeacher = async (formData: any, userId: number, teacherId: number) => {
  // 1️⃣ Atualizar usuário
  const user = await updateUser(userId, formData); // ✅ agora existe

  // 2️⃣ Atualizar professor
  const teacher = await createTeacher(formData, userId, "update", teacherId);

  return { user, teacher };
};
