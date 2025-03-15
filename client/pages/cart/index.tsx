import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";

const NoSSRCartDetailsTable = dynamic(
  () => import("@/components/cart/CartDetailsTable"),
  { ssr: false }
);

const NoSSRPayment = dynamic(() => import("@/components/cart/Payment"), {
  ssr: false,
});

import { useAppSelector } from "@/hooks/redux-hooks";
import { useState } from "react";
import EmptyCart from "@/components/cart/EmptyCart";
import DeliveryDatePickerModal from "@/components/cart/DeliveryDatePickerModal";

type CartIndexPageProps = {};

export default function ShowCart(props: CartIndexPageProps): JSX.Element {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>we Buy | Cart page</title>
      </Head>
      <div
        id="full-cart-container"
        className="flex flex-col-reverse lg:flex-row-reverse lg:w-4/5 lg:justify-evenly mt-12 mx-auto"
      >
        {cartItems.length > 0 ? (
          <div className="flex flex-col md:flex-row-reverse gap-24 p-3">
            <section className="flex flex-col gap-4 justify-start">
              <NoSSRPayment
                expectedDate={date as Date}
                setShowDatePickerModal={setShowModal}
              />
              <DeliveryDatePickerModal
                date={date}
                setDate={setDate}
                setShowModal={setShowModal}
                showModal={showModal}
              />
            </section>

            <NoSSRCartDetailsTable products={cartItems} />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
}
