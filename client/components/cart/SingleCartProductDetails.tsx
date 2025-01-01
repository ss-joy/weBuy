import Image from "next/image";
import React from "react";
import { z } from "zod";
import ErrorMsg from "../ui/ErrorMsg";

import Loading from "../ui/Loading";
import { useGetProductQuery } from "@/store/features/products/productsApi";

interface SingleCartProductDetailsProps {
  productQuantity: number;
  productId: string;
}
const SingleCartProductDetails = ({
  productId,
  productQuantity,
}: SingleCartProductDetailsProps) => {
  const apiResponseSchema = z.object({
    status: z.string(),
    message: z.string(),
    data: z.object({
      product: z.object({
        _id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        imagePath: z.string(),
      }),
    }),
  });
  type ApiResponseType = z.infer<typeof apiResponseSchema>;

  const { data, isLoading, error } = useGetProductQuery(
    { id: productId },
    {
      skip: !productId,
    }
  );
  if (error) {
    return <ErrorMsg />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <li className="flex my-4 flex-col mx-2 shadow-sm shadow-slate-500 rounded-md overflow-hidden xs:mx-12 xs:my-12 md:flex-row md:justify-evenly">
      <section
        id="product-image-name"
        className="px-2 md:p-4 md:flex-col md:w-64 border-2"
      >
        <Image
          width={500}
          height={500}
          src={data?.imagePath as string}
          alt="product image"
          className="w-full block md:w-full rounded-md"
        />
        <h2 className="text-slate-500 font-bold text-start text-2xl xs:text-3xl">
          {data?.name}
        </h2>
      </section>
      <section
        id="unit-price-details"
        className="text-orange-400 border-2 font-bold text-center text-3xl flex justify-around  md:flex-col md:justify-center md:px-12"
      >
        <p>{productQuantity}pc's</p>X<p>{data?.price}$</p>
      </section>
      <section id="total-per-product" className="flex flex-col border-2">
        <p className="bg-orange-400 font-bold text-white text-center text-2xl md:mb-24 md:px-12">
          Total
        </p>
        <p className="text-orange-400 font-bold text-center text-3xl">
          {productQuantity * data?.price!}$
        </p>
      </section>
    </li>
  );
};

export default SingleCartProductDetails;
