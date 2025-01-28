import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useLogOutMutation } from "@/store/features/auth/authApi";

function HamburgerSlider() {
  const router = useRouter();
  const {
    user: { userId },
    isAuthenticated,
  } = useAppSelector((state) => state.auth);
  const [logOut] = useLogOutMutation();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="p-0 outline-none border-none  min-[1024px]:hidden"
          >
            <div className="w-full">
              <hr className="bg-black w-10 h-1 my-2 rounded" />
              <hr className="bg-black w-10 h-1 my-2 rounded" />
              <hr className="bg-black w-10 h-1 my-2 rounded" />
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-slate-500 text-2xl pt-3">
              Welcome to webuy
            </SheetTitle>
          </SheetHeader>
          <nav className={""}>
            <ul className="flex flex-col items-end pt-20">
              {!isAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/auth/login"}>Login</Link>
                </li>
              )}
              {!isAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/auth/signup"}>SignUp</Link>
                </li>
              )}
              {isAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/orders"}>Orders</Link>
                </li>
              )}
              {router.pathname !== "/products" && isAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/products"}>Shop Here</Link>
                </li>
              )}
              {isAuthenticated && router.pathname !== "/cart" && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/cart"}>View Cart</Link>
                </li>
              )}
              {isAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/products/add-product"}>Add product</Link>
                </li>
              )}
              {isAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <button
                    onClick={() => {
                      logOut(undefined);
                    }}
                  >
                    Log Out
                  </button>
                </li>
              )}
              {isAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={`/user/profile/${userId}`}>Profile</Link>
                </li>
              )}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HamburgerSlider;
