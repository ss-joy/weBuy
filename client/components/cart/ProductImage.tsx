import { ecomBackendUrl } from "@/config";
import { makeGetRequest } from "@/queries";
import { Product } from "@/types/products-type";
import { useQuery } from "@tanstack/react-query";
import { ExternalLinkIcon, PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { z } from "zod";
type ProductImageProps = {
  productId: string;
};

function ProductImage({ productId }: ProductImageProps) {
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["get-single-product-details", productId],
    queryFn: () => makeGetRequest(`${ecomBackendUrl}/products/${productId}`),
  });

  return (
    <>
      {data?.imagePath ? (
        <div>
          <Image
            src={data?.imagePath}
            width={100}
            height={100}
            alt="product image"
          />
          <p>
            <Link
              className="flex items-center text-slate-600 hover:text-orange-400"
              href={`/products/${productId}`}
            >
              {data.name}
              <ExternalLinkIcon className="md:ml-2" />
            </Link>
          </p>
        </div>
      ) : (
        <PackageSearch />
      )}
    </>
  );
}

export default ProductImage;
