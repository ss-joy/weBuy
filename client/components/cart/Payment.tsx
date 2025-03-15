import React, { Dispatch, SetStateAction } from "react";
import {
  BanknoteIcon,
  Calendar1Icon,
  CreditCardIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { bankBaseUrl } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { emptyCart } from "@/store/features/cart/cartSlice";
import { usePlaceOrderMutation } from "@/store/features/order/orderApi";
import { Button } from "../ui/button";
import { ConfirmOrder } from "@/types";

type PaymentProps = {
  expectedDate: Date;
  setShowDatePickerModal: Dispatch<SetStateAction<boolean>>;
};

const Payment = ({
  expectedDate,
  setShowDatePickerModal,
}: PaymentProps): JSX.Element => {
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
  const [placeOrder, { isLoading: placingOrder, error, data }] =
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
        totalTransactionAmount: calculateTotalPrice(),
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
        description: data?.message || "Order placing failed. Please try again.",
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
        <section className="flex p-2 pt-8 gap-2">
          <Button
            disabled={placingOrder}
            onClick={payWithBank}
            isLoading={placingOrder}
            className="bg-green-600 h-auto disabled:bg-slate-600 text-white text-2xl rounded-md font-bold block shadow-lg shadow-slate-600 hover:shadow-xl hover:shadow-slate-600 transition-all active:bg-green-400 grow"
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
          <Button
            className="bg-slate-600 h-auto disabled:bg-slate-600 text-white text-2xl rounded-md font-bold block shadow-lg shadow-slate-600 hover:shadow-xl hover:shadow-slate-600 transition-all active:bg-green-400 grow"
            onClick={() => {
              setShowDatePickerModal((prev) => !prev);
            }}
          >
            <span className="inline-flex items-center">
              Pick a Date
              <Calendar1Icon className="ml-4" />
            </span>
          </Button>
        </section>
      ) : null}
      <Toaster richColors theme="light" closeButton />
    </div>
  );
};

export default Payment;
