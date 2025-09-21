
import { Role } from "./role";
import { StudentClassroom, StudentSubject } from "./studentSubject";

export type Student = {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: Role[]; // <- objeto, não string
    phone: string | null;
    address: string | null;
    img: string | null;
  };
  sex: string;
  bloodType: string;
  birthday: string;
  createdAt: string;
  classroom?: { id: number; name: string } | null;
  grade?: { id: number; name: string } | null;
};

export type StudentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
};
