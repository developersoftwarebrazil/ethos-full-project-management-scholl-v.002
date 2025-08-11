import FormModel from "@/components/Forms/FormModel";
import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import { lessonsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

const columns = [
  {
    headers: "Subject Name",
    accessor: "Subject",
    className: "hidden md:table-cell",
  },
  {
    headers: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    headers: "teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },
  { headers: "Actions", accessor: "action" },
];
const LessonsListPage = () => {
  const renderRow = (item: Lesson) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="hidden md:table-cell">{item.subject}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>

      <td>
        <div className="flex items-center gap-2">
        
        
          {role === "admin" && (
            <>
            <FormModel table="lesson" type="update" data={item} />
            <FormModel table="lesson" type="delete" id={item.id} />
          </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="flex-1 bg-white rounded-md p-4 m-4 mt-0">
      {/*  TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center w-full  gap-4 md:w-auto ">
          <TableSearcher />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button> */}
            {role === "admin" && <FormModel table="lesson" type="create" />}
          </div>
        </div>
      </div>
      {/*  LIST */}
      <Table columns={columns} renderRow={renderRow} data={lessonsData} />

      {/*  PAGINATIION */}
      <Pagination />
    </div>
  );
};

export default LessonsListPage;
