import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Profile from "../profile/Profile";
import {
  KeyRoundIcon,
  LockIcon,
  ShoppingCartIcon,
  StoreIcon,
} from "lucide-react";
import HamburgerSlider from "../Drawer/HamburgerSlider";
import { useAppSelector } from "@/hooks/redux-hooks";

const MainNavBar = (): JSX.Element => {
  const {
    user: { userId },
    isAuthenticated,
  } = useAppSelector((state) => state.auth);

  return (
    <>
      <nav className="hidden lg:block bg-white">
        <ul className="flex justify-around items-center">
          {!isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/auth/login"}>
                Login <KeyRoundIcon className="ml-4" />
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/auth/signup"}>
                SignUp <LockIcon className="ml-4" />
              </Link>
            </li>
          )}

          {
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/products"}>
                {isAuthenticated ? " Shop Here" : "View Products"}
                <StoreIcon className="ml-4" />
              </Link>
            </li>
          }
          {isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/cart"}>
                View Cart <ShoppingCartIcon className="ml-4" />
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <li className="nav-btn">
              <Profile userId={userId as string} />
            </li>
          )}
        </ul>
      </nav>
      <HamburgerSlider />
    </>
  );
};

export default MainNavBar;
