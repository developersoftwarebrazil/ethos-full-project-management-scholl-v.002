import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import FormModel from "@/components/Forms/FormModel";
import { role } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import StudentRow from "@/components/Lists/StudentRow";
import { Student } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const columns = [
  { headers: "Info", accessor: "info" },
  // {
  //   headers: "Nome de usuário",
  //   accessor: "username",
  //   className: "hidden md:table-cell",
  // },
  {
    headers: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    headers: "Nota",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  { headers: "Telefone", accessor: "phone", className: "hidden lg:table-cell" },
  {
    headers: "Endereço",
    accessor: "address",
    className: "hidden md:table-cell",
  },

  { headers: "Ações", accessor: "action" },
];

type StudentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
};

async function getStudents(
  page: number = 1,
  search: string = ""
): Promise<StudentResponse> {
  try {
    const query = new URLSearchParams();
    query.set("page", page.toString());
    if (search) query.set("search", search); // Django DRF já entende search=xxx

    // const res = await fetch(`${API_URL}/api/students/?page=${page}`, {
    //   next: { revalidate: 60 }, // 1 minuto
    // });

        const res = await fetch(`${API_URL}/api/teachers/?${query.toString()}`, {
      next: { revalidate: 60 }, // 1 minuto
    });

    if (!res.ok) throw new Error("Erro ao buscar alunos");
    return res.json();
  } catch (error) {
    console.error(error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
}

export default async function StudentListPage({
  searchParams,
}: {
  searchParams?: { page?: string; search?: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.search || "";

  const { results, count } = await getStudents(page, search);
  const totalPages = Math.ceil(count / ITEM_PER_PAGE); // se PAGE_SIZE = 10
  // const data = await getTeachers();

  return (
    <div className="flex-1 bg-white rounded-md p-4 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Todos os alunos
        </h1>
        <div className="flex flex-col md:flex-row items-center w-full gap-4 md:w-auto">
          <TableSearcher />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filtrar" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Ordenar" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="student" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table
        columns={columns}
        data={results}
        renderRow={(student) => (
          <StudentRow key={student.id} student={student} />
        )}
      />

      {/* PAGINATION */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
