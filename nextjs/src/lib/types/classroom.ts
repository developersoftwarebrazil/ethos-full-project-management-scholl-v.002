export type Classroom = {
 id: number;
  name: string;
  grade: number | string;
  course: {
    id: number;
    titleCourse: string;
  };
};