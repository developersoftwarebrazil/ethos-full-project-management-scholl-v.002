import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import FormModel from "@/components/Forms/FormModel";
import TeacherRow from "@/components/Lists/TeacherRow";
import { Teacher } from "@/lib/type";
import { role } from "@/lib/data";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const columns = [
  { headers: "Info", accessor: "info" },
  { headers: "Nome de usuário", accessor: "username", className: "hidden md:table-cell" },
  { headers: "Matérias", accessor: "subjects", className: "hidden md:table-cell" },
  { headers: "Telefone", accessor: "phone", className: "hidden lg:table-cell" },
  { headers: "Data de Contratação", accessor: "hire_date", className: "hidden md:table-cell" },
  { headers: "Ações", accessor: "action" },
];

async function getTeachers(): Promise<Teacher[]> {
  try {
    const res = await fetch(`${API_URL}/api/teachers/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Erro ao buscar professores");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function TeacherListPage() {
  const data = await getTeachers();

  return (
    <div className="flex-1 bg-white rounded-md p-4 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Todos os professores</h1>
        <div className="flex flex-col md:flex-row items-center w-full gap-4 md:w-auto">
          <TableSearcher />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filtrar" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Ordenar" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="teacher" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table
        columns={columns}
        data={data}
        renderRow={(teacher) => <TeacherRow key={teacher.id} teacher={teacher} />}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
}
