import Loading from "@/components/ui/Loading";
import Image from "next/image";
import React from "react";
import ProductDeleteModal from "./ProductDeleteModal";
import ViewProductModal from "./ViewProductModal";
import EditProductModal from "./EditProductModal";
import { useGetUsersProductsQuery } from "@/store/features/products/productsApi";

type ProductsInventoryProps = {
  userId: string;
};

const ProductsInventory = ({ userId }: ProductsInventoryProps) => {
  const { data, isLoading: loadingProducts } = useGetUsersProductsQuery({
    userId,
  });

  if (loadingProducts) return <Loading />;

  const content = data?.map((prod, i) => {
    return (
      <li
        className="flex gap-5 my-4 items-center rounded-md overflow-hidden pr-2 bg-slate-100"
        key={i}
      >
        <Image
          src={prod.imagePath}
          alt="prod img"
          height={200}
          width={200}
          className="size-[80px]"
        />
        <span>{prod.name}</span>
        <div className="ml-auto flex gap-4">
          <span>{prod.availableCount} units available</span>
          <ViewProductModal productId={prod._id} key={prod._id} />
          <EditProductModal product={prod} />
          <ProductDeleteModal
            key={i}
            prodName={prod.name}
            productId={prod._id}
            userId={userId}
          />
        </div>
      </li>
    );
  });

  return (
    <div>
      <ul>{content}</ul>
    </div>
  );
};

export default ProductsInventory;
