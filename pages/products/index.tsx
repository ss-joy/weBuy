import ProductsList from "@/components/products/ProductsList";
import ErrorMsg from "@/components/ui/ErrorMsg";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { makeGetRequest } from "@/lib/queryFunctions";
export default function ProductsListPage(): JSX.Element {
  const { error, data, isLoading } = useQuery({
    queryKey: ["get-products-list"],
    queryFn: () => makeGetRequest("/api/products"),
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
      <ProductsList
        //this cool hack works!! :v <3
        products={data ? data.data : [{}, {}, {}]}
        isLoading={isLoading}
      />
    </>
  );
}
