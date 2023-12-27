import React from "react";
import style from "./Loading.module.css";
import { cn } from "@/lib/utils";
type LoadingProps = {
  className?: string;
};
const Loading = ({ className }: LoadingProps): JSX.Element => {
  return (
    <div className="flex items-center justify-center">
      <div className={style["lds-ellipsis"]}>
        <div
          className={cn(
            "bg-emerald-500 w-4 h-4 absolute top-[33px] rounded-full",
            className
          )}
        ></div>
        <div
          className={cn(
            "bg-emerald-500 w-4 h-4 absolute top-[33px] rounded-full",
            className
          )}
        ></div>
        <div
          className={cn(
            "bg-emerald-500 w-4 h-4 absolute top-[33px] rounded-full",
            className
          )}
        ></div>
        <div
          className={cn(
            "bg-emerald-500 w-4 h-4 absolute top-[33px] rounded-full",
            className
          )}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
