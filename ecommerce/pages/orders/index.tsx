import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Head from "next/head";
import SingleCartProductDetails from "@/components/cart/SingleCartProductDetails";
type Order = {
  trxId: string;
  total_cost: number;
  ecom_user_id: string;
  email: string;
  trx_date: Date;
  transactionsItemsLists: {
    productId: string;
    productPrice: number;
    productQuantity: number;
  }[];
};
export default function ShowOrders(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    async function getUserSession() {
      const userSession = await getSession();
      //@ts-ignore
      const userId = userSession?.user!.user_id;
      const response = await fetch(`/api/orders/${userId}`);
      const response2 = await response.json();
      setOrders(response2.data);
    }
    getUserSession();
  }, []);

  return (
    <>
      <Head>
        <title>we Buy | Orders page</title>
        <meta name="description" content="" />
      </Head>
      <h1 className="text-center text-3xl font-semibold text-slate-500">
        List of all your orders.
      </h1>
      <ul className="flex flex-col">
        {orders.length > 0 ? (
          orders.map((e, id) => {
            return (
              <li
                key={id}
                className="border-4 p-2 rounded-md mx-auto my-2 w-[310px] xs:w-[600px] overflow-x-scroll"
              >
                <p className="text-orange-700 text-lg font-bold">{e.email}</p>
                <p className="text-xl font-semibold text-slate-500">
                  Total cost:
                </p>

                <p className="text-red-700 font-bold">{e.total_cost}$</p>
                <p className="text-xl font-semibold text-slate-500">
                  Transaction id:
                </p>
                <p className="text-slate-700 font-bold">{e.trxId}</p>
                <p className="text-xl font-semibold text-slate-500">
                  Time of order:
                </p>
                <p className="text-slate-500">{e.trx_date.toString()}</p>
                <p className="bg-green-400 rounded-md font-bold p-1 my-3">
                  Delivery on the way
                </p>
                <p className="bg-green-400 rounded-md font-bold p-1 my-3">
                  Order details
                </p>
                {e.transactionsItemsLists?.map((ele) => {
                  return (
                    <SingleCartProductDetails
                      key={ele.productId}
                      productQuantity={ele.productQuantity}
                      productId={ele.productId}
                    />
                  );
                })}
              </li>
            );
          })
        ) : (
          <div className="flex flex-col mt-8">
            <p className="mx-auto text-center font-bold text-5xl text-slate-400">
              Please buy some things first to them here.
            </p>
          </div>
        )}
      </ul>
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
