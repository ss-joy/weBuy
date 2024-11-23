import React from "react";
import Link from "next/link";
import MainNavBar from "./MainNavBar";
import Image from "next/image";
import SearchBox from "./SearchBox";
const MainHeader = (): JSX.Element => {
  return (
    <header className="flex justify-between items-center p-2 sm:px-4 md:px-8 2xl:px-10">
      <div className="flex items-center">
        <Link href={"/"} className=" rounded-xl hover:shadow-slate-500">
          <Image
            src={"/ui-images/site-logo.png"}
            alt="we buy main logo"
            width={80}
            height={80}
          />
        </Link>
        <SearchBox />
      </div>

      <MainNavBar />
    </header>
  );
};

export default MainHeader;
