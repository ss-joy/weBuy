import { useState } from "react";
import PaymentStatus from "@/components/cart/PaymentStatus";
import { useContext } from "react";
import DummyContext from "@/contexts/dummy-context";
import useSWR from "swr";
import Loading from "@/components/ui/Loading";
export default function ShowCart() {
  const dummyCtx = useContext(DummyContext);
  async function fetcher() {
    const response = await fetch("/api/products");
    return await response.json();
  }
  const { data, error, isLoading } = useSWR("/api/products", fetcher);
  console.log(data);
  const [paymentStatus, setPaymentStatus] = useState(false);
  /**
   * Update fixed value to dynamic later
   */
  const total =
    +data[0].price * +dummyCtx.state[0].quantity +
    +data[0].price * +dummyCtx.state[0].quantity +
    +data[0].price * +dummyCtx.state[0].quantity;

  return (
    <>
      <div className="flex mt-8">
        <section id="cart">
          <ul>
            {isLoading ? (
              <Loading />
            ) : (
              data.map((e) => {
                return (
                  <li
                    key={e._id}
                    className="flex mx-40 my-20  text-orange-400 font-bold text-4xl shadow rounded p-4"
                  >
                    <h2>{e.name}</h2>
                    {/* <p>{e.description}</p> */}
                    <p>{e.price}</p>
                    <p>quantity:{}</p>
                    <p>Toal:{}</p>
                  </li>
                );
              })
            )}
          </ul>
        </section>
        <section
          id="payment-detail"
          className="flex flex-col items-center w-2/4"
        >
          <div className="flex justify-between pr-8 items-center">
            <span className="p-3 mx-16 mb-8 rounded-md font-semibold text-white text-4xl bg-orange-400">
              total:
            </span>
            <span className="p-3 ml-8 mb-8 rounded-md font-semibold text-4xl text-orange-600">
              {total}$
            </span>
          </div>

          <div className="mt-44">
            <button className="btn2">Confirm Order and Pay</button>
          </div>

          {/* inicomplete */}

          {paymentStatus && <PaymentStatus status={0} msg={"incomplete"} />}
        </section>
      </div>
    </>
  );
}
