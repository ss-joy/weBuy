import React from "react";
import ProductItem from "./ProductItem";
interface ProductItemProps {
  products: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imagePath: string;
  }[];
}
const ProductsList = ({ products }: ProductItemProps): JSX.Element => {
  return (
    <ul className="mt-10 p-8">
      {products.map((p) => {
        return <ProductItem key={p._id} product={p} />;
      })}
    </ul>
  );
};

export default ProductsList;
