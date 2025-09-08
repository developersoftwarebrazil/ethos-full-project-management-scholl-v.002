import Image from "next/image";
import Link from "next/link";
import FormModel from "@/components/Forms/FormModel";
import { Teacher } from "@/lib/type";
import { role } from "@/lib/data";

function formatSubjects(subjects: Teacher["teaching_subjects"]) {
  return subjects?.map((s) => s.name).join(", ") || "-";
}
function formatClassrooms(classrooms: Teacher["supervised_classrooms"]) {
  return classrooms?.map((c) => c.name).join(", ") || "-";
}

export default function TeacherRow({ teacher }: { teacher: Teacher }) {
  return (
    <tr
      key={teacher.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Info */}
      <td className="flex items-center gap-4 p-4">
        <Image
          src={teacher.user.img || "/noAvatar.png"}
          alt={`Foto de ${teacher.user.first_name} ${teacher.user.last_name}`}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{teacher.user.first_name}</h3>
          <p className="text-xs text-gray-500">{teacher.user.email}</p>
        </div>
      </td>

      <td className="hidden md:table-cell">{teacher.user.username}</td>
      {/* <td className="hidden md:table-cell">{formatSubjects(teacher.teaching_subjects)}</td> */}
      <td className="hidden md:table-cell">{teacher.user.subjects?.join(", ")|| "-"}</td>
      <td className="hidden md:table-cell">{formatClassrooms(teacher.supervised_classrooms)}</td>
      <td className="hidden md:table-cell">{teacher.user.phone}</td>
      <td className="hidden md:table-cell">
        {new Date(teacher.hire_date).toLocaleDateString("pt-BR")}
      </td>

      {/* Ações */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${teacher.user.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="Visualizar" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModel table="teacher" type="delete" id={teacher.user.id} />
          )}
        </div>
      </td>
    </tr>
  );
}
