import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import ErrorMsg from "@/components/ui/ErrorMsg";
import { makeGetRequest } from "@/queries";
import { FetchTransactionSchemaType } from "@/schemas/shopping-transaction-schema";
import { ApiResponse, OrderDetails } from "@/types/apiResponse";
import DisplayOrders from "@/components/orders/DisplayOrders";
import {
  ArrowDownAZIcon,
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  XCircleIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { OrdersSortStype } from "@/types/products-type";

export default function ShowOrders(): JSX.Element {
  const [sortBy, setSortBy] = useState<OrdersSortStype>("");

  const { data, isLoading, error } = useQuery<ApiResponse<OrderDetails[]>>({
    queryKey: ["get-all-orders"],
    queryFn: async () => {
      const userSession = await getSession();
      //@ts-ignore
      const userId = userSession?.user!.user_id;
      return makeGetRequest(`/api/orders/${userId}`);
    },
  });
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
      <h1 className="text-center text-3xl font-semibold text-slate-500 mt-8 mb-8">
        List of all your orders.
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 flex justify-between shadow w-[165px] hover:text-orange-500 shadow-slate-400 rounded mx-2 md:mx-10 md:p-2 lg:mx-40 my-4 lg:my-8">
            {sortBy ? sortBy : "sort by..."} <ArrowDownAZIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white shadow shadow-slate-400 rounded p-3">
          <DropdownMenuLabel>Sort according to....</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setSortBy("");
              }}
              className="flex justify-between shadow p-2 focus:text-orange-500 focus:font-bold"
            >
              Dont sort <XCircleIcon className="ml-4" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setSortBy("priceHighToLow");
              }}
              className="flex justify-between shadow p-2 focus:text-orange-500 focus:font-bold"
            >
              Price high to low
              <ArrowDownNarrowWideIcon className="ml-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSortBy("priceLowToHigh");
              }}
              className="flex justify-between shadow p-2 focus:text-orange-500 focus:font-bold"
            >
              Price low to high
              <ArrowUpNarrowWideIcon className="ml-4" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {(data?.data as FetchTransactionSchemaType[]).length === 0 ? (
        <div className="flex flex-col mt-8">
          <p className="mx-auto text-center font-bold text-5xl text-slate-400">
            Please buy some things first to them here.
          </p>
        </div>
      ) : (
        <DisplayOrders sortBy={sortBy} trxData={data?.data!} />
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
