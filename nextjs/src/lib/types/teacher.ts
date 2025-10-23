import { Classroom } from "./classroom";
import { Role } from "./role";
import { TeacherClassroom, TeachingSubject } from "./teachingSubject";
import { UserData } from "./userData";

export type Teacher = {
  id: number;
  user: UserData;
  hire_date: string;
  createdAt: string;
  teaching_subjects?: TeachingSubject[];
  teaching_classrooms?: Classroom[];
  supervised_classrooms: Classroom[];
  // supervised_classrooms: { id: number; name: string }[];
  // teaching_classrooms: { id: number; name: string }[];
};