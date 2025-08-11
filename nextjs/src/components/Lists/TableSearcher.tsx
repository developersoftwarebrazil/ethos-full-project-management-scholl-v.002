import Image from "next/image";
const TableSearcher = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-md ring-[1px] ring-orange-400 px-2">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none text-orange-800 placeholder:text-green-600"
      />
    </div>
  );
};

export default TableSearcher;
