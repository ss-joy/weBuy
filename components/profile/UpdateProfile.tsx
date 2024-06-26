import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../ui/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 } from "uuid";
import { cn } from "@/lib";
import Image from "next/image";
import { Input } from "../ui/input";
import { makeGetRequest } from "@/queries";
import NoItemSelectedWarning from "./NoItemSelectedWarning";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Toaster, toast } from "sonner";

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
  const [noItemSelected, setNoItemSelected] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    register,
    reset,
    resetField,
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
            toast.success("Information Updated Successful!", {
              description: "You have been successfully updated your info....",
            });

            return;
          } else if (response.data.status === "error") {
            toast.warning("Something went wrong", {
              description: "please try again later",
            });

            return;
          }
        } catch (error) {
          console.log(error);
          alert("error");
          return;
        }
      } else {
        const response = await axios.post(`/api/user/profile/${userId}`, {
          userName: formData.userName,
          userPwd: formData.userPwd,
        });
        console.log(response.data.status);
        if (response.data.status === "success") {
          toast.success("Information Updated Successful!", {
            description: "You have been successfully updated your info....",
          });

          return;
        } else if (response.data.status === "error") {
          toast.warning("Something went wrong", {
            description: "please try again later",
          });
          return;
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
    console.log(formData);
    if (!formData.userImage && !formData.userName && !formData.userPwd) {
      setNoItemSelected(true);
      setTimeout(() => {
        setNoItemSelected(false);
      }, 3000);
      reset();
      return;
    }
    mutate(formData);
  }
  return (
    <>
      <div
        id="user-current-profile-info"
        className="flex items-center mt-8 mx-auto shadow-md shadow-black-200 p-6 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-[500px] sm:p-8 h-2/3 justify-start border-2 border-red-50 rounded-md"
      >
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
      {noItemSelected ? <NoItemSelectedWarning /> : null}

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
            minLength: {
              value: 5,
              message: "Your name cant must be at least 5 characters",
            },
          })}
          id="userName"
          type="text"
        />

        <label className="form-label" htmlFor="userPwd">
          Choose new password
        </label>
        <p className="text-red-700">{errors.userPwd?.message}</p>
        <input
          placeholder="Enter your new password"
          className={cn("form-input", "rounded-xl")}
          {...register("userPwd", {
            minLength: {
              value: 5,
              message: "Password must be greater than 5 characters",
            },
          })}
          id="userPwd"
          type="text"
        />
        <p className="text-red-700">{errors.userImage?.message}</p>
        <label className="form-label" htmlFor="userPwd">
          Choose a profile image
        </label>
        <Input
          {...register("userImage")}
          className="my-4 border-2 border-blue-300 rounded p-2"
          onChange={handleFileChange}
          type="file"
        />

        {imagePreview && (
          <div className="relative border-2">
            <img className="w-[300px] rounded mb-6" src={imagePreview} />
            <Cross1Icon
              onClick={() => {
                resetField("userImage");
                setImagePreview("");
              }}
              className="rounded-full bg-white absolute top-0 right-0 border-red-600 border-2 w-[30px] h-[30px]"
            />
          </div>
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
      <Toaster richColors theme="light" closeButton />
    </>
  );
}

export default UpdateProfile;
