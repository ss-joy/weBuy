import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { getSession } from "next-auth/react";
import { z } from "zod";
import axios from "axios";
import Loading from "@/components/ui/Loading";
import { cn } from "@/lib";
import { Input } from "@/components/ui/input";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { categories } from "../../components/products/ProductsCategory";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Toaster, toast } from "sonner";

type FormData = {
  description: string;
  price: number;
  name: string;
  productImage: FileList;
  productCategory: string;
};
const FormDataSchema = z
  .object({
    description: z.string(),
    price: z.number().min(0, "price must be greater than 0"),
    name: z.string(),
    productCategory: z.string(),
  })
  .passthrough();
const AddProductPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>("");

  const {
    handleSubmit,
    register,
    resetField,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

    if (file) {
      const reader = new FileReader();
      /**
       *onload is called when the file reader
       *finishes loading a file.
       */
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      /**
       *We gotta call this so that
       *the file reader starts
       *loading/reading the file
       */
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(formData: FormData) {
    const data: FormData = {
      productCategory: formData.productCategory,
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      productImage: formData.productImage,
    };

    try {
      FormDataSchema.parse(data);
    } catch (error) {
      console.log(error);
      toast.warning("Adding product failed", {
        description: "Invalid inputs. Check everything and try againxd",
      });
      return;
    }
    console.log(data);
    console.log(data.productImage[0]);
    if (data.productImage[0]) {
      try {
        const imageRef = ref(
          storage,
          `product-images/${File.name + v4() + Date.now()}`
        );
        await uploadBytes(imageRef, data.productImage[0]);
        const url = await getDownloadURL(imageRef);
        const session = await getSession();
        const response = await axios.post("/api/products/add-product", {
          name: data.name,
          description: data.description,
          price: Number(data.price),
          imagePath: url,
          sellerName: session?.user?.name,
          //@ts-ignore
          sellerId: session?.user.user_id,
          productCategory: data.productCategory,
        });
        console.log(response);
        if (response.data.status === "success") {
          reset();
          setImagePreview("");
          toast.success("Product added Successfully!", {
            description:
              "You have successfully added the product. Visit shop here page to view it...",
          });
        } else if (response.data.status === "error") {
          toast.error("Adding product failed", {
            description:
              response.data.message ||
              "Something went wrong. Please check everything carefully and try again",
          });
        }
      } catch (error) {
        console.log(error);
        alert("error");
      }
    }
  }

  return (
    <div>
      <p className="mt-8 text-center font-sans font-semibold text-slate-500 text-2xl">
        Add Products here. Other can buy these from you..
      </p>

      <form
        className="flex flex-col mt-8 mx-auto shadow-md shadow-black-200 p-6 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-[500px] sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="text-2xl text-slate-600 font-semibold">
          Product information
        </h1>
        <p className="text-slate-500 my-1 mb-7">
          add your product information below.
        </p>
        <label className="form-label" htmlFor="productName">
          Product name
        </label>
        <p className="text-red-700">{errors.name?.message}</p>

        <input
          {...register("name", {
            required: { value: true, message: "Product name is required" },
          })}
          className={cn("form-input", "rounded-xl")}
          type="text"
          id="productName"
        />
        <label className="form-label" htmlFor="productPrice">
          Product price
        </label>
        <p className="text-red-700">{errors.price?.message}</p>

        <input
          {...register("price", {
            required: { value: true, message: "Product price is required" },
            min: {
              value: 0,
              message: "Product price must be at least 0.",
            },
          })}
          className={cn("form-input", "rounded-xl")}
          type="number"
          id="productPrice"
        />
        <p className="text-red-700">{errors.productCategory?.message}</p>

        <select
          className={cn("form-label", "px-3 py-3 bg-blue-100/75 rounded")}
          {...register("productCategory", {
            required: {
              value: true,
              message: "you must pick a category for your product",
            },
          })}
        >
          <option value="">Select a category</option>
          {categories.map((category) => {
            return (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryId}
              </option>
            );
          })}
        </select>
        <label className="form-label" htmlFor="productDescription">
          Product Description
        </label>
        <p className="text-red-700">{errors.description?.message}</p>

        <textarea
          {...register("description", {
            required: {
              value: true,
              message: "Product description is required",
            },
          })}
          className={cn("form-input", "rounded-xl")}
          id="productDescription"
        />
        <p className="text-red-700">{errors.productImage?.message}</p>
        <Input
          {...register("productImage", {
            required: {
              value: true,
              message: "Please select an image for the product",
            },
          })}
          className="my-4 border-2 border-blue-300 rounded p-2"
          onChange={handleFileChange}
          type="file"
        />
        {/* <input
          type="file"
          {...register("productImage", {
            required: {
              value: true,
              message: "Please select an image for the product",
            },
          })}
          className="my-4 border-2 border-blue-300 rounded p-2"
          onChange={handleFileChange}
        /> */}

        {imagePreview && (
          <div className="relative border-2">
            <img className="w-[300px] rounded mb-6" src={imagePreview} />
            <Cross1Icon
              onClick={() => {
                resetField("productImage");
                setImagePreview("");
              }}
              className="rounded-full bg-white absolute top-0 right-0 border-red-600 border-2 w-[30px] h-[30px]"
            />
          </div>
        )}
        <button
          type="submit"
          className="btn2 disabled:bg-gray-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loading className="bg-white" />
          ) : (
            <span>Add Product</span>
          )}
        </button>
      </form>
      <Toaster richColors theme="light" closeButton />
    </div>
  );
};

export default AddProductPage;
export const getServerSideProps = (async (context) => {
  const sessionFound = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!sessionFound) {
    return {
      redirect: {
        destination: "/helper/no-auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}) satisfies GetServerSideProps<{}>;
