import React from "react";
import ProductItem from "./ProductItem";
const ProductsList = ({ products }) => {
  return (
    <ul className="mt-10 p-8">
      {products.map((p) => {
        return <ProductItem key={p._id} product={p} />;
      })}
    </ul>
  );
};

export default ProductsList;
