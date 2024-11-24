import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type PaginationProps = {
  page: number;
  decreasePageNumber: () => void;
  increasePageNumber: () => void;
};
const Pagination = ({
  page,
  decreasePageNumber,
  increasePageNumber,
}: PaginationProps) => {
  return (
    <section className="p-2 m-8 justify-between flex w-[300px] mx-auto">
      <button
        onClick={decreasePageNumber}
        disabled={Number(page) === 1 || page === undefined}
        className={`bg-orange-400 text-white rounded-md p-2 w-[40px] h-[40px] hover:pointer disabled:hover:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-white hover:bg-orange-100 hover:text-orange-400 transition-all`}
      >
        <ChevronLeft />
      </button>
      <div className="p-2 w-[40px] h-[40px] bg-orange-400 flex items-center justify-center rounded-md text-white font-extrabold select-none">
        {Number(page) === 1 ? "..." : Number(page) - 1}
      </div>
      <div className="p-2 w-[40px] h-[40px] bg-orange-400 flex items-center justify-center rounded-md text-white font-extrabold select-none">
        {Number(page)}
      </div>
      <div className="p-2 w-[40px] h-[40px] bg-orange-400 flex items-center justify-center rounded-md text-white font-extrabold select-none">
        {Number(page) + 1}
      </div>
      <button
        onClick={increasePageNumber}
        className="bg-orange-400 text-white rounded-md p-2 w-[40px] h-[40px] hover:pointer hover:bg-orange-100 hover:text-orange-400 transition-all"
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default Pagination;
