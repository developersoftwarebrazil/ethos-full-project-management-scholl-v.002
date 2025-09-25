// src/lib/hooks/useCheckExistingUser.ts
import { useEffect, useState } from "react";

export const useCheckExistingUser = (username: string) => {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    let active = true;

    const check = async () => {
      if (!username) {
        setExists(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/api/users/?search=${username}`);
        if (!res.ok) {
          throw new Error("Erro ao verificar usuário");
        }

        const data = await res.json();
        if (active) {
          // 🔹 Se achar algum usuário com username igual, marca como existente
          const found = data.results.some((u: any) => u.username === username);
          setExists(found);
        }
      } catch (err) {
        console.error("❌ Erro ao verificar usuário:", err);
        if (active) setExists(false);
      }
    };

    check();

    return () => {
      active = false;
    };
  }, [username]);

  return exists;
};
