import React from "react";
import ProductItem from "./ProductItem";
import { sortStype } from "@/types/products-type";
interface ProductItemProps {
  sortBy: sortStype;
  isLoading: boolean;
  products: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imagePath: string;
    sellerId: string;
    sellerName: string;
    sellCount: number;
    productCategory: string;
  }[];
}
const ProductsList = ({
  sortBy,
  products,
  isLoading,
}: ProductItemProps): JSX.Element => {
  if (products.length === 0) {
    return (
      <p className=" mt-20 font-bold text-slate-500 mx-auto text-3xl w-[300px]">
        Sorry...we didnt find anything ..
      </p>
    );
  }
  let finalProducts = structuredClone(products);
  if (sortBy === "priceLowToHigh") {
    finalProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHighToLow") {
    finalProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "soldLeast") {
    finalProducts.sort((a, b) => a.sellCount - b.sellCount);
  } else if (sortBy === "soldMost") {
    finalProducts.sort((a, b) => b.sellCount - a.sellCount);
  }
  return (
    <ul className="mt-10 p-2 flex flex-col lg:flex-row lg:flex-wrap lg:justify-evenly">
      {finalProducts.map((p, id) => {
        return (
          <ProductItem
            key={p._id ? p._id : id}
            product={p}
            isLoading={isLoading}
          />
        );
      })}
    </ul>
  );
};

export default ProductsList;
