import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { BANK_URL } from "@/lib/url-helper";
import Head from "next/head";
type Order = {
  trxId: string;
  total_cost: number;
  ecom_user_id: string;
  email: string;
  trx_date: Date;
};
export default function ShowOrders(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    async function getUserSession() {
      const userSession = await getSession();
      // userSession?.user!.user_id;
      //@ts-ignore
      const userId = userSession?.user!.user_id;
      const response = await fetch(`${BANK_URL}/api/orders/${userId}`);
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
      <ul className="flex flex-col">
        {orders.map((e, id) => {
          return (
            <li
              key={id}
              className="border-4 p-2 rounded-md mx-auto my-2 w-[310px] xs:w-[500px] overflow-x-scroll"
            >
              <p className="text-orange-700 text-lg font-bold">{e.email}</p>
              <p className="text-red-700 font-bold">{e.total_cost}$</p>
              <p className="text-slate-700 font-bold">{e.trxId}</p>
              <p className="text-slate-500">{e.trx_date.toString()}</p>
              <p className="bg-green-400 rounded-md font-bold p-1 my-3">
                Delivery on the way
              </p>
            </li>
          );
        })}
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
