import React from "react";
import Link from "next/link";
import MainNavBar from "./MainNavBar";
const MainHeader = () => {
  return (
    <header className="flex justify-between items-center p-8 px-20 ">
      <Link
        href={"/"}
        className="shadow p-4 rounded-xl shadow-fuchsia-300 hover:shadow-slate-500"
      >
        <div>
          <span className="text-3xl text-purple-600 hover:text-purple-700">
            we
          </span>
          <span className="text-3xl font-bold text-fuchsia-400 hover:text-fuchsia-700">
            Buy
          </span>
        </div>
      </Link>
      <MainNavBar />
    </header>
  );
};

export default MainHeader;
