import React from "react";
import Image from "next/image";
import Link from "next/link";

function cutOutFirst100Words(text: string) {
  const words = text.split(" ");
  const cutWords = words.slice(0, 100);
  return cutWords.join(" ");
}
interface ProductItemProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imagePath: string;
  };
}
const ProductItem = ({ product }: ProductItemProps): JSX.Element => {
  return (
    <li className="mt-12 mb-20 px-8 flex flex-row items-center justify-evenly">
      <section className="w-1/3">
        <Image
          alt="Product image"
          src={product.imagePath}
          width={700}
          height={700}
        />
      </section>
      <section className="w-2/5 ">
        <h2 className="text-6xl mb-20 text-orange-600">{product.name}</h2>
        <p className="mb-12">{cutOutFirst100Words(product.description)}</p>

        <section className="flex items-center justify-between">
          <span className="p-3 rounded-md font-semibold text-white text-2xl bg-orange-400">
            $ {product.price}
          </span>
          <Link
            className="bg-blue-500 text-white font-semibold p-5 rounded hover:bg-white hover:text-blue-800 hover:font-bold hover:shadow hover:shadow-blue-400"
            href={`/products/${product._id}`}
          >
            View Product &#8594;
          </Link>
        </section>
      </section>
    </li>
  );
};

export default ProductItem;
