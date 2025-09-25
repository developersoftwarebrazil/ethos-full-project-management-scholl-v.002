import { useEffect, useRef } from "react";
import { findUserByUsername } from "@/lib/api/users";
import { UseFormSetValue } from "react-hook-form";

export function useAutoUsername(
  firstName: string,
  lastName: string,
  setValue: UseFormSetValue<any>, // <- aqui
  fieldName: keyof any,           // <- aqui
  setExists?: (exists: boolean) => void
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!firstName || !lastName) return;

    const username = `${firstName}.${lastName}`.toLowerCase() + "@user.com";
    setValue(fieldName as any, username); // cast para garantir compatibilidade

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (setExists) {
        try {
          const user = await findUserByUsername(username);
          setExists(!!user);
        } catch (err) {
          console.error("Erro ao verificar username:", err);
          setExists(false);
        }
      }
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [firstName, lastName, setValue, fieldName, setExists]);
}
