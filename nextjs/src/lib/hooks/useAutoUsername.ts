// lib/hooks/useAutoUsername.ts
import { useEffect } from "react";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";
import { normalizeUsername } from "@/lib/utils/normalize";

/**
 * Hook para gerar automaticamente o username a partir de first_name e last_name
 * @param firstName - nome do usuário
 * @param lastName - sobrenome do usuário
 * @param setValue - função do react-hook-form para setar o valor
 * @param fieldName - campo que receberá o username (default: "username")
 */
export const useAutoUsername = <T extends FieldValues>(
  firstName: string,
  lastName: string,
  setValue: UseFormSetValue<T>,
  fieldName?: Path<T>
) => {
  useEffect(() => {
    if (firstName && lastName && fieldName) {
      const username = normalizeUsername(firstName, lastName);
      setValue(fieldName, username as any); // o "as any" resolve um conflito menor de tipos
    }
  }, [firstName, lastName, setValue, fieldName]);
};
