import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib";
import { DevTool } from "@hookform/devtools";
import { Pen, PlusCircleIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../shared/ErrorMessage";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ecomBackendUrl } from "@/config";
import Loading from "../ui/Loading";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmissionData, UpdateProfileFormData } from "@/types";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 } from "uuid";

type EditProfileModalProps = {
  name: string;
  email: string;
  profileImage: string;
  userId: string;
};
export default function EditProfileModal({
  name,
  email,
  profileImage,
  userId,
}: EditProfileModalProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      userEmail: email,
      userImage: profileImage,
      userName: name,
    },
  });

  const queryClient = new QueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: SubmissionData) => {
      return axios.patch(`${ecomBackendUrl}/user/${userId}`, data);
    },
    onSuccess(data) {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  const { mutate: mutateImage, isLoading: deletingImage } = useMutation({
    mutationFn: () => {
      return axios.delete(`${ecomBackendUrl}/user/image/${userId}`);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  const { mutate: addImage, isLoading: addingImage } = useMutation({
    mutationFn: async () => {
      const imageRef = ref(
        storage,
        `user-profile-images/${File.name + v4() + Date.now()}`
      );
      await uploadBytes(imageRef, image!);
      const url = await getDownloadURL(imageRef);
      await axios.post(`${ecomBackendUrl}/user/image/${userId}`, {
        imageLink: url,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  async function onSubmit(formData: UpdateProfileFormData) {
    if (!profileImage) {
      return;
    }
    const data = {
      name: formData.userName,
      email: formData.userEmail,
      password: formData.userPwd,
      profilePicture: profileImage,
    };
    mutate(data);
  }

  async function addUserImage() {
    if (!image) return;
    addImage();
  }

  function handleImageInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Pen className="bg-orange-400 p-2 text-white size-[50px] rounded-full absolute bottom-2 right-2 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-12 h-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl text-slate-700 py-2">
            Edit profile
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative size-[100px] rounded-full">
            <Image
              className="rounded-full my-2 object-cover w-full h-full"
              src={
                profileImage
                  ? profileImage
                  : imagePreview
                    ? imagePreview
                    : "/ui-images/dummy-user.jpg"
              }
              width={100}
              height={100}
              alt="current profile picture"
            />

            <input
              type="file"
              name=""
              id=""
              className="hidden"
              onChange={handleImageInputChange}
              ref={inputRef}
            />
            {profileImage ? (
              <Trash2Icon
                className="absolute right-0 bottom-0 fill-red-400 size-8 hover:cursor-pointer"
                onClick={() => mutateImage()}
              />
            ) : null}
            {!profileImage ? (
              <PlusCircleIcon
                className="absolute right-0 bottom-0 fill-green-400 size-8 hover:cursor-pointer"
                onClick={() => inputRef.current?.click()}
              />
            ) : null}
            {imagePreview ? (
              <SaveIcon
                className="absolute right-0 bottom-0 fill-green-400 size-8 hover:cursor-pointer"
                onClick={() => addUserImage()}
              />
            ) : null}
          </div>
          <hr className="my-4" />
          <label
            className={cn("form-label", "text-xl w-full")}
            htmlFor="userName"
          >
            New Name
          </label>
          <ErrorMessage errorMessage={errors.userName?.message} />
          <input
            placeholder="Enter your new name"
            className={cn("form-input", "rounded-xl w-full")}
            {...register("userName", {
              minLength: {
                value: 3,
                message: "Your name cant must be at least 3 characters",
              },
            })}
            id="userName"
            type="text"
          />
          <label className="form-label w-full" htmlFor="userPwd">
            Choose new password
          </label>
          <ErrorMessage errorMessage={errors.userPwd?.message} />
          <input
            placeholder="Enter your new password"
            className={cn("form-input", "rounded-xl w-full")}
            {...register("userPwd", {
              minLength: {
                value: 5,
                message: "Password must be greater than 5 characters",
              },
            })}
            id="userPwd"
            type="text"
          />
          <label className="form-label w-full" htmlFor="userPwd">
            Choose new email
          </label>
          <ErrorMessage errorMessage={errors?.userEmail?.message} />
          <input
            placeholder="Enter your new password"
            className={cn("form-input", "rounded-xl w-full")}
            {...register("userEmail", {
              minLength: {
                value: 5,
                message: "Password must be greater than 5 characters",
              },
            })}
            id="userEmail"
            type="text"
          />
          <Button
            disabled={isLoading}
            className={`bg-orange-400 font-bold text-xl p-4 ${isLoading ? "disabled:" : ""}`}
          >
            {isLoading || deletingImage || addingImage ? <Loading /> : "save"}
          </Button>
        </form>
        {/* <DevTool control={control} /> */}
      </DialogContent>
    </Dialog>
  );
}
