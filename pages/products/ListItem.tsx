import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
type ListIemProps = {
  categoryId: string;
  categoryIcon: JSX.Element;
  setProductCategory: Dispatch<SetStateAction<string>>;
};
function ListIem({
  categoryIcon,
  categoryId,
  setProductCategory,
}: ListIemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <li
      onClick={() => {
        setIsActive((prev) => {
          return !prev;
        });
        setProductCategory((prev) => {
          if (prev === "") {
            return categoryId;
          } else return "";
        });
      }}
      className={cn(
        "m-2 flex shadow p-2 shadow-slate-500 rounded-md hover:text-orange-500",
        {
          "bg-orange-500 text-white font-bold hover:text-white": isActive,
        }
      )}
    >
      {categoryIcon}
      {categoryId}
    </li>
  );
}

export default ListIem;
