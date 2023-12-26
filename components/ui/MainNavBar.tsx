import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import HamBurger from "./animations/HamBurger";
import Profile from "../profile/Profile";

const MainNavBar = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  function logOut() {
    signOut({
      redirect: false,
    });
  }
  const isAuthenticated = status === "authenticated" && session;
  return (
    <>
      <nav className="hidden lg:block">
        <ul className="flex justify-around">
          {router.pathname !== "/products" && !isAuthenticated && (
            <li className="nav-btn">
              <Link href={"/products"}>View Products</Link>
            </li>
          )}
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
              <Profile logout={logOut} />
            </li>
          )}
        </ul>
      </nav>
      <HamBurger />
    </>
  );
};

export default MainNavBar;
