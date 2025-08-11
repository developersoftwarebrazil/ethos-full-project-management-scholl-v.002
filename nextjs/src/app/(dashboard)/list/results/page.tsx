import FormModel from "@/components/Forms/FormModel";
import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import { examsData, resultsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  date: string;
  type: "exam" | "assignment";
  score: number;
};

const columns = [
  {
    headers: "Subject ",
    accessor: "subject",
    // className: "hidden md:table-cell",
  },
  {
    headers: "Student",
    accessor: "student",
    // className: "hidden lg:table-cell",
  },
  {
    headers: "Score",
    accessor: "score",
    className: "hidden lg:table-cell",
  },
  {
    headers: "Teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },
  {
    headers: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },

  {
    headers: "Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },
  { headers: "Actions", accessor: "action" },
];
const ResultsListPage = () => {
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="">{item.subject}</td>
      <td className="">{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModel table="result" type="update" data={item} />
              <FormModel table="result" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
            {role === "admin" && <FormModel table="result" type="create" />}
          </div>
        </div>
      </div>
      {/*  LIST */}
      <Table columns={columns} renderRow={renderRow} data={resultsData} />

      {/*  PAGINATIION */}
      <Pagination />
    </div>
  );
};

export default ResultsListPage;
