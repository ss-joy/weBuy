import React from "react";
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
export type CategoriesType = (typeof categories)[number]["categoryId"] | "";

function ProductsCategory({
  updateCategory,
}: {
  updateCategory: (x: CategoriesType) => void;
}) {
  return (
    <ul className="flex overflow-x-scroll items-center mx-auto justify-evenly px-4 sm:mx-auto sm:px-32 md:px-12">
      {categories.map((category) => {
        return (
          <ListIem
            key={category.categoryId}
            categoryIcon={category.categoryIcon}
            categoryId={category.categoryId}
            updateCategory={updateCategory}
          />
        );
      })}
    </ul>
  );
}

export default ProductsCategory;
