import React from "react";
import ProductItem from "./ProductItem";
const ProductsList = ({ products }) => {
  return (
    <ul className="m-32 p-8 shadow-lg shadow-slate-700 rounded-md">
      {products.map((p) => {
        return <ProductItem key={p._id} product={p} />;
      })}
    </ul>
  );
};

export default ProductsList;
