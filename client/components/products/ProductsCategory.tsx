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
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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

function ProductsCategory() {
  return (
    <ScrollArea
      className="flex 
    flex-row items-center justify-start sm:mx-auto whitespace-nowrap rounded-md border bg-red-500"
    >
      {categories.map((category) => {
        return (
          <ListIem
            key={category.categoryId}
            categoryIcon={category.categoryIcon}
            categoryId={category.categoryId}
          />
        );
      })}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    // <ul className="flex overflow-x-scroll items-center mx-auto justify-start sm:mx-auto">
    //   {categories.map((category) => {
    //     return (
    //       <ListIem
    //         key={category.categoryId}
    //         categoryIcon={category.categoryIcon}
    //         categoryId={category.categoryId}
    //       />
    //     );
    //   })}
    // </ul>
  );
}

export default ProductsCategory;
