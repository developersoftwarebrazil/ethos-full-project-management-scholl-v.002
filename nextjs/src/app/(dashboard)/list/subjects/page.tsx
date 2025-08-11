import FormModel from "@/components/Forms/FormModel";
import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import { role, subjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    headers: "Subject names",
    accessor: "name",
    className: "hidden md:table-cell",
  },

  {
    headers: "Teachers",
    accessor: "teachers",
    className: "hidden lg:table-cell",
  },
  { headers: "Actions", accessor: "action" },
];
const SubjectsListPage = () => {
  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="hidden md:table-cell">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.join(",")}</td>

      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/subjects/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky ">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModel table="subject" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="flex-1 bg-white rounded-md p-4 m-4 mt-0">
      {/*  TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center w-full  gap-4 md:w-auto ">
          <TableSearcher />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>

            {role === "admin" && <FormModel table="subject" type="create" />}
          </div>
        </div>
      </div>
      {/*  LIST */}
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />

      {/*  PAGINATIION */}
      <Pagination />
    </div>
  );
};

export default SubjectsListPage;
