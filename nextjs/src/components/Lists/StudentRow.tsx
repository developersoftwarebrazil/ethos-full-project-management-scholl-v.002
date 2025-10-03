// src/components/Lists/StudentRow.tsx
import Image from "next/image";
import Link from "next/link";
import FormModel from "@/components/Forms/FormModel";
import { role } from "@/lib/data";
import { Student } from "@/lib/types";

export default function StudentRow({ student }: { student: Student }) {
  return (
    <tr
      key={student.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Info */}
      <td className="flex items-center gap-4 p-4">
        <Image
          src={student.user.img || "/noAvatar.png"}
          alt={`Foto de ${student.user.first_name} ${student.user.last_name}`}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {student.user.first_name} {student.user.last_name}
          </h3>
          <p className="text-xs text-gray-500">{student.user.email}</p>
        </div>
      </td>

      <td className="hidden md:table-cell">{student.user.id}</td>
      <td className="hidden md:table-cell">{student.grade?.name || "-"}</td>
      <td className="hidden lg:table-cell">{student.user.phone || "-"}</td>
      <td className="hidden lg:table-cell">{student.user.address || "-"}</td>
      {/* <td className="hidden md:table-cell">{student.classroom}</td> */}

      {/* Ações */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${student.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="Visualizar" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModel table="student" type="delete" id={student.user.id} />
          )}
        </div>
      </td>
    </tr>
  );
}
