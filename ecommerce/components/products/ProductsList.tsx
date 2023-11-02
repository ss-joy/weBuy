import React from "react";
import ProductItem from "./ProductItem";
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
    <ul className="mt-10 p-8">
      {products.map((p, id) => {
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
