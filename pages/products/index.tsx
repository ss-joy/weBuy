import ProductsList from "@/components/products/ProductsList";
import ErrorMsg from "@/components/ui/ErrorMsg";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { makeGetRequest } from "@/lib/queryFunctions";
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
import { productCategoryContext } from "@/contexts/category-filter-context";

export default function ProductsListPage(): JSX.Element {
  const { productCategory, updateCategory } = useContext(
    productCategoryContext
  );

  const [sortBy, setSortBy] = useState<sortStype>("");
  const { error, data, isLoading } = useQuery({
    queryKey: ["get-products-list", productCategory],
    queryFn: () =>
      makeGetRequest(`/api/products/?productCategory=${productCategory}`),
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
      <section>
        <ProductsCategory updateCategory={updateCategory} />
      </section>
      <section>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex justify-between shadow w-[165px] hover:text-orange-500 shadow-slate-400 rounded mx-2 md:mx-10 md:p-2 lg:mx-40 my-4 lg:my-8">
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
                className="focus:text-orange-500 focus:font-bold"
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
                className="focus:text-orange-500 focus:font-bold"
              >
                Price high to low
                <ArrowDownNarrowWideIcon className="ml-4" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("priceLowToHigh");
                }}
                className="focus:text-orange-500 focus:font-bold"
              >
                Price low to high
                <ArrowUpNarrowWideIcon className="ml-4" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("soldMost");
                }}
                className="focus:text-orange-500 focus:font-bold"
              >
                Most sold first
                <ThumbsUpIcon className="ml-4" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("soldLeast");
                }}
                className="focus:text-orange-500 focus:font-bold"
              >
                Least sold first
                <ThumbsDownIcon className="ml-4" />
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
    </>
  );
}
