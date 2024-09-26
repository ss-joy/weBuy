import Payment from "@/components/cart/Payment";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import CartDetailsTable from "@/components/cart/CartDetailsTable";

type CartIndexPageProps = {};
export default function ShowCart(props: CartIndexPageProps): JSX.Element {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <>
      <Head>
        <title>we Buy | Cart page</title>
      </Head>
      <div
        id="full-cart-container"
        className="flex flex-col lg:flex-row-reverse lg:w-4/5 lg:justify-evenly mt-12 mx-auto"
      >
        {cartItems.length >= 0 ? (
          <>
            <ul>{<CartDetailsTable products={cartItems} />}</ul>
            <Payment />
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
// export const getServerSideProps = (async (context) => {
//   const sessionFound = await getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );
//   if (!sessionFound) {
//     return {
//       redirect: {
//         destination: "/helper/no-auth",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }) satisfies GetServerSideProps<{}>;
