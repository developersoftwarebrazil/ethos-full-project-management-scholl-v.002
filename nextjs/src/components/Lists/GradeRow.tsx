// src/components/Lists/GradeRow.tsx
import Image from "next/image";
import Link from "next/link";
import FormModel from "@/components/Forms/FormModel";
import { role } from "@/lib/data";
import { Grade } from "@/lib/types/grade";

export default function GradeRow({ grade }: { grade: Grade }) {
  return (
    <tr
      key={grade.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Info */}
      <td className="flex items-center gap-4 p-4">

        <div className="flex flex-col">
          <h3 className="font-semibold uppercase">{grade.name}</h3>
          <p className="text-xs text-gray-500">
            {grade.description || "Sem descrição"}
          </p>
        </div>
      </td>

      {/* Colunas adicionais */}
      <td className="hidden md:table-cell">{grade.level || "-"}</td>
      <td className="hidden md:table-cell capitalize">{grade.name}</td>
      <td className="hidden lg:table-cell">{grade.description || "-"}</td>

      {/* Ações */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/grades/${grade.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="Visualizar" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModel table="grade" type="delete" id={grade.id} />
          )}
        </div>
      </td>
    </tr>
  );
}
