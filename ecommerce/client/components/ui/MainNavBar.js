import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
const MainNavBar = () => {
  const [session, loading] = useSession();
  console.log(session);
  function logOut() {
    signOut();
  }
  return (
    <nav>
      <ul className="flex justify-around">
        {!session && (
          <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
            <Link href={"/auth/login"}>Login</Link>
          </li>
        )}
        {!session && (
          <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
            <Link href={"/auth/signup"}>SignUp</Link>
          </li>
        )}
        {session && (
          <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
            <Link href={"/products"}>Shop Here</Link>
          </li>
        )}
        {session && (
          <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
            <Link href={"/cart"}>View Cart</Link>
          </li>
        )}
        {session && (
          <li className="px-4 py-2 m-4  text-3xl bg-orange-300 text-orange-700  rounded-md hover:font-bold hover:text-white">
            <button onClick={logOut}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavBar;
