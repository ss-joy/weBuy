import { CategoriesType } from "@/components/products/ProductsCategory";
import { productCategoryContext } from "@/contexts/category-filter-context";
import { cn } from "@/lib";
import React, { useContext } from "react";
type ListIemProps = {
  categoryId: CategoriesType;
  categoryIcon: JSX.Element;
  updateCategory: (x: CategoriesType) => void;
};
function ListIem({ categoryIcon, categoryId, updateCategory }: ListIemProps) {
  const { productCategory } = useContext(productCategoryContext);
  const isActive = productCategory === categoryId ? true : false;
  return (
    <li
      onClick={() => {
        updateCategory(categoryId);
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
