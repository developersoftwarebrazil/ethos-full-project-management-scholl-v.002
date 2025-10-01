"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TableSearcher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1"); //resetar a paginação
      // router.push(`${params.toString()}`)
      router.push(`?${params.toString()}`, { scroll: false });

    }, 500); // debounce de 0.5s
    return ()=>clearTimeout(delayDebounce)
  }, [value, router, searchParams]);
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-md ring-[1px] ring-orange-400 px-2">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        value={value}
        onChange={(e)=> setValue(e.target.value)}
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none text-orange-800 placeholder:text-green-600"
      />
    </div>
  );
};

export default TableSearcher;
