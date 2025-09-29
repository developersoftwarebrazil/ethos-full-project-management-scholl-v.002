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
  if (formData.description) userForm.append("description", formData.description);
  if (formData.sex) userForm.append("sex", formData.sex);
  if (formData.birthday) userForm.append("birthday", formData.birthday);
  if (formData.bloodType) userForm.append("bloodType", formData.bloodType);
  

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
  const res = await fetch(
    `http://localhost:8000/api/users/${userId}/assign-role/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: roleName }),
    }
  );

  if (!res.ok) throw new Error(await res.text());

  return res.json();
};

// Buscar usuário por username
// export const findUserByUsername = async (username: string) => {
//   const res = await fetch(`http://localhost:8000/api/users/?username=${username}`);

//   if (!res.ok) {
//     throw new Error(`Erro ao buscar usuário: ${res.status}`);
//   }

//   const data = await res.json();

//   // retorna o primeiro match (ou null)
//   return data.results.length > 0 ? data.results[0] : null;
// };
// lib/api/users.ts
export const findUserByUsername = async (username: string) => {
  const encoded = encodeURIComponent(username);
  const res = await fetch(`http://localhost:8000/api/users/?username=${encoded}`);

  if (!res.ok) {
    throw new Error(`Erro ao buscar usuário: ${res.status}`);
  }

  const data = await res.json();

  // Segurança: garante que data.results é um array
  const results = Array.isArray(data?.results) ? data.results : [];

  // Tenta achar um username EXATO (case-insensitive) entre os resultados
  const exact = results.find((u: any) => {
    const uName = (u?.username ?? "").toString().toLowerCase();
    return uName === username.toLowerCase();
  });

  // retorno: ou usuário exato, ou null
  return exact || null;
};


// Adicionar role a um usuário existente
export const addRoleToUser = async (userId: number, role: string) => {
  const res = await fetch(`http://localhost:8000/api/users/${userId}/assign-role/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }) // alguns backends podem esperar { roleName: role }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }

  return await res.json();
};

