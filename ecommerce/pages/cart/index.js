import { useState } from "react";
import PaymentStatus from "@/components/cart/PaymentStatus";
import { useContext } from "react";
import useSWR from "swr";
import CartContext from "@/contexts/cart-context";
import ShowCartDetail from "@/components/cart/ShowCartDetail";
import PaymentDetail from "@/components/cart/PaymentDetail";
export default function ShowCart() {
  const cartCtx = useContext(CartContext);
  async function fetcher() {
    const response = await fetch("/api/products");
    return await response.json();
  }
  const { data, error, isLoading } = useSWR("/api/products", fetcher);
  console.log(data);
  const [paymentStatus, setPaymentStatus] = useState(false);
  if (error) {
    return <p>sorry we are having trouble now.Please visit later</p>;
  }
  return (
    <>
      <div className="flex mt-8">
        <ShowCartDetail
          isLoading={isLoading}
          data={data}
          cartDetail={cartCtx}
        />
        <PaymentDetail isLoading={isLoading} data={data} cartDetail={cartCtx} />
        {/* {paymentStatus && <PaymentStatus status={0} msg={"incomplete"} />} */}
      </div>
    </>
  );
}
