import React, { useCallback, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { categories } from "../../../products/ProductsCategory";
import { cn } from "@/lib";
import { Button } from "../../../ui/button";
import { toast, Toaster } from "sonner";
import { useDropzone } from "react-dropzone";
import UplaodImage from "@/assets/logos/Group 138.png";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { CreateProductFromData } from "@/types";
import { useAddNewProductMutation } from "@/store/features/products/productsApi";

type AddProductProps = {
  userId: string;
};
const AddProduct = ({ userId }: AddProductProps) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<CreateProductFromData>();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length === 1) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file as File);
    setPreviewUrl(url);
  }, [file]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  function removeImage() {
    setFile(null);
    setPreviewUrl(null);
  }

  const [addNewProduct, { isLoading: creatingProduct }] =
    useAddNewProductMutation();

  async function onSubmit(formData: CreateProductFromData) {
    if (!file) return;
    await addNewProduct({
      userId,
      imageFile: file as File,
      data: {
        description: formData.description,
        name: formData.name,
        price: +formData.price,
        productCategory: formData.productCategory,
        availableCount: +formData.availableCount,
      },
    });

    toast.success("Product added Successfully!", {
      description:
        "You have successfully added the product. Visit shop here page to view it...",
    });
    reset();
    setFile(null);
  }
  return (
    <section>
      <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <section className="flex-grow flex flex-col shadow-md p-8 rounded-md">
          <p className="mt-4 text-start font-sans font-semibold text-slate-500 text-3xl mb-4">
            Add Products here
          </p>
          <label className="form-label" htmlFor="productName">
            Product name
          </label>
          <p className="text-red-700">{errors.name?.message}</p>

          <input
            {...register("name", {
              required: { value: true, message: "Product name is required" },
            })}
            className={cn("form-input", "rounded-xl w-full")}
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
                message: "Product price must be at least 1.",
              },
            })}
            className={cn("form-input", "rounded-xl w-full")}
            type="number"
            id="productPrice"
          />
          <label className="form-label" htmlFor="productPrice">
            Product Available count
          </label>
          <p className="text-red-700">{errors.availableCount?.message}</p>

          <input
            {...register("availableCount", {
              required: { value: true, message: "Product count is required" },
              min: {
                value: 0,
                message: "Product price must be at least 1.",
              },
            })}
            className={cn("form-input", "rounded-xl w-full")}
            type="number"
            id="productPrice"
          />

          <p className="text-red-700">{errors.productCategory?.message}</p>
          <Controller
            control={control}
            rules={{
              validate: {
                hasProductCategory: () => {
                  if (
                    !categories.some(
                      (cat) => cat.categoryId === getValues("productCategory")
                    )
                  ) {
                    return "Please select a product category";
                  }
                },
              },
            }}
            name="productCategory"
            render={({ field }) => (
              <Select onValueChange={field.onChange} {...field}>
                <SelectTrigger className={cn("form-input", "p-4  h-16")}>
                  <SelectValue
                    className={cn("form-label", "p-4 min-h-8 rounded")}
                    placeholder="Select a category"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a category</SelectLabel>
                    {categories.map((category) => {
                      return (
                        <SelectItem
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.categoryId}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
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
            className={cn("form-input", "rounded-xl w-full")}
            id="productDescription"
          />

          <Button
            className=" bg-green-400 font-extrabold text-xl"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </section>
        <section className="flex-grow flex-wrap shadow-md p-4 rounded-md max-h-[400px] max-w-[50%]">
          {previewUrl ? (
            <div className="rounded-md relative w-full h-full">
              <Image
                src={previewUrl}
                width={300}
                height={300}
                className="object-cover w-full h-full rounded-md"
                alt="image"
              />
              <Trash2Icon
                className="absolute top-[-12px] right-[-12px] stroke-red-500 hover:cursor-pointer size-[30px]"
                onClick={removeImage}
              />
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="flex items-center flex-col w-full h-full gap-4 justify-center hover:cursor-pointer p-4 border-2 border-dotted border-cyan-500 rounded-md"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Image
                  src={UplaodImage}
                  width={150}
                  height={150}
                  alt="image"
                  className="animate-bounce"
                />
              ) : (
                <>
                  <Image
                    src={UplaodImage}
                    width={150}
                    height={150}
                    alt="image"
                  />
                  <p className="font-bold text-slate-500">
                    Drang Drop Image here to upload
                  </p>
                </>
              )}
            </div>
          )}
        </section>
      </form>
      <Toaster richColors theme="light" closeButton />
    </section>
  );
};

export default AddProduct;
