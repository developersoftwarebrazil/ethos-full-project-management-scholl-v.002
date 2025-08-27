// types/teacher.ts
export type TeachingSubject = {
  id: number;
  name: string;
  description: string;
};

export type Teacher = {
  id?: number | string;
  teacherId: number | string;
  name: string;
  username: string;
  email: string;
  phone: string;
  teaching_subjects: TeachingSubject[];
  classes: string[];
  photo?: string;
  hire_date: string;
};
