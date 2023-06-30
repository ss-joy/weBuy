import React from "react";
import Image from "next/image";
import Link from "next/link";

function cutOutFirst100Words(text) {
  const words = text.split(" ");
  const cutWords = words.slice(0, 100);
  return cutWords.join(" ");
}

const ProductItem = ({ product }) => {
  return (
    <li className="my-12 px-8 flex flex-row items-center justify-evenly">
      <section className="w-1/3">
        <Image
          alt="Product image"
          src={"/product-images/wallet.webp"}
          width={700}
          height={700}
        />
      </section>
      <section className="w-2/5 ">
        <h2 className="text-6xl text-orange-600">{product.name}</h2>
        <p className="">{cutOutFirst100Words(product.description)}</p>

        <section className="flex items-center justify-between">
          <span className="p-3 rounded-md font-semibold text-white text-2xl bg-orange-400">
            $ {product.price}
          </span>
          <Link
            className="bg-blue-500 text-white font-semibold p-5 rounded hover:bg-white hover:text-blue-800 hover:font-bold hover:shadow hover:shadow-blue-400"
            href={"/product/idfix"}
          >
            View Product &#8594;
          </Link>
        </section>
      </section>
    </li>
  );
};

{
  /* <li className="m-4 mb-16 p-6 bg-orange-50 rounded-md shadow-2xl shadow-orange-300 flex flex-row justify-around items-center">
<section>
  <img
    className="rounded-md"
    src="https://img.freepik.com/free-photo/showing-cart-trolley-shopping-online-sign-graphic_53876-133967.jpg"
    width={"27980px"}
  />
</section>
<section>
  <h2>{product.name}</h2>
  <p className="h-40 overflow-hidden">{product.description}</p>
  {product.price}
</section>
</li> */
}
export default ProductItem;
