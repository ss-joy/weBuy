/**
 *
 * TODO:figure out how to make the image
 * skeleton without using a placeholder image
 */
import React from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

export const ProductSkeleton = (): JSX.Element => {
  return (
    <li className="shadow-lg w-full max-w-lg mx-auto shadow-slate-700 rounded-md flex flex-col items-start p-2 pb-4 lg:mx-4 lg:justify-evenly transition-all hover:shadow-slate-500 hover:shadow-2xl lg:p-4">
      <Skeleton className="rounded block mb-7 bg-gray-300" />

      <Skeleton>
        <Image
          alt="placeholder image"
          src={"/ui-images/placeholder-1.webp"}
          width={700}
          height={700}
        />
      </Skeleton>
      <Skeleton className="text-transparent text-2xl font-bold bg-orange-300">
        Product Name
      </Skeleton>

      <Skeleton className="text-transparent bg-slate-400 mb-2">
        provider name
      </Skeleton>
      <Skeleton className="text-transparent bg-slate-400 mb-2">
        rating section
      </Skeleton>

      <section className="flex items-center justify-between w-full">
        <Skeleton className="text-transparent p-3 rounded-md font-semibold text-2xl bg-orange-400">
          price tag
        </Skeleton>

        <Skeleton className="bg-blue-500 transition-all text-transparent font-semibold p-5 rounded hover:bg-white hover:text-blue-800 hover:font-bold hover:shadow hover:shadow-blue-400">
          View product button
        </Skeleton>
      </section>
    </li>
  );
};
