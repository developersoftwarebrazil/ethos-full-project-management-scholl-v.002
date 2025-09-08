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
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[]; // <- array, não string
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
  teaching_subjects?: { id: number; name: string }[];
  supervised_classrooms?: { id: number; name: string }[];
};

export type TeacherResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Teacher[];
};