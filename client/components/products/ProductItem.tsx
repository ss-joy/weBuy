import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductSkeleton } from "./ProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { makeGetRequest } from "@/queries";
import {
  CopyIcon,
  Share2Icon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster, toast } from "sonner";
import { ecomBaseUrl } from "@/config";

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
    productCategory: string;
    sellCount: number;
  };
}
const ProductItem = ({
  product: {
    sellerId,
    imagePath,
    name,
    price,
    _id,
    sellerName,
    productCategory,
    sellCount,
  },
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

  async function copyText() {
    await navigator.clipboard.writeText(`${ecomBaseUrl}/products/${_id}`);
    toast.info("Link copied!!!", {
      description: "Keep sharing!",
    });
  }
  return (
    <>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <li className="transition-all relative shadow-2xl shadow-slate-500 hover:shadow-md hover:shadow-slate-600 rounded mx-auto my-4 p-2 w-[99%] min-[521px]:w-[90%]  min-[521px]:h-auto md:w-[400px] pb-[56px]">
            <Image
              className="rounded block object-cover w-full h-[370px]"
              alt="Product image"
              src={imagePath}
              width={700}
              height={700}
            />
            {/* <div className="mt-auto"> */}
            <h2 className="text-2xl font-bold text-orange-600">{name}</h2>
            <p className="mb-2 text-blue-500 font-bold">{productCategory}</p>
            <p className="flex items-center">
              <ShoppingBagIcon className="text-slate-500 mr-2" />
              <span className="mr-1">{sellCount}</span>
              other people purchased this
            </p>
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

            <section
              id="price-details"
              className="absolute bottom-2 left-2 flex items-center justify-start w-[96%]"
            >
              <span className="p-3 rounded-md font-semibold text-white text-2xl bg-orange-400">
                {price}$
              </span>
              <div
                id="price-share-holder"
                className="flex items-center ml-auto"
              >
                <Link
                  id="view-products-button"
                  className="bg-blue-500 mr-1 flex items-center transition-all text-white font-semibold px-3 py-4 rounded hover:bg-white hover:text-blue-800 hover:font-bold hover:shadow hover:shadow-blue-400"
                  href={`/products/${_id}`}
                >
                  <span className="">View Product</span>
                  <ShoppingBasketIcon />
                </Link>
                <Popover>
                  <PopoverTrigger>
                    <Share2Icon className="w-7 h-7 text-slate-500 rounded md:mx-4" />
                  </PopoverTrigger>
                  <PopoverContent
                    onClick={copyText}
                    className="flex items-center justify-between w-[140px] hover:border-blue-300 hover:border-2 "
                  >
                    Copy Link
                    <CopyIcon />
                  </PopoverContent>
                </Popover>
              </div>
            </section>
          </li>
          <Toaster richColors theme="light" closeButton />
        </>
      )}
    </>
  );
};

export default ProductItem;
