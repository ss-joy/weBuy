import ProductsList from "@/components/products/ProductsList";
import ErrorMsg from "@/components/ui/ErrorMsg";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { makeGetRequest } from "@/queries";
import ProductsCategory from "../../components/products/ProductsCategory";
import { useContext, useEffect, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  ThumbsDownIcon,
  ThumbsUpIcon,
  XCircleIcon,
} from "lucide-react";
import { Product, sortStype } from "@/types/products-type";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { ecomBackendUrl } from "@/config";
import { useRouter } from "next/router";
import Pagination from "@/components/ui/Pagination";

export default function ProductsListPage(): JSX.Element {
  const { category } = useAppSelector((state) => state.categoryFilter);

  const router = useRouter();
  const {
    query: { page, limit },
  } = router;

  useEffect(() => {
    if (!page || !limit) {
      router.push(`/products?page=${1}&limit=${10}`);
    }
  }, []);

  const [sortBy, setSortBy] = useState<sortStype>("");
  const {
    error,
    data: products,
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["get-products-list", category, page, limit],
    queryFn: () =>
      makeGetRequest(
        `${ecomBackendUrl}/products/?productCategory=${category}&page=${page}&limit=${limit}`
      ),
    enabled: page !== undefined && limit !== undefined,
  });

  if (error) {
    return <ErrorMsg />;
  }

  function increasePageNumber() {
    router.push(`/products?page=${Number(page) + 1}&limit=${10}`);
  }

  function decreasePageNumber() {
    if (Number(page) === 1 || page === undefined) {
      return;
    }
    router.push(`/products?page=${Number(page) - 1}&limit=${10}`);
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
              <button className="flex justify-between shadow-sm shadow-slate-500 w-[205px] p-2 hover:text-orange-500 mx-3 px-3 text-slate-600 rounded my-4 md:text-2xl lg:my-8">
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
          products={products}
          isLoading={isLoading}
        />
        <Pagination
          page={page ? Number(page) : 0}
          decreasePageNumber={decreasePageNumber}
          increasePageNumber={increasePageNumber}
        />
      </main>
    </>
  );
}
