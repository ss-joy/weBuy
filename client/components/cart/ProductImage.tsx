import { useGetProductQuery } from "@/store/features/products/productsApi";
import { ExternalLinkIcon, PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductImageProps = {
  productId: string;
};

function ProductImage({ productId }: ProductImageProps) {
  const { data, isLoading, error } = useGetProductQuery(
    {
      id: productId,
    },
    {
      skip: !productId,
    }
  );

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
