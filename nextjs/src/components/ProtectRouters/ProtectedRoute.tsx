"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/ AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login"); // redireciona para login se não estiver logado
    }
  }, [user, router]);

  if (!user) return null; // ou loader

  return <>{children}</>;
}
