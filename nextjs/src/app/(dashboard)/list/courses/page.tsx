// app/list/courses/page.tsx
import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import FormModel from "@/components/Forms/FormModel";
import CourseRow from "@/components/Lists/CourseRow";
import { Course } from "@/lib/types/course";
import { role } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const columns = [
  { headers: "Título / Descrição", accessor: "info" },
  { headers: "Turmas", accessor: "classrooms", className: "hidden md:table-cell" },
  { headers: "Disciplinas", accessor: "subjects", className: "hidden md:table-cell" },
  { headers: "Ações", accessor: "action" },
];

type CourseResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
};

async function getCourses(
  page: number = 1,
  search: string = ""
): Promise<CourseResponse> {
  try {
    const query = new URLSearchParams();
    query.set("page", page.toString());
    if (search) query.set("search", search);

    const res = await fetch(`${API_URL}/api/courses/?${query.toString()}`, {
      next: { revalidate: 60 }, // 1 minuto
    });
    if (!res.ok) throw new Error("Erro ao buscar courses");
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

export default async function CourseListPage({
  searchParams,
}: {
  searchParams?: { page?: string; search?: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.search || "";

  const { results, count } = await getCourses(page, search);
  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  return (
    <div className="flex-1 bg-white rounded-md p-4 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Todos os Cursos
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
            {role === "admin" && <FormModel table="course" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table
        columns={columns}
        data={results}
        renderRow={(course) => <CourseRow key={course.id} course={course} />}
      />

      {/* PAGINATION */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}


// // app/list/subjects/page.tsx
// import Table from "@/components/Lists/Table";
// import TableSearcher from "@/components/Lists/TableSearcher";
// import Pagination from "@/components/Paginations/Pagination";
// import FormModel from "@/components/Forms/FormModel";
// import SubjectRow from "@/components/Lists/SubjectRow";
// import { Subject } from "@/lib/types/subject";
// import { role } from "@/lib/data";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import Image from "next/image";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// const columns = [
//   { headers: "Nome / Descrição", accessor: "info" },
//   { headers: "Professores", accessor: "teachers", className: "hidden md:table-cell" },
//   { headers: "Ações", accessor: "action" },
// ];

// type SubjectResponse = {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: Subject[];
// };

// async function getSubjects(
//   page: number = 1,
//   search: string = ""
// ): Promise<SubjectResponse> {
//   try {
//     const query = new URLSearchParams();
//     query.set("page", page.toString());
//     if (search) query.set("search", search);

//     const res = await fetch(`${API_URL}/api/subjects/?${query.toString()}`, {
//       next: { revalidate: 60 }, // 1 minuto
//     });
//     if (!res.ok) throw new Error("Erro ao buscar subjects");
//     return res.json();
//   } catch (error) {
//     console.error(error);
//     return {
//       count: 0,
//       next: null,
//       previous: null,
//       results: [],
//     };
//   }
// }

// export default async function SubjectListPage({
//   searchParams,
// }: {
//   searchParams?: { page?: string; search?: string };
// }) {
//   const page = searchParams?.page ? parseInt(searchParams.page) : 1;
//   const search = searchParams?.search || "";

//   const { results, count } = await getSubjects(page, search);
//   const totalPages = Math.ceil(count / ITEM_PER_PAGE);

//   return (
//     <div className="flex-1 bg-white rounded-md p-4 m-4 mt-0">
//       {/* TOP */}
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">
//           Todos os Cursos
//         </h1>
//         <div className="flex flex-col md:flex-row items-center w-full gap-4 md:w-auto">
//           <TableSearcher />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               <Image src="/filter.png" alt="Filtrar" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               <Image src="/sort.png" alt="Ordenar" width={14} height={14} />
//             </button>
//             {role === "admin" && <FormModel table="subject" type="create" />}
//           </div>
//         </div>
//       </div>

//       {/* LIST */}
//       <Table
//         columns={columns}
//         data={results}
//         renderRow={(subject) => <SubjectRow key={subject.id} subject={subject} />}
//       />

//       {/* PAGINATION */}
//       <Pagination currentPage={page} totalPages={totalPages} />
//     </div>
//   );
// }
