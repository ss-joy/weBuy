import ProductsList from "@/components/products/ProductsList";
import ErrorMsg from "@/components/ui/ErrorMsg";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { makeGetRequest } from "@/lib/queryFunctions";
import ProductsCategory from "./ProductsCategory";
import { useState } from "react";

export default function ProductsListPage(): JSX.Element {
  const [productCategory, setProductCategory] = useState<string>("");

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
        <ProductsCategory setProductCategory={setProductCategory} />
      </section>
      <ProductsList
        //this cool hack works!! :v <3
        products={data ? data?.data : [{}, {}, {}]}
        isLoading={isLoading}
      />
    </>
  );
}
