import React from "react";
import { BanknoteIcon, CreditCardIcon, ExternalLinkIcon } from "lucide-react";
import { Toaster, toast } from "sonner";
import { bankBaseUrl } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { emptyCart } from "@/store/features/cart/cartSlice";
import { usePlaceOrderMutation } from "@/store/features/order/orderApi";
import { Button } from "../ui/button";
import { ConfirmOrder } from "@/types";

type PaymentProps = {
  expectedDate: Date;
};

const Payment = ({ expectedDate }: PaymentProps): JSX.Element => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    user: { userId },
  } = useAppSelector((state) => state.auth);

  function calculateTotalPrice() {
    let sum = 0;
    cartItems.map((element) => {
      return (sum += element.productQuantity * element.productPrice);
    });
    return sum;
  }
  const [placeOrder, { isLoading: placingOrder, error }] =
    usePlaceOrderMutation();

  async function payWithBank() {
    try {
      if (!expectedDate) {
        toast("Please pick an expected data for delivery", {
          richColors: true,
        });
        return;
      }
      const data: ConfirmOrder = {
        buyerId: userId as string,
        expectedDate: expectedDate.toISOString(),
        transactionAmount: calculateTotalPrice(),
        orderedProducts: cartItems.map((c) => ({
          orderedProductsCount: c.productQuantity,
          productId: c.productId,
          sellerId: c.productSellerId,
        })),
      };
      await placeOrder({ data }).unwrap();

      toast.success("Transaction Successful!", {
        description: "You will be shortly redirected...",
      });
      dispatch(emptyCart());
    } catch (error) {
      console.log(error);
      toast.warning("Transaction failed", {
        description: "Try again..",
      });
    }
  }
  return (
    <div>
      <section className="border border-slate-400 w-full rounded p-4">
        <p className="bg-slate-600 text-white font-bold text-3xl mb-2 flex items-center rounded p-2">
          Pay with we bank <CreditCardIcon className="ml-2 md:ml-5" />
        </p>
        <p className="font-bold text-gray-500 mb-4">
          Remember you have to sign up to we bank if you want to purchase..
        </p>
        <p className="text-slate-600  text-3xl font-bold mb-4">
          {calculateTotalPrice()} $
        </p>
        <p>
          <a
            className="text-center mx-auto  text-blue-400 font-bold flex items-center "
            href={bankBaseUrl}
            target="_blank"
          >
            visit we Bank <ExternalLinkIcon className="ml-2 md:ml-5" />
          </a>
        </p>
      </section>
      {cartItems.length > 0 ? (
        <Button
          disabled={placingOrder}
          onClick={payWithBank}
          isLoading={placingOrder}
          className="bg-green-600 h-auto disabled:bg-slate-600 text-white text-2xl rounded-md font-bold p-4 block shadow-lg shadow-slate-600 mx-auto my-8  hover:shadow-xl hover:shadow-slate-600 transition-all active:bg-green-400"
        >
          {placingOrder ? (
            "Contacting Bank"
          ) : (
            <span className="inline-flex items-center">
              Pay with weBank
              <BanknoteIcon className="ml-4" />
            </span>
          )}
        </Button>
      ) : null}
      <Toaster richColors theme="light" closeButton />
    </div>
  );
};

export default Payment;
