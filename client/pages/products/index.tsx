import ProductsList from "@/components/products/ProductsList";
import ErrorMsg from "@/components/ui/ErrorMsg";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { makeGetRequest } from "@/queries";
import ProductsCategory from "../../components/products/ProductsCategory";
import { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownAZIcon,
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  XCircleIcon,
} from "lucide-react";
import { sortStype } from "@/types/products-type";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

export default function ProductsListPage(): JSX.Element {
  const { category } = useAppSelector((state) => state.categoryFilter);

  const [sortBy, setSortBy] = useState<sortStype>("");
  const { error, data, isLoading } = useQuery({
    queryKey: ["get-products-list", category],
    queryFn: () => makeGetRequest(`/api/products/?productCategory=${category}`),
  });
  if (error) {
    return <ErrorMsg />;
  }

  return (
    <>
      <Head>
        <title>we Buy | Products list page</title>
        <meta name="description" content="" />
      </Head>
      <main className="mx-auto w-[90%] sm:w-[450px] md:w-[650px] lg:w-[80%] 2xl:w-[1400px] h-full">
        <section>
          <ProductsCategory />
        </section>
        <section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex justify-between shadow-sm shadow-slate-500 w-[205px] hover:text-orange-500 mx-3 px-3 text-slate-600 rounded my-4 md:text-2xl lg:my-8">
                {sortBy ? sortBy : "sort by..."} <ArrowDownAZIcon />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort according to....</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("");
                  }}
                  className="focus:text-orange-500 focus:font-bold flex justify-between"
                >
                  Dont sort <XCircleIcon />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("priceHighToLow");
                  }}
                  className="focus:text-orange-500 focus:font-bold flex justify-between"
                >
                  Price high to low
                  <ArrowDownNarrowWideIcon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("priceLowToHigh");
                  }}
                  className="focus:text-orange-500 focus:font-bold flex justify-between"
                >
                  Price low to high
                  <ArrowUpNarrowWideIcon />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("soldMost");
                  }}
                  className="focus:text-orange-500 focus:font-bold flex justify-between"
                >
                  Most sold first
                  <ThumbsUpIcon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("soldLeast");
                  }}
                  className="focus:text-orange-500 focus:font-bold flex justify-between"
                >
                  Least sold first
                  <ThumbsDownIcon />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
        <ProductsList
          sortBy={sortBy}
          //this cool hack works!! :v <3
          products={data ? data?.data : [{}, {}, {}]}
          isLoading={isLoading}
        />
      </main>
    </>
  );
}
