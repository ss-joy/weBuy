import ProductsList from "@/components/products/ProductsList";
import Loading from "@/components/ui/Loading";
import useSWR from "swr";
export default function ProductsListPage() {
  async function fetcher() {
    const response = await fetch("/api/products");
    return await response.json();
  }
  const { data, error, isLoading } = useSWR("/api/products", fetcher);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <p className="text-center bg-red-400 p-12 text-white font-bold text-5xl rounded-md shadow shadow-black my-16">
        Sorry .An error happened.Please try again and come back later
      </p>
    );
  }
  return (
    <>
      <ProductsList products={data} />{" "}
    </>
  );
}
