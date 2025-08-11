const Pagination = () => {
  return (
    <div className="flex items-center justify-center text-gray-500 p-4 ">
      <button
        disabled
        className="rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4"
      >
        Prev
      </button>
      <div className=" flex items-center text-sm gap-2">
        <button className="px-2 rounded-sm bg-lamaSky">1</button>
        <button className="px-2 rounded-sm ">2</button>
        <button className="px-2 rounded-sm ">3</button>
        <button className="px-2 rounded-sm ">...</button>
        <button className="px-2 rounded-sm ">10</button>
      </div>
      <button className="rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4">
        Next
      </button>
    </div>
  );
};

export default Pagination;
