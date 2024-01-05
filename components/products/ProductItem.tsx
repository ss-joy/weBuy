import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductSkeleton } from "./ProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { makeGetRequest } from "@/lib/queryFunctions";
import { CopyIcon, Share2Icon, ShoppingBasketIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

interface ProductItemProps {
  isLoading: boolean;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imagePath: string;
    sellerId: string;
    sellerName: string;
  };
}
const ProductItem = ({
  product: { sellerId, imagePath, name, price, _id, sellerName },
  isLoading,
}: ProductItemProps): JSX.Element => {
  const {
    error,
    isLoading: isQueryLoading,
    data,
  } = useQuery({
    queryKey: ["get-single-user-profile", sellerId],
    queryFn: () => makeGetRequest(`/api/user/profile/${sellerId}`),
    enabled: sellerId ? true : false,
  });
  const { toast } = useToast();

  async function copyText() {
    await navigator.clipboard.writeText(
      `https://we-buy-omega.vercel.app/products/${_id}`
    );
    toast({
      title: "Link copied!!!",
      description: "Keep sharing!",
    });
  }
  return (
    <>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <li className="shadow-lg max-w-lg mx-auto shadow-slate-700 rounded-md flex flex-col p-2 pb-4 lg:mx-4 lg:justify-evenly transition-all hover:shadow-slate-500 hover:shadow-2xl lg:p-4 my-5">
            <Image
              className="rounded block mb-7 h-[480px] object-cover"
              alt="Product image"
              src={imagePath}
              width={700}
              height={700}
            />

            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-orange-600">{name}</h2>
              {/* <p className="mb-2">rating,category</p> */}
              <p className="my-4 text-slate-600 font-bold flex items-center justify-start w-full">
                <Image
                  className="rounded-full transition-all hover:shadow-md hover:shadow-slate-500"
                  src={
                    data?.data.user.profilePicture
                      ? data?.data.user.profilePicture
                      : "/ui-images/dummy-user.jpg"
                  }
                  width={40}
                  height={40}
                  alt="profile image of user"
                />
                <span className="ml-4">{sellerName}</span>
              </p>

              <section className="flex items-center justify-between w-full mt-6">
                <span className="p-3 rounded-md font-semibold text-white text-2xl bg-orange-400">
                  $ {price}
                </span>
                <Link
                  className="bg-blue-500 ml-auto mr-3 flex transition-all text-white font-semibold p-5 rounded hover:bg-white hover:text-blue-800 hover:font-bold hover:shadow hover:shadow-blue-400"
                  href={`/products/${_id}`}
                >
                  <span className="mr-6">View Product</span>{" "}
                  <ShoppingBasketIcon />
                </Link>
                <Popover>
                  <PopoverTrigger>
                    <Share2Icon className="w-10 h-10 text-slate-500 rounded" />
                  </PopoverTrigger>
                  <PopoverContent
                    onClick={copyText}
                    className="flex items-center justify-between w-[140px] hover:border-blue-300 hover:border-2 "
                  >
                    Copy Link
                    <CopyIcon />
                  </PopoverContent>
                </Popover>
              </section>
            </div>
          </li>
          <Toaster />
        </>
      )}
    </>
  );
};

export default ProductItem;
