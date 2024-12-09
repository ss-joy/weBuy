import Loading from "@/components/ui/Loading";
import { ecomBackendUrl } from "@/config";
import { UserProducts } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PenIcon, ViewIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProductDeleteModal from "./ProductDeleteModal";
import ViewProductModal from "./ViewProductModal";
import EditProductModal from "./EditProductModal";

type ProductsInventoryProps = {
  userId: string;
};

const ProductsInventory = ({ userId }: ProductsInventoryProps) => {
  const { data, error, refetch, isLoading } = useQuery({
    queryFn: () => {
      return axios.get<UserProducts>(
        `${ecomBackendUrl}/user/${userId}/products`
      );
    },
    queryKey: ["products", userId],
    enabled: userId !== undefined && userId !== null,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Loading />;
  return (
    <div>
      <ul>
        {data?.data.products.map((prod) => {
          return (
            <li
              className="flex gap-5 my-4 items-center rounded-md overflow-hidden pr-2 bg-slate-100"
              key={prod._id}
            >
              <Image
                src={prod.imagePath}
                alt="prod img"
                height={200}
                width={200}
                className="size-[50px]"
              />
              <span>{prod.name}</span>
              <div className="ml-auto flex gap-4">
                <span>{prod.availableCount} units available</span>
                <ViewProductModal productId={prod._id} key={prod._id} />
                <EditProductModal product={prod} />
                <ProductDeleteModal
                  key={prod._id}
                  refetch={refetch}
                  prodName={prod.name}
                  productId={prod._id}
                  userId={userId}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsInventory;
