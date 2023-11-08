import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductSkeleton } from "./ProductSkeleton";

interface ProductItemProps {
  isLoading: boolean;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imagePath: string;
  };
}
const ProductItem = ({ product, isLoading }: ProductItemProps): JSX.Element => {
  console.log(product.imagePath);
  return (
    <>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <li className="shadow-lg max-w-lg mx-auto shadow-slate-700 rounded-md flex flex-col items-start p-2 pb-4 lg:mx-4 lg:justify-evenly transition-all hover:shadow-slate-500 hover:shadow-2xl lg:p-4 my-5">
            <Image
              className="rounded block mb-7"
              alt="Product image"
              src={product.imagePath}
              width={700}
              height={700}
            />

            <h2 className="text-2xl font-bold text-orange-600">
              {product.name}
            </h2>
            <p className="mb-2">rating,category</p>
            <p className="mb-2">provider</p>

            <section className="flex items-center justify-between w-full">
              <span className="p-3 rounded-md font-semibold text-white text-2xl bg-orange-400">
                $ {product.price}
              </span>
              <Link
                className="bg-blue-500 transition-all text-white font-semibold p-5 rounded hover:bg-white hover:text-blue-800 hover:font-bold hover:shadow hover:shadow-blue-400"
                href={`/products/${product._id}`}
              >
                View Product &#8594;
              </Link>
            </section>
          </li>
        </>
      )}
    </>
  );
};

export default ProductItem;
