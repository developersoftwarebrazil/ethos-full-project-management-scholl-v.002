import { Role } from "./role";
import { StudentClassroom, StudentSubject } from "./course";
import { UserData } from "./userData";

export type Student = {
  id: number;
  user: UserData;
  createdAt: string;
  classroom?: { id: number; name: string } | null;
  grade?: { id: number; name: string } | null;
};
