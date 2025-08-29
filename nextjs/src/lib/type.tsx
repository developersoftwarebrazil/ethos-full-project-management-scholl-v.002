// types/teacher.ts
export type TeachingSubject = {
  id: number;
  name: string;
  description: string;
};

export type Classroom = {
 id: number;
  name: string;
  grade: number | string;
  course: {
    id: number;
    titleCourse: string;
  };
};

export type Teacher = {
  id?: number | string;
  teacherId: number | string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  hire_date: string;
  photo?: string;
  teaching_subjects: TeachingSubject[];
  supervised_classrooms: Classroom[];
};
export type TeacherResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Teacher[];
};