// src/components/Lists/CourseRow.tsx
import Image from "next/image";
import Link from "next/link";
import FormModel from "@/components/Forms/FormModel";
import { role } from "@/lib/data";
import { Course } from "@/lib/types";

export default function CourseRow({ course }: { course: Course }) {
  return (
    <tr
      key={course.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Info do curso */}
      <td className="flex flex-col p-4">
        <h3 className="font-semibold">{course.titleCourse}</h3>
        <p className="text-xs text-gray-500">{course.description}</p>
      </td>

    {/* Turmas  */}
      {/* <td className="hidden md:table-cell">{course.classrooms?.length ?? 0}</td> */}
      <td className="hidden md:table-cell">{course.classrooms?.map(classroom => classroom.name).join(", ")}</td>
      {/* Disciplinas */}
      {/* <td className="hidden md:table-cell">{course.subjects?.length ?? 0}</td> */}
      <td className="hidden md:table-cell">{course.subjects?.map(subject => subject.name).join(", ")}</td>

      {/* Ações */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/courses/${course.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="Visualizar" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <>
              <FormModel table="course" type="update" data={course} />
              <FormModel table="course" type="delete" id={course.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
