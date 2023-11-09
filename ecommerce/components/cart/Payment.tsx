import { cartContext } from "@/contexts/cart-context";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

const Payment = (): JSX.Element => {
  const cartCtx = useContext(cartContext);
  function calculateTotalPrice() {
    let sum = 0;
    cartCtx?.products.map((element) => {
      return (sum += element.productQuantity * element.productPrice);
    });
    console.log(sum);
    return sum;
  }
  function payWithBank() {}
  return (
    <div>
      <section className="border-2 border-red-400 lg:h-52 m-4 lg:sticky lg:top-1 rounded">
        <p className="text-orange-600 font-bold text-3xl text-center mb-2 lg:p-4">
          Grand Total
        </p>
        <p className="text-white bg-orange-600 text-3xl text-center font-bold">
          {calculateTotalPrice()} $
        </p>
      </section>
      <section>
        <button
          onClick={payWithBank}
          className="bg-green-600 text-white text-2xl rounded-md font-bold p-4 block shadow-lg shadow-slate-600 mx-auto mb-8  hover:shadow-xl hover:shadow-slate-600 transition-all active:bg-green-400"
        >
          Pay with weBank
        </button>
      </section>
    </div>
  );
};

export default Payment;
