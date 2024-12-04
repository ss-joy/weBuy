import React from "react";
import ProductItem from "./ProductItem";
import { Product, sortStype } from "@/types/products-type";
import Loading from "../ui/Loading";
interface ProductItemProps {
  sortBy: sortStype;
  isLoading: boolean;
  products: Product[] | undefined;
}

const ProductsList = ({
  sortBy,
  products,
  isLoading,
}: ProductItemProps): JSX.Element => {
  if (isLoading) {
    return <Loading />;
  }

  if (!products || products.length === 0) {
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
    <ul className="mt-10 flex flex-col lg:flex-row lg:flex-wrap lg:justify-between">
      {finalProducts.map((p, id) => {
        return <ProductItem key={p._id} product={p} isLoading={isLoading} />;
      })}
    </ul>
  );
};

export default ProductsList;
