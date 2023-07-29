import React from "react";
import Link from "next/link";
import Footer from "./Footer";
import Info from "./Info";
const WelcomePage = () => {
  return (
    <>
      <h1 className="text-8xl text-center p-4 mt-40">
        <span className="text-purple-600">we</span>
        <span className="font-bold text-fuchsia-400">Buy</span>
      </h1>
      <button className="mx-auto block bg-orange-200 text-orange-800 font-extrabold my-28 shadow-xl text-xl shadow-orange-400 rounded-xl hover:text-white hover:font-bold hover:shadow-2xl hover:shadow-orange-400">
        <Link href={"/products"} className="inline-block p-5">
          Shop here &#8594;
        </Link>
      </button>
      <Info />
      <Footer />
    </>
  );
};

export default WelcomePage;
