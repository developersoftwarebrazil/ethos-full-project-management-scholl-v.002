import { Classroom } from "./classroom";
import { Teacher } from "./teacher";

// Tipo para Subject
export type Subject = {
  id: number;
  name: string;
  description: string;
  teachers: Teacher[];
  classrooms: Classroom[];
};

// Tipo da resposta da API
export type SubjectResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Subject[];
};
