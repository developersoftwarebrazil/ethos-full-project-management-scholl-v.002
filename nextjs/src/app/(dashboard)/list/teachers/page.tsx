import FormModel from "@/components/Forms/FormModel";
import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import { role, teachersData } from "@/lib/data";
import { console } from "inspector";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

type TeachingSubject = {
  id: number;
  name: string;
  description: string;
};

type Teacher = {
  id?: number | string;
  teacherId: number | string;
  name: string;
  username: string;
  email: string;
  phone: string;
  teaching_subjects:TeachingSubject[];
  classes: string[];
  photo?: string;
  hire_date: string;
};

const columns = [
  { headers: "Info", accessor: "info" },
  {
    headers: "Nome de usuário",
    accessor: "username",
    className: "hidden md:table-cell",
  },
  {
    headers: "Matérias",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  // {
  //   headers: "Classes",
  //   accessor: "classes",
  //   className: "hidden md:table-cell",
  // },
  { headers: "Telefone", accessor: "phone", className: "hidden lg:table-cell" },
  {
    headers: "Data de Contratação",
    accessor: "hire_date",
    className: "hidden md:table-cell",
  },
  { headers: "Ações", accessor: "action" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getTeachers(): Promise<Teacher[]> {
  const res = await fetch(`${API_URL}/api/teachers/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar professores");
  return res.json();
}

const TeacherListPage = async () => {
  const data = await getTeachers();

  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Info */}
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>

      {/* Teacher ID */}
      <td className="hidden md:table-cell">{item.username}</td>

      {/* Subjects */}
      <td className="hidden md:table-cell">
        {item.teaching_subjects?.map((subject) => subject.name)?.join(", ")}
      </td>

      {/* Classes */}
      {/* <td className="hidden md:table-cell">{item.classes.join(", ")}</td> */}

      {/* Phone */}
      <td className="hidden md:table-cell">{item.phone}</td>

      {/* Hire Date */}
      <td className="hidden md:table-cell">
        {new Date(item.hire_date).toLocaleDateString("pt-BR")}
      </td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.teacherId}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModel table="teacher" type="delete" id={item.teacherId} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 bg-white rounded-md p-4 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Todos os professores
        </h1>
        <div className="flex flex-col md:flex-row items-center w-full gap-4 md:w-auto">
          <TableSearcher />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModel table="teacher" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
