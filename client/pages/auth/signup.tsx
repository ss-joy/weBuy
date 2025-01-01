import { useForm } from "react-hook-form";
import { UserSignUpSchemaType } from "@/schemas/user-signup-schema";
import { useRouter } from "next/router";
import { ApiResponse } from "@/types/apiResponse";
import Head from "next/head";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import FormErrorMsg from "@/components/form/FormErrorMsg";
import { Toaster, toast } from "sonner";
import { ecomBackendUrl } from "@/config";
import { Button } from "@/components/ui/button";
import axios from "axios";
export default function SignUpPage(): JSX.Element {
  const [hidePwd, setHidePwd] = useState<boolean>(true);
  const [hideConfirmPwd, setHideConfirmPwd] = useState<boolean>(true);
  const router = useRouter();
  type FormData = {
    userName: string;
    userPwd: string;
    userConfirmPwd: string;
    userEmail: string;
  };

  const {
    formState: { isSubmitting, errors },
    register,
    reset,
    getValues,
    handleSubmit,
  } = useForm<FormData>();

  function onSubmit(data: UserSignUpSchemaType) {
    axios
      .post(`${ecomBackendUrl}/auth/signup`, {
        name: data.userName,
        email: data.userEmail,
        password: data.userPwd,
      })
      .then(() => {
        reset();
        toast.success("Sign Up Successful!", {
          description:
            "You have been successfully signed up. You will be shortly taken to the login page...",
        });
        router.push("/auth/login");
      })
      .catch((err) => {
        toast.warning("Sign Up failed!", {
          description:
            "Something went wrong. Please check everything carefully and try again",
        });
        console.log(err);
      });
  }

  return (
    <>
      <Head>
        <title>we Buy | Signup page</title>
      </Head>
      <h1 className="mt-8 text-slate-500 text-center font-bold text-5xl">
        Sign up here
      </h1>
      <form
        className="flex flex-col mt-8 mx-auto p-2 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-2/5 sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label className="form-label" htmlFor="userName">
          Your name*
        </label>
        <FormErrorMsg erMsg={errors.userName?.message} />

        <input
          className="form-input"
          {...register("userName", {
            required: { value: true, message: "Your name is required" },
          })}
          id="userName"
          type="text"
        />
        <label className="form-label" htmlFor="userEmail">
          Your email*
        </label>
        <FormErrorMsg erMsg={errors.userEmail?.message} />

        <input
          className="form-input"
          {...register("userEmail", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email",
            },
          })}
          type="email"
          id="userEmail"
        />
        <label className="form-label" htmlFor="userPwd">
          Choose a password*
        </label>
        <FormErrorMsg erMsg={errors.userPwd?.message} />

        <div className="relative flex items-center mb-3">
          <input
            className="form-input m-0 w-full"
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
            type={hidePwd ? "password" : "text"}
          />
          <button
            className="m-0 p-0 absolute right-4"
            type="button"
            onClick={() => {
              setHidePwd((prev) => {
                return !prev;
              });
            }}
          >
            {hidePwd ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <label className="form-label" htmlFor="userConfirmPwd">
          Confirm your password*
        </label>
        <FormErrorMsg erMsg={errors.userConfirmPwd?.message} />
        <div className="relative flex items-center">
          <input
            className="form-input m-0 w-full"
            {...register("userConfirmPwd", {
              required: {
                value: true,
                message: "Please match your passwords",
              },
              validate: (fieldValue) => {
                if (getValues("userPwd") === fieldValue) {
                  return true;
                }
                return "Passwords must match";
              },
            })}
            id="userConfirmPwd"
            type={hideConfirmPwd ? "password" : "text"}
          />
          <button
            className="m-0 p-0 absolute right-4"
            type="button"
            onClick={() => {
              setHideConfirmPwd((prev) => {
                return !prev;
              });
            }}
          >
            {hideConfirmPwd ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <Button
          className="btn2 disabled:bg-gray-500 mt-4"
          disabled={isSubmitting}
        >
          Sign up
        </Button>
      </form>
      <Toaster richColors closeButton theme="light" />
    </>
  );
}
