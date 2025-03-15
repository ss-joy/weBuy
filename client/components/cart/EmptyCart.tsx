import Image from "next/image";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col mt-8">
      <p className="mx-auto text-center font-bold text-3xl text-slate-500">
        Please choose some products to see something here
      </p>
      <Image
        className="block mx-auto"
        src="/ui-images/cart.jpg"
        alt="cart dummy image"
        width={300}
        height={300}
      />
    </div>
  );
};

export default EmptyCart;
