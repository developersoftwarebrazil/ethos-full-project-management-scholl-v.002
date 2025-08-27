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
  name: string;
  username: string;
  email: string;
  phone: string;
  teaching_subjects: TeachingSubject[];
  supervised_classrooms: Classroom[];
  classes: string[];
  photo?: string;
  hire_date: string;
};
