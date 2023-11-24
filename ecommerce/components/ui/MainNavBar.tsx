import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const MainNavBar = (): JSX.Element => {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter();
  function logOut() {
    signOut({
      redirect: false,
    });
  }
  const isAuthenticated = status === "authenticated" && session;
  return (
    <nav>
      <ul className="flex justify-around">
        {!isAuthenticated && (
          <li className="nav-btn">
            <Link href={"/auth/login"}>Login</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li className="nav-btn">
            <Link href={"/auth/signup"}>SignUp</Link>
          </li>
        )}

        {isAuthenticated && (
          <li className="nav-btn">
            <Link href={"/orders"}>Orders</Link>
          </li>
        )}
        {router.pathname !== "/products" && (
          <li className="nav-btn">
            <Link href={"/products"}>Shop Here</Link>
          </li>
        )}
        {isAuthenticated && router.pathname !== "/cart" && (
          <li className="nav-btn">
            <Link href={"/cart"}>View Cart</Link>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav-btn">
            <Link href={"/products/add-product"}>Add product</Link>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav-btn">
            <button onClick={logOut}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavBar;
