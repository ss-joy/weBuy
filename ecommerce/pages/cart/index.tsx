import { useContext } from "react";
import { cartContext } from "@/contexts/cart-context";
import Payment from "@/components/cart/Payment";
import SingleCartProductDetails from "@/components/cart/SingleCartProductDetails";
import Image from "next/image";
export default function ShowCart(): JSX.Element {
  const cartCtx = useContext(cartContext);
  if (!cartContext) {
    throw new Error("cart context cannot be null");
  }

  return (
    <>
      <div
        id="full-cart-container"
        className="flex flex-col lg:flex-row-reverse lg:w-4/5 lg:justify-evenly mx-auto"
      >
        {cartCtx!.products.length > 0 ? (
          <>
            <Payment />
            <ul>
              {cartCtx?.products.map((ele) => {
                return (
                  <SingleCartProductDetails
                    key={ele.productId}
                    productQuantity={ele.productQuantity}
                    productId={ele.productId}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <div className="flex flex-col mt-8">
            <p className="mx-auto text-center font-bold text-5xl">
              Please add some products to see something here
            </p>
            <Image
              className="block mx-auto"
              src="/ui-images/cart.jpg"
              alt="cart dummy image"
              width={300}
              height={300}
            />
          </div>
        )}
      </div>
    </>
  );
}
