// types/course.ts

// ==========================
// User (simplificado)
// ==========================
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  description?: string;
  phone?: string;
  address?: string;
  img?: string | null;
  sex?: string | null;
  bloodType?: string | null;
  birthday?: string | null;
  subjects: string[];
}

// ==========================
// Teacher
// ==========================
export interface Teacher {
  id: number;
  user: User;
  hire_date: string;       // Date em formato ISO
  createdAt: string;       // DateTime em formato ISO
  supervised_classrooms: ClassroomBasic[];
  teaching_classrooms: ClassroomBasic[];
}

// ==========================
// Classroom (simplificado para CourseSerializer)
// ==========================
export interface ClassroomBasic {
  id: number;
  name: string;
}

export interface Classroom extends ClassroomBasic {
  grade: number;           // id da Grade (FK)
  supervisor: Teacher | null;
  students: Student[];
}

// ==========================
// Student (simplificado)
// ==========================
export interface Student {
  id: number;
  user: User;
  createdAt: string;
  classroom: number | null;  // FK id
  grade: number | null;      // FK id
}

// ==========================
// Subject
// ==========================
export interface Subject {
  id: number;
  name: string;
  description?: string;
  teachers: Teacher[];
}

// ==========================
// Course principal
// ==========================
export interface Course {
  id: number;
  titleCourse: string;
  description: string;
  classrooms: Classroom[];
  subjects: Subject[];
}
