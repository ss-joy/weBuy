import React from "react";
import Link from "next/link";
const MainNavBar = () => {
  return (
    <nav>
      <ul className="flex justify-around">
        <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
          <Link href={"/"}> Home</Link>
        </li>
        <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
          <Link href={"/auth/login"}>Login</Link>
        </li>
        <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
          <Link href={"/auth/signup"}>SignUp</Link>
        </li>
        <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
          <Link href={"/shop"}>Shop</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavBar;
