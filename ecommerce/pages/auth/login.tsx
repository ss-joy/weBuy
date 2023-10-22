import { useRef } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (result.error) {
      return alert("Log In failed.Please try again carefully...");
    }
    router.replace("/");
  }
  return (
    <>
      <h1 className="mt-8 text-slate-500 text-center font-bold text-5xl">
        Log In here
      </h1>
      <form className="flex flex-col mt-8 mx-auto p-8 w-1/3 h-2/3 justify-between border-2 border-red-50 rounded">
        <input
          ref={emailRef}
          className="form-input"
          type="email"
          placeholder="Your email"
        />
        <input
          ref={passwordRef}
          className="form-input"
          type="password"
          placeholder="choose a password"
        />
        <button onClick={handleSubmit} className="btn2">
          Sign Up
        </button>
      </form>
    </>
  );
}
