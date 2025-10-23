import { Teacher } from "./teacher";
import { Student } from "./student";

export type Classroom = {
  id: number;
  name: string;
  grade: number;
  supervisor: Teacher;
  students: Student[];
};