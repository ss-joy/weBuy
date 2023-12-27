import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";
import Image from "next/image";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { cartContext } from "@/contexts/cart-context";
import { z } from "zod";
import { cutOutFirst100Words } from "@/lib/custom-utils";
import { useQuery } from "@tanstack/react-query";
import { makeGetRequest } from "@/lib/queryFunctions";

export default function SingleProductDetailsPage(): JSX.Element {
  const { data: session, status } = useSession();
  const [showFullText, setShowFullText] = useState<boolean>(false);
  const isAuthenticated = status === "authenticated" && session;
  const cartCtx = useContext(cartContext);
  if (!cartCtx) {
    throw new Error("Cart Context cannot be null");
  }
  const router = useRouter();
  console.log("client", router.query.productId);
  function findSingleProductQuantity() {
    if (!cartCtx) {
      throw new Error("Cart context cannot be null");
    }
    const product = cartCtx.products.find((element) => {
      return element.productId === router.query.productId;
    });
    return product?.productQuantity;
  }

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
        Sorry .An error happened.Please try again and come back later
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center px-2 sm:px-6 xl:flex-row xl:justify-evenly xl:items-start xl:mx-32 xl:mt-12">
        <section id="image" className="w-full mb-4 sm:w-5/6 lg:w-4/5">
          <Image
            className="rounded mx-auto w-full max-w-2xl shadow-lg shadow-slate-500 transition-all"
            alt="Product image"
            src={data?.data.product.imagePath as string}
            width={700}
            height={700}
          />
        </section>
        <section
          id="product-details"
          className="shadow-md shadow-red-400 sm:w-5/6 lg:w-4/5 lg:p-4 rounded-md max-w-2xl p-2"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-7xl 2xl:mb-6 font-bold text-orange-600">
              {data?.data.product.name}
            </h2>
            <div className="w-24 mt-4 mb-4 rounded-md p-2 font-bold text-white text-2xl bg-orange-400">
              $ {data?.data.product.price}
            </div>
            <p className="my-12 text-lg">
              {showFullText
                ? data?.data.product.description
                : cutOutFirst100Words(data!.data.product.description)}
              <button
                onClick={() => {
                  setShowFullText((prev) => {
                    return !prev;
                  });
                }}
                className="mx-4 bg-slate-300 rounded px-2 font-bold"
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
                    className="bg-orange-300 p-4 rounded w-16 text-white font-bold text-3xl"
                    onClick={() => {
                      cartCtx.increaseProductQuanity(
                        router.query.productId as string,
                        data?.data.product.price as number
                      );
                    }}
                  >
                    +
                  </button>
                  <span className="text-orange-300 inline-block text-center text-2xl font-bold w-16">
                    <p>
                      {findSingleProductQuantity() === undefined
                        ? 0
                        : findSingleProductQuantity()}
                    </p>
                  </span>
                  <button
                    className={`bg-orange-300 p-4 rounded w-16 text-white font-bold text-3xl disabled:bg-slate-500`}
                    disabled={!findSingleProductQuantity()}
                    onClick={() => {
                      cartCtx.decreaseProductQuantity(
                        router.query.productId as string
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
