import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/types/products-type";
import { PenIcon, ShoppingBag, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { CreateProductFromData, CreateProductSubmissionData } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib";
import { categories } from "@/components/products/ProductsCategory";
import { useDropzone } from "react-dropzone";
import UplaodImage from "@/assets/logos/Group 138.png";
import { toast } from "sonner";
import { useEditProductMutation } from "@/store/features/products/productsApi";

type EditProductModalProps = {
  product: Product;
};

const EditProductModal = ({
  product: {
    _id: productId,
    availableCount,
    imagePath,
    description,
    name,
    price,
    productCategory,
    sellerId,
  },
}: EditProductModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<CreateProductFromData>({
    defaultValues: {
      price: price,
      name: name,
      description: description,
      availableCount: availableCount,
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(imagePath);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length === 1) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  useEffect(() => {
    setPreviewUrl(imagePath);
  }, [imagePath]);

  useEffect(() => {
    if (!file && !previewUrl) {
      setPreviewUrl(null);
      return;
    }
    if (file) {
      const url = URL.createObjectURL(file as File);
      setPreviewUrl(url);
    }
  }, [file]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  function removeImage() {
    setFile(null);
    setPreviewUrl("");
  }

  const [editProduct, { isLoading: editingProduct }] = useEditProductMutation();

  async function onsubmit(formData: CreateProductFromData) {
    try {
      if (!file && !imagePath) {
        return;
      }
      const data: CreateProductSubmissionData = {
        description: formData.description,
        name: formData.name,
        price: +formData.price,
        productCategory: formData.productCategory,
        availableCount: +formData.availableCount,
      };
      await editProduct({
        productId,
        file: file as File,
        data,
        imagePath,
        userId: sellerId._id,
      });
      toast.success("Product added Successfully!", {
        description: "Edit Successful!!",
      });
      setIsModalOpen(false);
      reset();
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <PenIcon className="hover:cursor-pointer hover:stroke-white hover:fill-slate-500 rounded-sm" />
      </DialogTrigger>
      <DialogContent className="w-[80%] max-w-[1080px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 px-2 xl:flex-row xl:justify-center xl:items-start xl:mt-12 w-full 2xl:mx-auto 2xl:mt-16">
          <section
            id="image"
            className="w-full mb-4 sm:w-5/6 lg:w-4/5 lg:m-0 lg:mb-6"
          >
            {previewUrl ? (
              <div className="rounded-md relative w-full h-full">
                <Image
                  src={previewUrl}
                  width={300}
                  height={300}
                  className="rounded mx-auto w-full max-w-2xl shadow shadow-slate-500 transition-all"
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
          <form
            onSubmit={handleSubmit(onsubmit)}
            id="product-details"
            className="px-2 pt-0 mt-0 lg:p-4 lg:pt-0 rounded-md max-w-2xl"
          >
            <div>
              <div>
                <label
                  htmlFor=""
                  className="text-orange-500 text-lg font-bold block"
                >
                  Product Name
                </label>
                <input
                  className="text-3xl  w-full border-2 border-slate-300 p-2 block rounded-lg"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Product name is required",
                    },
                  })}
                />
              </div>
              <div className="font-bold text-lg lg:text-3xl text-orange-400">
                <label
                  htmlFor=""
                  className="text-orange-500 text-lg font-bold block"
                >
                  Product Price
                </label>
                <input
                  className="text-3xl  w-full border-2 border-slate-300 p-2 block rounded-lg"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Product price is required",
                    },

                    min: {
                      value: 0,
                      message: "Product price must be at least 1.",
                    },
                  })}
                />
              </div>
              <div className="font-bold text-lg lg:text-3xl text-orange-400">
                <label
                  htmlFor=""
                  className="text-orange-500 text-lg font-bold block"
                >
                  Product count
                </label>
                <input
                  className="text-3xl  w-full border-2 border-slate-300 p-2 block rounded-lg"
                  {...register("availableCount", {
                    required: {
                      value: true,
                      message: "Product price is required",
                    },

                    min: {
                      value: 0,
                      message: "Product price must be at least 1.",
                    },
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-orange-500 text-lg font-bold block"
                >
                  Product Description
                </label>
                <textarea
                  className="text-xl w-full border-2 border-slate-300 px-2 block rounded-lg min-h-[200px]"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Product description is required",
                    },
                  })}
                />
              </div>
              <Controller
                control={control}
                defaultValue={productCategory}
                rules={{
                  validate: {
                    hasProductCategory: () => {
                      if (
                        !categories.some(
                          (cat) =>
                            cat.categoryId === getValues("productCategory")
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
                    <SelectTrigger
                      className={cn("form-input", "p-4 my-2 h-16")}
                    >
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
            </div>
            <Button
              className="my-4 bg-orange-400 mx-auto block"
              isLoading={isSubmitting || editingProduct}
              disabled={isSubmitting || editingProduct}
            >
              Save
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
