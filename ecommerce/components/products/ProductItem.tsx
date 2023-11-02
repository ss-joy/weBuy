import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import Loading from "../ui/Loading";

function cutOutFirst100Words(text: string) {
  const words = text.split(" ");
  const cutWords = words.slice(0, 100);
  return cutWords.join(" ");
}
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
  return (
    <>
      {isLoading ? (
        <>
          <li className="mt-12 mb-20 px-8 flex flex-row items-center justify-evenly">
            <section className="w-1/3">
              <Skeleton className="w-[700px] h-[700px] rounded-md bg-slate-200" />
            </section>
            <section className="w-2/5 ">
              <Skeleton className="text-6xl mb-20 text-orange-600 bg-slate-400 h-14" />
              <Skeleton className="mb-12 h-44" />

              <section className="flex items-center justify-between">
                <Skeleton className="p-3 w-24 h-14 rounded-md font-semibold text-white text-2xl bg-orange-400" />

                <Skeleton className="bg-blue-500 transition-all w-32 h-16 text-white font-semibold p-5 rounded hover:bg-white hover:text-blue-800 hover:font-bold hover:shadow hover:shadow-blue-400" />
              </section>
            </section>
          </li>
        </>
      ) : (
        <>
          <li className="mt-12 mb-20 px-8 flex flex-row items-center justify-evenly">
            <section className="w-1/3">
              <Image
                className="rounded-md"
                alt="Product image"
                src={product.imagePath}
                width={700}
                height={700}
              />
            </section>
            <section className="w-2/5 ">
              <h2 className="text-6xl mb-20 text-orange-600">{product.name}</h2>
              <p className="mb-12">
                {cutOutFirst100Words(product.description)}
              </p>

              <section className="flex items-center justify-between">
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
            </section>
          </li>
        </>
      )}
    </>
  );
};

export default ProductItem;
