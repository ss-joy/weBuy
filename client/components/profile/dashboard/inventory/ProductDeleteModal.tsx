import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon, ViewIcon } from "lucide-react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ecomBackendUrl } from "@/config";

type ProductDeleteModalProps = {
  prodName: string;
  productId: string;
  userId: string;
  refetch: any;
};
const ProductDeleteModal = ({
  prodName,
  productId,
  userId,
  refetch,
}: ProductDeleteModalProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const queryClient = new QueryClient();

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
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogTrigger asChild>
        <Trash2Icon className="stroke-red-500 hover:cursor-pointer hover:stroke-white hover:fill-red-500 rounded-sm" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Delete {prodName}</DialogTitle>
          <div className="flex justify-between">
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button
              className="bg-red-400"
              onClick={() => deleteProduct(productId)}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteModal;
