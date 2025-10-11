import { Classroom } from "./classroom";
import { Subject } from "./subject"; // já existente conforme você mostrou
import { Teacher } from "./teacher"; // já existente
import { Student } from "./student"; // já existente

// ==========================
// Course principal (DRF CourseSerializer)
// ==========================
export type Course = {
  id: number;
  titleCourse: string;
  description: string;
  classrooms: Classroom[];
  subjects: Subject[];
};
