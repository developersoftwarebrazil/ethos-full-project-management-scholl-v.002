"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, logout as apiLogout } from "@/lib/api/auth";
import { UserData } from "@/lib/types/userData";

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await apiLogin(username, password);

    // guarda tokens
    localStorage.setItem("access", res.access);
    localStorage.setItem("refresh", res.refresh);

    // formata roles em array
    const roles = res.roles
      ? res.roles.split(",").map((r: string) => ({ id: 0, name: r.trim() }))
      : [];

    const userData: UserData = {
      id: 0,
      username: res.username,
      email: res.email,
      first_name: "",
      last_name: "",
      roles,
      birthday: null,
      description: null,
      bloodType: null,
      sex: null,
      phone: null,
      address: null,
      img: null,
      subjects: [],
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
};
