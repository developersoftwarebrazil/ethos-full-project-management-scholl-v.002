// lib/api/users.ts

// Criar usuário
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

  if (!res.ok) throw new Error(await res.text());

  return res.json();
};

// Atualizar usuário
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

  if (!res.ok) throw new Error(await res.text());

  return res.json();
};

// Atribuir role
export const assignRoleToUser = async (userId: number, roleName: string) => {
  const res = await fetch(`http://localhost:8000/api/users/${userId}/assign-role/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: roleName }),
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
};
