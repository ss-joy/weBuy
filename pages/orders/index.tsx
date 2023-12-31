import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import ErrorMsg from "@/components/ui/ErrorMsg";
import { makeGetRequest } from "@/lib/queryFunctions";
import { FetchTransactionSchemaType } from "@/schemas/shopping-transaction-schema";
import { ShowOrderDetailsApiResponse } from "@/types/apiResponse";
import DisplayOrders from "@/components/orders/DisplayOrders";

export default function ShowOrders(): JSX.Element {
  const { data, isLoading, error } = useQuery<ShowOrderDetailsApiResponse>({
    queryKey: ["get-all-orders"],
    queryFn: async () => {
      const userSession = await getSession();
      //@ts-ignore
      const userId = userSession?.user!.user_id;
      return makeGetRequest(`/api/orders/${userId}`);
    },
  });
  console.log(data);
  if (isLoading) {
    return (
      <p className="font-bold text-2xl text-slate-500 mt-16 text-center mx-auto">
        Loading your orders...
      </p>
    );
  }
  if (error) {
    return <ErrorMsg />;
  }
  return (
    <>
      <Head>
        <title>we Buy | Orders page</title>
        <meta name="description" content="" />
      </Head>
      <h1 className="text-center text-3xl font-semibold text-slate-500">
        List of all your orders.
      </h1>
      {(data?.data as FetchTransactionSchemaType[]).length === 0 ? (
        <div className="flex flex-col mt-8">
          <p className="mx-auto text-center font-bold text-5xl text-slate-400">
            Please buy some things first to them here.
          </p>
        </div>
      ) : (
        <DisplayOrders trxData={data?.data!} />
      )}
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
