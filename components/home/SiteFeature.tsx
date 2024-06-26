import { cutOutFirst100Words } from "@/lib";
import Image from "next/image";
import React, { useState } from "react";
interface SiteFeatureProps {
  features: {
    h2: string;
    description: string;
    src: string;
    alt: string;
  };
  id: number;
}
export const SiteFeature = ({
  features,
  id,
}: SiteFeatureProps): JSX.Element => {
  const [showFullText, setShowFullText] = useState<boolean>(false);

  return (
    <section
      className={`p-3 mt-8 px-4 flex mx-auto flex-col xs:p-6 md:p-16 ${
        id % 2 == 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } xl:w-[1200px] `}
    >
      <div className=" lg:w-1/2 xl:m-4">
        <h2 className="text-3xl text-slate-600 mb-4 font-semibold xl:text-4xl transition-all hover:underline hover:underline-offset-4">
          {features.h2}
        </h2>
        <p className={"text-slate-700 text-lg font-light"}>
          {showFullText
            ? features.description
            : cutOutFirst100Words(features.description)}
        </p>

        <button
          className="bg-slate-300 text-slate-700 rounded px-2 font-bold mx-0"
          onClick={() => {
            setShowFullText((prev) => {
              return !prev;
            });
          }}
        >
          {showFullText ? "Show less" : "Show more"}
        </button>
      </div>
      <div className="lg:w-1/2 xl:m-4">
        <Image
          className="w-full rounded-md mt-4"
          src={features.src}
          alt={features.alt}
          width={700}
          height={500}
        />
      </div>
    </section>
  );
};
