import ProductsList from "@/components/products/ProductsList";
import ErrorMsg from "@/components/ui/ErrorMsg";
import Head from "next/head";
import useSWR from "swr";

export default function ProductsListPage(): JSX.Element {
  // function cutOutFirst100Words(text: string) {
  //   const words = text.split(" ");
  //   const cutWords = words.slice(0, 100);
  //   return cutWords.join(" ");
  // }
  async function fetcher() {
    const response = await fetch("/api/products");
    return await response.json();
  }
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

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
