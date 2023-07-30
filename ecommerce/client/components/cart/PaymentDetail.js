import { findProductQuantity } from "@/utils/product-cart";
import React from "react";
import Head from "next/head";

const PaymentDetail = ({ isLoading, data, cartDetail }) => {
  function calTotalPrice() {
    let total = 0;
    data.map((e) => {
      total = total + +e.price * +findProductQuantity(e._id, cartDetail);
    });
    return total;
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

      <div className="mt-44">
        <button className="btn2">Confirm Order and Pay</button>
      </div>
    </section>
  );
};

export default PaymentDetail;
