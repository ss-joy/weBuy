import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "@/components/ui/Loading";
import Image from "next/image";
import { useContext, useState } from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import DummyContext from "@/contexts/cart-context";

function cutOutFirst100Words(text) {
  const words = text.split(" ");
  const cutWords = words.slice(0, 100);
  return cutWords.join(" ");
}
export default function SingleProductDetailsPage() {
  const [session, loading] = useSession();
  const { decrementProduct, state, incrementProduct } =
    useContext(DummyContext);
  const router = useRouter();

  // const productId = state.map((e) => {
  //   if (e.id === router.query.productId) {
  //     return e.quantity;
  //   }
  // });

  // const [count, setCount] = useState(0);

  // function incrementProductCount() {
  //   setCount((prev) => {
  //     return prev + 1;
  //   });
  // }
  //NICE
  // function decrementProductCount() {
  //   setCount((prev) => {
  //     if (prev > 0) {
  //       return prev - 1;
  //     }
  //     return prev;
  //   });
  // }
  async function fetcher() {
    const response = await fetch(`/api/products/${router.query.productId}`);
    return await response.json();
  }
  const { data, error, isLoading } = useSWR(
    `/api/products/${router.query.productId}`,
    fetcher
  );
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <p className="text-center bg-red-400 p-12 text-white font-bold text-5xl rounded-md shadow shadow-black my-16">
        Sorry .An error happened.Please try again and come back later
      </p>
    );
  }

  return (
    <>
      <div className="mt-12 mb-20 px-8 flex flex-row items-center justify-evenly">
        <section id="image" className="w-1/3">
          <Image
            alt="Product image"
            src={data.product.imagePath}
            width={700}
            height={700}
          />
        </section>
        <section id="product-details" className="w-2/5 ">
          <div>
            <h2 className="text-6xl mb-20 text-orange-600 ">
              {data.product.name}
              {/* <span className="p-3 ml-8 mb-8 rounded-md font-semibold text-white text-2xl bg-orange-400">
                $ {data.product.price}
              </span> */}
              <div className="w-24 mt-4 mb-4 rounded-md p-2 font-bold text-white text-2xl bg-orange-400">
                $ {data.product.price}
              </div>
            </h2>
            <p className="mb-12">
              {cutOutFirst100Words(data.product.description)}
            </p>
          </div>
          <div>
            {session && (
              <div className="flex items-center justify-between px-4">
                <section
                  id="buttons-holder"
                  className="mx-8 flex justify-between items-center"
                >
                  <button
                    className="bg-orange-300 p-4 rounded w-16 text-white font-bold text-3xl"
                    onClick={() => {
                      incrementProduct(router.query.productId);
                    }}
                  >
                    +
                  </button>
                  <span className="text-orange-300 inline-block text-center text-2xl font-bold w-16">
                    <p>
                      {
                        state.find((e) => {
                          return e.id === router.query.productId;
                        }).quantity
                      }
                    </p>
                  </span>
                  <button
                    className="bg-orange-300 p-4 rounded w-16 text-white font-bold text-3xl"
                    onClick={() => {
                      decrementProduct(router.query.productId);
                    }}
                  >
                    -
                  </button>
                </section>

                <section className="mr-16">
                  <Link
                    href={"/cart"}
                    className="bg-blue-500 text-white p-4 rounded font-bold hover:bg-blue-700"
                  >
                    Go to Cart
                  </Link>
                </section>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
