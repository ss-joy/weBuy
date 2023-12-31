import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import HamBurger from "./animations/HamBurger";
import Profile from "../profile/Profile";
import {
  PackagePlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
} from "lucide-react";

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
        <ul className="flex justify-around items-center">
          {!isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/products"}>
                View Products
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/auth/login"}>
                Login
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/auth/signup"}>
                SignUp
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/orders"}>
                Orders <ShoppingBagIcon className="ml-4" />
              </Link>
            </li>
          )}
          {router.pathname !== "/products" && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/products"}>
                Shop Here <StoreIcon className="ml-4" />
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/cart"}>
                View Cart <ShoppingCartIcon className="ml-4" />
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/products/add-product"}>
                Add product
                <PackagePlusIcon className="ml-4" />
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="nav-btn">
              <Profile
                //@ts-ignore
                userId={session.user!.user_id}
                logout={logOut}
              />
            </li>
          )}
        </ul>
      </nav>
      <HamBurger />
    </>
  );
};

export default MainNavBar;
