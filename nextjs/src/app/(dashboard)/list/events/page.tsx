import FormModel from "@/components/Forms/FormModel";
import Table from "@/components/Lists/Table";
import TableSearcher from "@/components/Lists/TableSearcher";
import Pagination from "@/components/Paginations/Pagination";
import { eventsData, examsData, resultsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

const columns = [
  {
    headers: "Title ",
    accessor: "title",
    // className: "hidden md:table-cell",
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
  {
    headers: "Start Time",
    accessor: "startTime",
    className: "hidden lg:table-cell",
  },
  {
    headers: "End Time",
    accessor: "endtime",
    className: "hidden lg:table-cell",
  },
  { headers: "Actions", accessor: "action" },
];
const EventsListPage = () => {
  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="">{item.title}</td>
      <td className="">{item.class}</td>
      <td className="">{item.date}</td>
      <td className="hidden md:table-cell">{item.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>

      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/courses/${item.id}`}></Link>
          {role === "admin" && (
            <>
              <FormModel table="event" type="update" data={item} />
              <FormModel table="event" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
            {role === "admin" && <FormModel table="event" type="create" />}
          </div>
        </div>
      </div>
      {/*  LIST */}
      <Table columns={columns} renderRow={renderRow} data={eventsData} />

      {/*  PAGINATIION */}
      <Pagination />
    </div>
  );
};

export default EventsListPage;
