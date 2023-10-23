import React from "react";
import Link from "next/link";
import MainNavBar from "./MainNavBar";
const MainHeader = (): JSX.Element => {
  return (
    <header className="flex justify-between items-center p-2 sm:px-4 md:px-8 2xl:px-10">
      <Link
        href={"/"}
        className="shadow p-4 rounded-xl shadow-fuchsia-300 hover:shadow-slate-500"
      >
        <div>
          <span className="text-4xl text-purple-600 hover:text-purple-700">
            we
          </span>
          <span className="text-4xl font-bold text-fuchsia-400 hover:text-fuchsia-700">
            Buy
          </span>
        </div>
      </Link>
      <MainNavBar />
    </header>
  );
};

export default MainHeader;
