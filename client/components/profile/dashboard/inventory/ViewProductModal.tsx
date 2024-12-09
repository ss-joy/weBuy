import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ViewIcon } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/products-type";
import { ecomBackendUrl } from "@/config";
import axios from "axios";
import Loading from "@/components/ui/Loading";
import ErrorMsg from "@/components/ui/ErrorMsg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ViewProductModalProps = { productId: string };
const ViewProductModal = ({ productId }: ViewProductModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", productId],
    queryFn: () =>
      axios.get<Product>(`${ecomBackendUrl}/products/${productId}`),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return (
      <p className="text-center bg-red-400 p-12 text-white font-bold text-5xl rounded-md shadow shadow-black my-16">
        <ErrorMsg />
      </p>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <ViewIcon
          className="hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="w-[80%] mt-[50px] max-w-full">
        <DialogHeader>
          <DialogTitle>View Product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center px-2 xl:flex-row xl:justify-evenly xl:items-start xl:mt-12 w-full 2xl:mx-auto 2xl:mt-16">
          <section
            id="image"
            className="w-full mb-4 sm:w-5/6 lg:w-4/5 lg:m-0 lg:mb-6"
          >
            <Image
              className="rounded mx-auto w-full max-w-2xl shadow shadow-slate-500 transition-all"
              alt="Product image"
              src={data ? data.data.imagePath : ""}
              width={700}
              height={700}
            />
          </section>
          <section
            id="product-details"
            className="shadow-md px-2 pt-0 mt-0 shadow-slates-400 sm:w-5/6 lg:w-4/5 lg:mx-6 lg:p-4 lg:pt-0 rounded-md max-w-2xl"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-7xl 2xl:mb-6 font-bold text-orange-500">
                {data?.data?.name}
              </h2>
              <div className="w-24 mt-4 mb-4 rounded-md p-2 font-bold text-2xl lg:text-3xl text-orange-400">
                $ {data?.data?.price}
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:no-underline text-start">
                    {data?.data.description.slice(0, 390)}
                  </AccordionTrigger>
                  <AccordionContent>{data?.data.description}</AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex flex-wrap gap-2 mt-2 p-2 rounded-lg bg-orange-300 text-white font-bold">
                {data?.data.productCategory}
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProductModal;
