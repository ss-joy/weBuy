import React, { Dispatch, SetStateAction } from "react";
import {
  AppleIcon,
  ArmchairIcon,
  BookIcon,
  CatIcon,
  DumbbellIcon,
  GamepadIcon,
  LaptopIcon,
  Music2Icon,
  PocketKnifeIcon,
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
  { categoryId: "Food", categoryIcon: <AppleIcon /> },
  { categoryId: "Gadget", categoryIcon: <PocketKnifeIcon /> },
] as const;
function ProductsCategory({
  setProductCategory,
}: {
  setProductCategory: Dispatch<SetStateAction<string>>;
}) {
  return (
    <ul className="flex overflow-x-scroll items-center mx-auto justify-evenly px-4 sm:mx-auto sm:px-32 md:px-12">
      {categories.map((category) => {
        return (
          <ListIem
            categoryIcon={category.categoryIcon}
            categoryId={category.categoryId}
            setProductCategory={setProductCategory}
          />
        );
      })}
    </ul>
  );
}

export default ProductsCategory;
