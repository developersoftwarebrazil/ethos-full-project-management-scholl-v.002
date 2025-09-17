import { Role } from "./role";
import { Classroom } from "./classroom";
import { StudentSubject } from "./studentSubject";

export type Student = {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: Role[];
    phone?: string | null;
    address?: string | null;
    img?: string | null;
    subjects: StudentSubject[];
  };
  birthday: string;
  bloodType: string;
  sex: "MALE" | "FERMALE";
  // enrolled_classrooms?: Classroom[];
  createdAt: string;
  classroom: number; // id
  grade: number; // id
};

export type StudentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
};
