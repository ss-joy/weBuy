import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { UserSignUpSchemaType } from "@/schemas/user-signup-schema";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

export default function LoginPage(): JSX.Element {
  const router = useRouter();

  const { toast } = useToast();
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
      toast({
        variant: "destructive",
        title: "Sign Up failed!",
        description: ans.error || "Login failed. Try again..",
      });
    } else if (!ans?.error && ans?.ok) {
      toast({
        title: "Login Successful!",
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
        // className="flex flex-col mt-8 mx-auto p-2 sm:p-8 md:w-1/3 h-2/3 justify-between border-2 border-red-50 rounded">
        className="flex flex-col mt-8 mx-auto p-2 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-2/5 sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form-label" htmlFor="userEmail">
          Enter email
        </label>
        <p className="text-red-700">{errors.userEmail?.message}</p>
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
        <p className="text-red-700">{errors.userPwd?.message}</p>
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
          className="form-input"
          type="password"
        />
        <button type="submit" disabled={isSubmitting} className="btn2">
          Log In
        </button>
      </form>
      <Toaster />
    </>
  );
}
