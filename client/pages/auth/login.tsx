import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { UserSignUpSchemaType } from "@/schemas/user-signup-schema";
import Head from "next/head";
import Loading from "@/components/ui/Loading";
import { cn } from "@/lib";
import FormErrorMsg from "@/components/form/FormErrorMsg";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [hidePwd, setHidePwd] = useState<boolean>(true);

  const {
    handleSubmit,
    register,

    formState: { errors, isSubmitting },
  } = useForm<UserSignUpSchemaType>();

  async function onSubmit(data: UserSignUpSchemaType) {
    const ans = await signIn("credentials", {
      callbackUrl: "/",
      redirect: false,
      userEmail: data.userEmail,
      userPwd: data.userPwd,
    });

    if (ans?.error && !ans.ok) {
      console.log(ans);
      toast.warning("Sign Up failed!", {
        description: "Login failed. Try again..",
      });
    } else if (!ans?.error && ans?.ok) {
      toast.success("Login Successful!", {
        description: "You will be shortly redirected...",
      });

      setTimeout(() => {
        router.push("/products");
      }, 1000);
    }
  }
  return (
    <>
      <Head>
        <title>we Buy | Login page</title>
      </Head>
      <h1 className="mt-8 text-slate-500 text-center font-bold text-5xl">
        Log In here
      </h1>
      <form
        noValidate
        className="flex flex-col mt-8 mx-auto p-2 w-11/12 md:w-10/12 md:px-4 lg:w-4/6 xl:w-3/6 2xl:w-2/5 sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded-md shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form-label" htmlFor="userEmail">
          Enter email
        </label>
        <FormErrorMsg erMsg={errors.userEmail?.message} />
        <input
          {...register(
            "userEmail",

            {
              required: { value: true, message: "Your name is required" },
              minLength: {
                value: 5,
                message: "Your name cant must be at least 5 characters",
              },
            }
          )}
          id="userEmail"
          className="form-input"
          type="email"
        />
        <label className="form-label" htmlFor="userPwd">
          Enter password
        </label>
        <FormErrorMsg erMsg={errors.userPwd?.message} />
        <div className="relative flex items-center">
          <input
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
            className="form-input m-0 w-full"
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
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn("btn2 mt-4", {
            "py-0": isSubmitting,
          })}
        >
          {isSubmitting ? (
            <Loading className="bg-white" />
          ) : (
            <span>Log In</span>
          )}
        </button>
      </form>
      <Toaster richColors closeButton theme="light" />
    </>
  );
}
