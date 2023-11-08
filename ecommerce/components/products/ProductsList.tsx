import React from "react";
import ProductItem from "./ProductItem";
import { ProductSkeleton } from "./ProductSkeleton";
interface ProductItemProps {
  isLoading: boolean;
  products: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imagePath: string;
  }[];
}
const ProductsList = ({
  products,
  isLoading,
}: ProductItemProps): JSX.Element => {
  return (
    <ul className="mt-10 p-2 border-2 border-red-300 flex flex-col lg:flex-row lg:flex-wrap lg:justify-evenly ">
      {products.map((p, id) => {
        return (
          <ProductItem
            key={p._id ? p._id : id}
            product={p}
            isLoading={isLoading}
          />
        );
      })}
      <ProductSkeleton />
    </ul>
  );
};

export default ProductsList;
