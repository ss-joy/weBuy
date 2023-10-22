import { findProductQuantity } from "@/utils/product-cart";
import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import CartContext from "@/contexts/cart-context";
import { getSession } from "next-auth/react";

const PaymentDetail = ({ isLoading, data, cartDetail }): JSX.Element => {
  const addressRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const secretRef = useRef<HTMLInputElement>(null);
  const [sessionEmail, setSessionEmail] = useState("");
  function calTotalPrice() {
    let total = 0;
    data.map((e) => {
      total = total + +e.price * +findProductQuantity(e._id, cartDetail);
    });
    return total;
  }
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);
  useEffect(() => {
    getSession().then((session) => {
      console.log(session);
      setSessionEmail(session.user.email);
    });
  }, []);
  getSession();
  function handleTransaction(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      address: addressRef.current.value,
      email: sessionEmail,
      mobile: mobileRef.current.value,
      productQuantity:
        cartCtx.state[0].quantity +
        cartCtx.state[1].quantity +
        cartCtx.state[2].quantity,
      cost: calTotalPrice(),
    };
    fetch("http://localhost:4000/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((ans) => {
        return ans.json();
      })
      .then((anss) => {
        console.log(anss);
        if (anss.msg === "transaction complete") {
          mobileRef.current.value = "";
          secretRef.current.value = "";
          addressRef.current.value = "";
        }
      });
  }
  return (
    <section className="flex flex-col items-center ml-12 shadow-lg rounded">
      <Head>
        <title>We Buy Cart Page</title>
      </Head>
      <div className="flex justify-between pr-8 items-center">
        <span className="p-3 mx-16 mt-16 mb-8 rounded-md font-semibold text-orange-600 text-4xl ">
          total:
        </span>
        <span className="p-3 mt-16 ml-8 mb-8 rounded-md font-semibold text-4xl text-white bg-orange-400">
          {!isLoading && data && calTotalPrice()} $
        </span>
      </div>

      <section id="ongoing-paayment">
        <section className="w-2/3 m-auto mt-12 pb-8">
          <form onSubmit={handleTransaction}>
            <div>
              <label htmlFor="" className="text-4xl">
                Address:&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  ref={addressRef}
                  className="border-2 border-slate-600 rounded mb-14 "
                />
              </label>
            </div>
            <div>
              <label htmlFor="" className="text-4xl">
                Mobile Number: &nbsp;&nbsp;&nbsp;
                <input
                  type="number"
                  ref={mobileRef}
                  className="border-2 border-slate-600 rounded mb-14"
                />
              </label>
            </div>
            <div>
              <label htmlFor="" className="text-4xl">
                Secret: &nbsp;&nbsp;&nbsp;
                <input
                  ref={secretRef}
                  type="text"
                  className="border-2 border-slate-600 rounded mb-14"
                />
              </label>
            </div>
            <button className="btn2">Confirm order</button>
          </form>
        </section>
      </section>
    </section>
  );
};

export default PaymentDetail;
