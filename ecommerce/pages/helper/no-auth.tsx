import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const NotAuthenticated = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 3000);
  return (
    <div className="mt-12 ">
      <h1 className="text-2xl text-center font-bold mb-12">
        Woooo friend! You are not logged in. So we cant let you see this page
      </h1>
      <Image
        className="block mx-auto"
        alt="image!!"
        src={"/ui-images/no-auth.webp"}
        height={400}
        width={400}
      />
    </div>
  );
};

export default NotAuthenticated;
