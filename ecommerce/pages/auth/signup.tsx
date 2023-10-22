import { useRef } from "react";
import { useRouter } from "next/router";
export default function SignUpPage(): JSX.Element {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    const ans = await response.json();
    console.log(ans);
    if (ans.user) {
      router.replace("/auth/login");
    }
  }

  return (
    <>
      <h1 className="mt-8 text-slate-500 text-center font-bold text-5xl">
        Sign Up here
      </h1>
      <form className="flex flex-col mt-8 mx-auto p-8 w-1/3 h-2/3 justify-between border-2 border-red-50 rounded">
        <input
          className="form-input"
          type="text"
          placeholder="Your name"
          ref={nameRef}
        />
        <input
          className="form-input"
          type="email"
          placeholder="Your email"
          ref={emailRef}
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
