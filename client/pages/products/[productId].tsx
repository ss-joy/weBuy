import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { z } from "zod";
import { cutOutFirst100Words } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { makeGetRequest } from "@/queries";
import ErrorMsg from "@/components/ui/ErrorMsg";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} from "@/store/features/cart/cartSlice";

export default function SingleProductDetailsPage(): JSX.Element {
  const { data: session, status } = useSession();
  const [showFullText, setShowFullText] = useState<boolean>(false);
  const isAuthenticated = status === "authenticated" && session;

  const router = useRouter();
  const productId = router.query.productId;

  const dispatch = useAppDispatch();
  const productFound = useAppSelector((state) =>
    state.cart.cartItems.find((data) => data.productId === productId)
  );

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
        sellerId: z.string(),
      }),
    }),
  });
  type ApiResponseType = z.infer<typeof apiResponseSchema>;

  const { data, isLoading, error } = useQuery<ApiResponseType>({
    queryKey: ["get-single-product-details", router.query.productId],
    queryFn: () => makeGetRequest(`/api/products/${router.query.productId}`),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
    return (
      <p className="text-center bg-red-400 p-12 text-white font-bold text-5xl rounded-md shadow shadow-black my-16">
        <ErrorMsg />
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center px-2 sm:px-6 xl:flex-row xl:justify-evenly xl:items-start xl:mx-32 xl:mt-12 2xl:w-[1450px] 2xl:mx-auto 2xl:mt-16">
        <section
          id="image"
          className="w-full mb-4 sm:w-5/6 lg:w-4/5 lg:m-0 lg:mb-6"
        >
          <Image
            className="rounded mx-auto w-full max-w-2xl shadow shadow-slate-500 transition-all"
            alt="Product image"
            src={data?.data.product.imagePath as string}
            width={700}
            height={700}
          />
        </section>
        <section
          id="product-details"
          className="shadow-md px-2 pt-0 mt-0 shadow-slates-400 sm:w-5/6 lg:w-4/5 lg:mx-6 lg:p-4 lg:pt-0 rounded-md max-w-2xl"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-7xl 2xl:mb-6 font-bold text-orange-500">
              {data?.data.product.name}
            </h2>
            <div className="w-24 mt-4 mb-4 rounded-md p-2 font-bold text-2xl lg:text-3xl text-orange-400">
              $ {data?.data.product.price}
            </div>
            <p className="my-5 text-lg">
              {showFullText
                ? data?.data.product.description
                : cutOutFirst100Words(data!.data.product.description)}
              <button
                onClick={() => {
                  setShowFullText((prev) => {
                    return !prev;
                  });
                }}
                className="bg-slate-300 rounded text-slate-700 px-2 font-bold"
              >
                {showFullText ? "Show less" : "Show more"}
              </button>
            </p>
          </div>
          <div>
            {isAuthenticated && (
              <div
                id="authenticate-to-edit-cart"
                className="flex flex-col justify-center"
              >
                <section
                  id="buttons-holder"
                  className="mx-8 flex justify-between items-center"
                >
                  <button
                    className="bg-orange-300 transition-all p-4 rounded w-16 text-white font-bold text-3xl hover:text-orange-300 hover:bg-white shadow shadow-orange-300"
                    onClick={() => {
                      dispatch(
                        increaseCartItemQuantity({
                          productId: productId?.toString() as string,
                          productPrice: data?.data.product.price as number,
                          productSellerId: data?.data.product
                            .sellerId as string,
                        })
                      );
                    }}
                  >
                    +
                  </button>
                  <span className="text-orange-300 inline-block text-center text-2xl font-bold w-16">
                    <p>{productFound ? productFound.productQuantity : 0}</p>
                  </span>
                  <button
                    className={`bg-orange-300 transition-all p-4 rounded w-16 text-white font-bold text-3xl hover:text-orange-300 hover:bg-white shadow shadow-orange-300 disabled:bg-slate-500 disabled:cursor-not-allowed`}
                    disabled={!productFound}
                    onClick={() => {
                      dispatch(
                        decreaseCartItemQuantity({
                          productId: productId?.toString() as string,
                        })
                      );
                    }}
                  >
                    -
                  </button>
                </section>
                <p className="text-center my-6">
                  <Link
                    href={"/cart"}
                    className="bg-blue-500 text-white rounded font-bold hover:bg-blue-700 p-4 block"
                  >
                    Go to Cart
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
