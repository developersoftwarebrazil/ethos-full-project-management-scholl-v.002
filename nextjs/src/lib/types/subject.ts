// lib/types/subject.ts
import { Teacher } from "./teacher";

export type Subject = {
  id: number;
  name: string;
  description?: string;
  teachers: Teacher[];
}
