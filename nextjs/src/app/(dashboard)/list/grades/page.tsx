// src/app/(dashboard)/list/grade/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import FormModel from "@/components/Forms/FormModel";
import GradeRow from "@/components/Lists/GradeRow";
import { role } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { GradeResponse } from "@/lib/api/gradeResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const columns = [
  { headers: "Info", accessor: "info" },
  {
    headers: "Nível",
    accessor: "level",
    className: "hidden md:table-cell",
  },
  {
    headers: "Nome da Série",
    accessor: "name",
    className: "hidden md:table-cell",
  },
  {
    headers: "Descrição",
    accessor: "description",
    className: "hidden lg:table-cell",
  },
  { headers: "Ações", accessor: "action" },
];

async function getGrades(page: number = 1, search: string = ""): Promise<GradeResponse> {
  try {
    const query = new URLSearchParams();
    query.set("page", page.toString());
    if (search) query.set("search", search);

    const res = await fetch(`${API_URL}/api/grades/?${query.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Erro ao buscar séries (grades)");
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

export default async function GradeListPage({
  searchParams,
}: {
  searchParams?: { page?: string; search?: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.search || "";

  const { results, count } = await getGrades(page, search);
  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  return (
    <div className="flex-1 bg-white rounded-md p-4 m-4 mt-0">
      {/* TOPO */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Todas as Séries
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
            {role === "admin" && <FormModel table="grade" type="create" />}
          </div>
        </div>
      </div>

      {/* LISTA */}
      <Table
        columns={columns}
        data={results}
        renderRow={(grade) => <GradeRow key={grade.id} grade={grade} />}
      />

      {/* PAGINAÇÃO */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
