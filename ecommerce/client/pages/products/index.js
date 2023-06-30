import ProductsList from "@/components/products/ProductsList";
import useSWR from "swr";
export default function ProductsListPage() {
  async function fetcher() {
    const response = await fetch("http://localhost:3000/api/products");
    return await response.json();
  }
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/products",
    fetcher
  );
  if (isLoading) {
    return <p className="basic">loading.....</p>;
  }
  if (error) {
    return <p>error !</p>;
  }
  return (
    <>
      <ProductsList products={data} />
    </>
  );
}
