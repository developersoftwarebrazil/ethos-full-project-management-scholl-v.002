"use client";

import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: Props) => {
  return (
    <div className="flex items-center justify-center text-gray-500 p-4 ">
      {/* Prev */}
      <Link
        href={`?page=${currentPage - 1}`}
        aria-disabled={currentPage === 1}
        className="rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4"
      >
        Prev
      </Link>
      {/* Números */}
      <div className=" flex items-center text-sm gap-2">
        <button className="px-2 rounded-sm bg-lamaSky">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`?page=${p}`}
              className={`px-2 rounded-sm ${
                p === currentPage ? "bg-lamaSky" : ""
              }`}
            >
              {p}
            </Link>
          ))}
        </button>
      </div>
      {/* Next */}
      <Link
        href={`?page=${currentPage + 1}`}
        className="rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4"
        aria-disabled={currentPage === totalPages}
        >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
