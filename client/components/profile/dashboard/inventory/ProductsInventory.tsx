import Loading from "@/components/ui/Loading";
import { ecomBackendUrl } from "@/config";
import { UserProducts } from "@/types";
import { Product } from "@/types/products-type";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BookOpen,
  BoxIcon,
  BoxSelect,
  FolderOpen,
  PenIcon,
  Trash2Icon,
  ViewIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ProductDeleteModal from "./ProductDeleteModal";

type ProductsInventoryProps = {
  userId: string;
};

const ProductsInventory = ({ userId }: ProductsInventoryProps) => {
  const queryClient = new QueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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

  console.log(data);

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${ecomBackendUrl}/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", userId],
      });
      console.log("success");
      setIsDeleteModalOpen(false);
      refetch();
    },
  });

  function deleteProduct(id: string) {
    mutate(id);
  }

  if (isLoading) return <Loading />;
  return (
    <div>
      <ul>
        {data?.data.products.map((prod) => {
          return (
            <li
              className="flex gap-5 my-4 items-center rounded-md pr-2 bg-slate-100"
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
                <ViewIcon
                  className="hover:cursor-pointer"
                  onClick={() => setIsDeleteModalOpen(true)}
                />
                <PenIcon className="hover:cursor-pointer hover:stroke-white hover:fill-slate-500 rounded-sm" />
                <ProductDeleteModal
                  key={prod._id}
                  open={isDeleteModalOpen}
                  onOpenChange={setIsDeleteModalOpen}
                  prodName={prod.name}
                  deleteFunc={deleteProduct}
                  productId={prod._id}
                  isDeleting={isDeleting}
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
