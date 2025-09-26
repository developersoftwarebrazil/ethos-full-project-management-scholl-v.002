import { Role } from "./role";
import { TeacherClassroom, TeachingSubject } from "./teachingSubject";

export type Teacher = {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: Role[]; // <- objeto, não string
    description: string | null;
    phone: string | null;
    address: string | null;
    img: string | null;
    subjects?: string[]; // <- opcional, conforme API
  };
  hire_date: string;
  sex: string;
  bloodType: string;
  birthday: string;
  createdAt: string;
  teaching_subjects?: TeachingSubject[];
  teaching_classrooms?: TeacherClassroom[];
  supervised_classrooms?: { id: number; name: string }[];
};

export type TeacherResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Teacher[];
};
