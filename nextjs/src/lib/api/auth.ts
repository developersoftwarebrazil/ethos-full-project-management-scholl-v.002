// lib/api/auth.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/accounts"; // browser
const SERVER_BASE_URL = process.env.SERVER_API_URL || "http://django:8000/api/accounts"; // server-side / Docker

export type TokenResponse = {
  access: string;
  refresh: string;
  username: string;
  email: string;
  roles: string;
};

// Helper para lidar com respostas JSON e erros da API
async function handleResponse(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || "Erro na requisição");
  }
  return data;
}

// Função de login
export async function login(username: string, password: string, serverSide = false): Promise<TokenResponse> {
  const url = serverSide ? SERVER_BASE_URL : BASE_URL;
  const res = await fetch(`${url}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(res);
}

// Renovar token
export async function refreshToken(refresh: string, serverSide = false) {
  const url = serverSide ? SERVER_BASE_URL : BASE_URL;
  const res = await fetch(`${url}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  return handleResponse(res);
}

// Logout
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
  }
}
