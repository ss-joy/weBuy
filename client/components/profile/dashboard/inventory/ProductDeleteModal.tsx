import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useDeleteProductMutation } from "@/store/features/products/productsApi";

type ProductDeleteModalProps = {
  prodName: string;
  productId: string;
  userId: string;
};
const ProductDeleteModal = ({
  prodName,
  productId,
  userId,
}: ProductDeleteModalProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  async function handleDeleteButtonClick() {
    await deleteProduct({ productId: productId, userId });
    setIsDeleteModalOpen(false);
  }
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogTrigger asChild>
        <Trash2Icon className="stroke-red-500 hover:cursor-pointer hover:stroke-white hover:fill-red-500 rounded-sm" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete product</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        Are you sure you want to delete {prodName}?
        <div className="flex justify-between">
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button
            className="bg-red-400"
            onClick={() => handleDeleteButtonClick()}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteModal;
