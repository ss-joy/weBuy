import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../ui/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 } from "uuid";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import { makeGetRequest } from "@/lib/queryFunctions";

type UpdateProfileProps = {
  userId: string | null;
};
function UpdateProfile({ userId }: UpdateProfileProps): JSX.Element {
  type FormData = {
    userName: string;
    userPwd: string;
    userImage: FileList;
  };
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    formState: { isSubmitting, errors },
    register,
    reset,
    getValues,
    handleSubmit,
  } = useForm<FormData>();
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

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
  const { error, isLoading, data } = useQuery({
    queryKey: ["get-single-user-profile", userId],
    queryFn: () => makeGetRequest(`/api/user/profile/${userId}`),
  });
  const { mutate, isLoading: isMutaionLoading } = useMutation({
    mutationFn: async (formData: FormData) => {
      if (formData.userImage[0]) {
        try {
          const imageRef = ref(
            storage,
            `user-profile-images/${File.name + v4() + Date.now()}`
          );
          await uploadBytes(imageRef, formData.userImage[0]);
          const url = await getDownloadURL(imageRef);
          const response = await axios.post(`/api/user/profile/${userId}`, {
            userName: formData.userName,
            userPwd: formData.userPwd,
            userImage: url,
          });
          console.log(response.data.status);
          if (response.data.status === "success") {
            toast({
              title: "Information Updated Successful!",
              description:
                "You have been successfully changed your name and password....",
            });
          } else if (response.data.status === "error") {
            toast({
              title: "Something went wrong",
              description: "please try again later",
            });
          }
        } catch (error) {
          console.log(error);
          alert("error");
        }
      }
    },
    onSuccess: () => {
      reset();
      setImagePreview("");
      queryClient.invalidateQueries({
        queryKey: ["get-single-user-profile", userId],
      });
    },
  });
  async function onSubmit(formData: FormData) {
    mutate(formData);
  }
  return (
    <>
      <div className="flex items-center mt-8 mx-auto shadow-md shadow-black-200 p-6 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-[500px] sm:p-8 h-2/3 justify-start border-2 border-red-50 rounded-md">
        <div>
          <Image
            className="rounded-full transition-all hover:shadow-md hover:shadow-slate-500"
            src={
              data?.data.user.profilePicture
                ? data?.data.user.profilePicture
                : "/ui-images/dummy-user.jpg"
            }
            width={70}
            height={70}
            alt="current profile picture"
          />
        </div>
        <div className="ml-6">
          <p className="text-2xl ">
            {isLoading ? "Loading...." : data?.data.user.name}
          </p>
          <p className="text-slate-600">
            {isLoading ? "Loading...." : data?.data.user.email}
          </p>
        </div>
      </div>
      <form
        className="flex flex-col mt-8 mx-auto shadow-md shadow-black-200 p-6 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-[500px] sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="text-2xl text-slate-600 font-semibold">
          Update information
        </h1>
        <p className="text-slate-500 my-1 mb-7">
          Update your profile information.
        </p>
        <label className={cn("form-label", "text-xl")} htmlFor="userName">
          New Name
        </label>
        <p className="text-red-700">{errors.userName?.message}</p>
        <input
          placeholder="Enter your new name"
          className={cn("form-input", "rounded-xl")}
          {...register("userName", {
            required: { value: true, message: "Your name is required" },
            minLength: {
              value: 5,
              message: "Your name cant must be at least 5 characters",
            },
          })}
          id="userName"
          type="text"
        />

        <label className="form-label" htmlFor="userPwd">
          Choose new password*
        </label>
        <p className="text-red-700">{errors.userPwd?.message}</p>
        <input
          placeholder="Enter your new password"
          className={cn("form-input", "rounded-xl")}
          {...register("userPwd", {
            required: {
              value: true,
              message: "Please enter your password",
            },
            minLength: {
              value: 5,
              message: "Password must be greater than 5 characters",
            },
          })}
          id="userPwd"
          type="text"
        />
        <p className="text-red-700">{errors.userImage?.message}</p>
        <Input
          {...register("userImage", {
            required: {
              value: true,
              message: "Please select an image for yourself",
            },
          })}
          className="my-4 border-2 border-blue-300 rounded p-2"
          onChange={handleFileChange}
          type="file"
        />
        {/* <input
          type="file"
          {...register("userImage", {
            required: {
              value: true,
              message: "Please select an image for yourself",
            },
          })}
          className="my-4 border-2 border-blue-300 rounded p-2"
          onChange={handleFileChange}
        /> */}
        {imagePreview && (
          <img className="w-[300px] rounded mb-6" src={imagePreview} />
        )}
        <button
          type="submit"
          className="btn2 disabled:bg-gray-500"
          disabled={isMutaionLoading}
        >
          {isMutaionLoading ? (
            <Loading className="bg-white" />
          ) : (
            <span>Update</span>
          )}
        </button>
      </form>
      <Toaster />
    </>
  );
}

export default UpdateProfile;
