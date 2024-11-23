import { CategoriesType } from "@/components/products/ProductsCategory";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { cn } from "@/lib";
import { updateCategoryFilter } from "@/store/features/categoryFilter/categoryFilterSlice";
import React, { useContext } from "react";
type ListIemProps = {
  categoryId: CategoriesType;
  categoryIcon: JSX.Element;
};
function ListIem({ categoryIcon, categoryId }: ListIemProps) {
  const { category } = useAppSelector((state) => state.categoryFilter);
  const dispatch = useAppDispatch();
  const isActive = category === categoryId ? true : false;
  return (
    <li
      onClick={() => {
        dispatch(
          updateCategoryFilter({
            category: categoryId,
          })
        );
      }}
      className={cn(
        "m-2 flex shadow p-2 shadow-slate-500 rounded-md hover:text-orange-500 cursor-pointer select-none",
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
