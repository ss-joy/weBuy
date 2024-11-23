import { makeGetRequest } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { ExternalLinkIcon, PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { z } from "zod";
type ProductImageProps = {
  productId: string;
};
const apiResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    product: z.object({
      _id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      imagePath: z.string(),
    }),
  }),
});
type ApiResponseType = z.infer<typeof apiResponseSchema>;
function ProductImage({ productId }: ProductImageProps) {
  const { data, isLoading, error } = useQuery<ApiResponseType>({
    queryKey: ["get-single-product-details", productId],
    queryFn: () => makeGetRequest(`/api/products/${productId}`),
  });

  return (
    <>
      {data?.data.product.imagePath ? (
        <div>
          <Image
            src={data?.data.product.imagePath}
            width={100}
            height={100}
            alt="product image"
          />
          <p>
            <Link
              className="flex items-center text-slate-600 hover:text-orange-400"
              href={`/products/${productId}`}
            >
              {data.data.product.name}
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
