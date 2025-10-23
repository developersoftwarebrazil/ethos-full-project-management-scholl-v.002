// components/Lists/SubjectRow.tsx
import Image from "next/image";
import Link from "next/link";
import FormModel from "@/components/Forms/FormModel";
import { Subject } from "@/lib/types/subject";
import { role } from "@/lib/data";

function formatSubjects(subjects: Subject["teachers"]) {
  return subjects
  ?.map((t) =>{
    if(typeof t === "number") return `ID: ${t}`;//Quando só temos o ID
    if(t?.user) return `${t.user.first_name} ${t.user.last_name}`;//Objeto completo
    return "-";
    } )
    .join(", ") || "-";
}

export default function SubjectRow({ subject }: { subject: Subject }) {
  return (
    <tr
      key={subject.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight "
    >
      {/* Info */}
      <td className="p-4">
        <h3 className="font-semibold uppercase">{subject.name}</h3>
        <p className="text-xs text-gray-500">{subject.description || "-"}</p>
      </td>

      <td className="hidden md:table-cell">
        {formatSubjects(subject.teachers)}
      </td>

      {/* Ações */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/subjects/${subject.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="Visualizar" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModel table="subject" type="delete" id={subject.id} />
          )}
        </div>
      </td>
    </tr>
  );
}
