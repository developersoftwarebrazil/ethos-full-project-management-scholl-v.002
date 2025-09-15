import { Role } from "./role";
import { Classroom } from "./classroom";

export type Student = {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: Role[];
    phone: string | null;
    address: string | null;
    img: string | null;
  };
  birthday: string;
  bloodType: string;
  sex: "M" | "F" | "O";
  enrolled_classrooms?: Classroom[];
  createdAt: string;
};

export type StudentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
};
