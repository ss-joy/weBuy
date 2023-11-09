import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { z } from "zod";
import ErrorMsg from "../ui/ErrorMsg";

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

  async function fetcher() {
    const response = await fetch(`/api/products/${productId}`);

    const parsedResponse: ApiResponseType = await response.json();
    const data = apiResponseSchema.parse(parsedResponse);
    return data;
  }
  const { data, error, isLoading } = useSWR(
    `/api/products/${productId}`,
    fetcher
  );
  if (error) {
    return <ErrorMsg />;
  }
  console.log(data);
  return (
    <li className="border-2 px-2 shadow-lg shadow-slate-400 my-4 rounded-md py-4 text-xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:px-6">
      <section id="name-image-display">
        <Image
          className="rounded shadow-md shadow-slate-400 w-full mx-auto lg:mx-0 mb-2 max-w-xl lg:w-80"
          src={data?.data.product.imagePath as string}
          alt="product image"
          height={700}
          width={700}
        />
        <h2 className="mb-2 font-bold text-orange-600 sm:text-3xl lg:max-w-sm">
          {data?.data.product.name}
        </h2>
      </section>
      <section
        id="item-count-section"
        className="border-4 mb-4 rounded-md flex flex-col lg:text-2xl xl:text-3xl lg:mx-4"
      >
        <div className="flex justify-between lg:flex-col lg:items-center">
          <p className="bg-orange-400 text-white font-bold px-2 py-1">
            Price each unit
          </p>
          <p className="ml-5 text-orange-500 font-bold">
            {data?.data.product.price}$
          </p>
        </div>
        <div className="py-2 flex items-center lg:flex-col justify-between">
          <p className="bg-orange-400 text-white font-bold px-2 py-1">Total</p>
          <p className="ml-5 text-orange-500 font-bold">
            {productQuantity} pc's
          </p>
        </div>
      </section>
      <section
        id="total-price-calculation"
        className="flex justify-between items-center lg:flex-col lg:text-2xl border-4 rounded-md lg:pb-4 xl:text-3xl"
      >
        <p className="bg-orange-400 text-white font-bold px-2 py-1">
          Total Price
        </p>
        <p className="text-orange-400 font-bold mx-2">
          {productQuantity} X {data?.data.product.price}=
          {productQuantity * data?.data.product.price!}
        </p>
      </section>
    </li>
  );
};

export default SingleCartProductDetails;
