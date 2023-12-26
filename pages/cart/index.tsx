import { useContext } from "react";
import { cartContext } from "@/contexts/cart-context";
import Payment from "@/components/cart/Payment";
import SingleCartProductDetails from "@/components/cart/SingleCartProductDetails";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";
type CartIndexPageProps = {};
export default function ShowCart(props: CartIndexPageProps): JSX.Element {
  // console.log(props);
  const cartCtx = useContext(cartContext);
  if (!cartContext) {
    throw new Error("cart context cannot be null");
  }

  return (
    <>
      <Head>
        <title>we Buy | Cart page</title>
      </Head>
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
            <p className="mx-auto text-center font-bold text-5xl text-slate-500">
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
export const getServerSideProps = (async (context) => {
  const sessionFound = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!sessionFound) {
    return {
      redirect: {
        destination: "/helper/no-auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}) satisfies GetServerSideProps<{}>;
