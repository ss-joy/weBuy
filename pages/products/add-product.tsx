import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { getSession } from "next-auth/react";
import { z } from "zod";
import axios from "axios";
import Loading from "@/components/ui/Loading";
type FormData = {
  description: string;
  price: number;
  name: string;
  productImage: FileList;
};
const FormDataSchema = z
  .object({
    description: z.string(),
    price: z.number().min(0, "price must be greater than 0"),
    name: z.string(),
  })
  .passthrough();
const AddProductPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>("");

  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    console.log(e.target.files![0]);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(formData: FormData) {
    const data: FormData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      productImage: formData.productImage,
    };

    try {
      FormDataSchema.parse(data);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Adding product failed",
        description: "Invalid inputs. Check everything and try againxd",
      });
      return;
    }
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
        });
        console.log(response);
        if (response.data.status === "success") {
          reset();
          setImagePreview("");
          toast({
            title: "Product added Successfully!",
            description:
              "You have successfully added the product. Visit shop here page to view it...",
          });
        } else if (response.data.status === "error") {
          toast({
            variant: "destructive",
            title: "Adding product failed",
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
      <p className="text-center font-sans font-semibold text-slate-500">
        You are adding this product. <br />
        Others will be able to buy these from you!
      </p>
      <form
        className="flex flex-col mt-8 mx-auto p-2 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-2/5 sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label className="form-label" htmlFor="productName">
          Product name
        </label>
        <p className="text-red-700">{errors.name?.message}</p>

        <input
          {...register("name", {
            required: { value: true, message: "Product name is required" },
          })}
          className="form-input"
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
          className="form-input"
          type="number"
          id="productPrice"
        />
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
          className="form-input"
          id="productDescription"
        />
        <p className="text-red-700">{errors.productImage?.message}</p>

        <input
          type="file"
          {...register("productImage", {
            required: {
              value: true,
              message: "Please select an image for the product",
            },
          })}
          className="my-4 border-2 border-blue-300 rounded p-2"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <img className="w-[300px] rounded mb-6" src={imagePreview} />
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
      <Toaster />
    </div>
  );
};

export default AddProductPage;
