import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { BanknoteIcon, CreditCardIcon, ExternalLinkIcon } from "lucide-react";
import { Toaster, toast } from "sonner";
import { bankBaseUrl } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { emptyCart } from "@/store/features/cart/cartSlice";
const Payment = (): JSX.Element => {
  const router = useRouter();
  const { cartItems } = useAppSelector((state) => state.cart);

  const [loading, setIsloading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  function calculateTotalPrice() {
    let sum = 0;
    cartItems.map((element) => {
      return (sum += element.productQuantity * element.productPrice);
    });

    return sum;
  }

  async function payWithBank() {
    setIsloading(true);
    const userSession = await getSession();
    if (!userSession) {
      toast("You must log in to buy anything", {
        description: "Try again..",
      });

      setIsloading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/transactions/transact-money`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            buyerEmail: userSession.user?.email,
            //@ts-ignore
            buyerId: userSession.user!.user_id,
            totalCost: calculateTotalPrice(),
            cartProductsDetails: cartItems,
          }),
        }
      );

      const pResponse = await response.json();
      if (pResponse.status === "success") {
        toast.success("Transaction Successful!", {
          description: "You will be shortly redirected...",
        });
        dispatch(emptyCart());
        setIsloading(false);
        setTimeout(() => {
          router.push("/orders");
        }, 1000);
        return;
      } else if (pResponse.status === "error") {
        setIsloading(false);
        toast.warning("Transaction failed", {
          description: pResponse.message || "Try again..",
        });

        return;
      }
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      toast.warning("Transaction failed", {
        description: "Try again..",
      });
      console.log(error);
    }
  }
  return (
    <div>
      <section className="border border-slate-400 lg:h-56 m-4 lg:sticky lg:top-1 rounded p-4">
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
      <section>
        <button
          disabled={loading}
          onClick={payWithBank}
          className="bg-green-600 disabled:bg-slate-600 text-white text-2xl rounded-md font-bold p-4 block shadow-lg shadow-slate-600 mx-auto mb-8  hover:shadow-xl hover:shadow-slate-600 transition-all active:bg-green-400"
        >
          {loading ? (
            "Contacting Bank"
          ) : (
            <span className="inline-flex items-center">
              Pay with weBank
              <BanknoteIcon className="ml-4" />
            </span>
          )}
        </button>
      </section>
      <Toaster richColors theme="light" closeButton />
    </div>
  );
};

export default Payment;
