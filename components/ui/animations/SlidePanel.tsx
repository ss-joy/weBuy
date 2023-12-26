import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import style from "./SinglePanel.module.css";
import { responsivePanelContext } from "@/contexts/responsive-panel";
import HamBurger from "./HamBurger";
const SlidePanel = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  function logOut() {
    signOut({
      redirect: false,
    });
  }
  const resCtx = useContext(responsivePanelContext);
  const isAuthenticated = status === "authenticated" && session;
  //@ts-ignore
  const userId = session?.user!.user_id;

  return (
    //wrong approach
    //in this approach style.singe.. wont be added in html
    // <nav
    //   className={
    //     style.singlePanelNav + resCtx?.startAnimation
    //       ? " bg-white absolute top-0 right-0"
    //       : " bg-white absolute top-0 right-[-160]"
    //   }
    // >
    // display absolute wont make the panel 100vh
    // only fixed will
    <nav
      className={
        resCtx?.startAnimation
          ? `bg-white fixed top-0 right-0 shadow ${style.singlePanelNav}`
          : `bg-white fixed top-0 right-[-380px] ${style.singlePanelNav}`
      }
    >
      <ul className="flex flex-col items-end pt-20">
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
        {isAuthenticated && (
          <li className="nav-btn">
            <Link href={`/user/profile/${userId}`}>Profile</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SlidePanel;
