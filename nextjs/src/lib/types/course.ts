import { Classroom } from "./classroom";
import { Subject } from "./subject";

export type Course = {
  id: number;
  titleCourse: string;
  description: string;
  classrooms: Classroom[];
  subjects: Subject[];
};