// lib/hooks/useAutoUsername.ts
import { useEffect } from "react";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";
import { normalizeUsername } from "../utils/normalize";

/**
 * Gera username automaticamente apenas quando firstName e lastName estiverem preenchidos.
 * - setValue espera Path<T>, por isso usamos esse tipo para fieldName.
 */
export const useAutoUsername = <T extends FieldValues>(
  firstName: string,
  lastName: string,
  setValue: UseFormSetValue<T>,
  fieldName?: Path<T>
) => {
  useEffect(() => {
    const f = firstName?.trim();
    const l = lastName?.trim();

    if (!fieldName) return;
    if (!f || !l) return; // NÃO gera username se faltar um dos nomes

    const username = normalizeUsername(f, l);
    setValue(fieldName, username as any);
  }, [firstName, lastName, setValue, fieldName]);
};


// import { useEffect, useRef } from "react";
// import { findUserByUsername } from "@/lib/api/users";
// import { UseFormSetValue } from "react-hook-form";

// export function useAutoUsername(
//   firstName: string,
//   lastName: string,
//   setValue: UseFormSetValue<any>, // <- aqui
//   fieldName: keyof any, // <- aqui
//   setExists?: (exists: boolean) => void,
//   onUserFound?: (user: any) => void
// ) {
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (!firstName || !lastName) return;

//     const username = `${firstName}.${lastName}`.toLowerCase() + "@user.com";
//     setValue(fieldName as any, username); // cast para garantir compatibilidade

//     if (timeoutRef.current) clearTimeout(timeoutRef.current);

//     timeoutRef.current = setTimeout(async () => {
//       if (setExists || onUserFound) {
//         try {
//           const user = await findUserByUsername(username);

//           if (user) {
//             setExists?.(true);
//             onUserFound?.(user); // <-- popula os campos do formulário
//           } else {
//             setExists?.(false);
//           }
//         } catch (err) {
//           console.error("Erro ao verificar username:", err);
//           setExists?.(false);
//         }
//       }
//     }, 500);

//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [firstName, lastName, setValue, fieldName, setExists, onUserFound]);
// }
