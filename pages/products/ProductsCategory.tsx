import React, { Dispatch, SetStateAction } from "react";
import {
  ArmchairIcon,
  BookIcon,
  CatIcon,
  DumbbellIcon,
  GamepadIcon,
  LaptopIcon,
  Music2Icon,
  ShirtIcon,
} from "lucide-react";
import ListIem from "./ListItem";
export const categories = [
  {
    categoryId: "Clothing",
    categoryIcon: <ShirtIcon />,
  },
  {
    categoryId: "Electronics",
    categoryIcon: <LaptopIcon />,
  },
  {
    categoryId: "Furniture",
    categoryIcon: <ArmchairIcon />,
  },
  {
    categoryId: "Fitness",
    categoryIcon: <DumbbellIcon />,
  },
  {
    categoryId: "Books",
    categoryIcon: <BookIcon />,
  },
  {
    categoryId: "Music",
    categoryIcon: <Music2Icon />,
  },
  {
    categoryId: "Gaming",
    categoryIcon: <GamepadIcon />,
  },
  {
    categoryId: "Pets",
    categoryIcon: <CatIcon />,
  },
] as const;
function ProductsCategory({
  setProductCategory,
}: {
  setProductCategory: Dispatch<SetStateAction<string>>;
}) {
  return (
    <ul className="flex flex-wrap items-center mx-auto justify-evenly px-2 sm:mx-auto sm:px-32 md:px-12">
      {categories.map((category) => {
        return (
          <ListIem
            categoryIcon={category.categoryIcon}
            categoryId={category.categoryId}
            setProductCategory={setProductCategory}
          />
          // <li
          //   onClick={() => {
          //     setProductCategory(category.categoryId);
          //   }}
          // >

          // </li>
        );
      })}
    </ul>
  );
}

export default ProductsCategory;
