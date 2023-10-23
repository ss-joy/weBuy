import React from "react";
import Link from "next/link";
import Info from "./HomePageImages";
import QandA from "./QandA";
import HomePageImages from "./HomePageImages";
const WelcomePage = (): JSX.Element => {
  return (
    <>
      <h1 className="text-7xl mx-auto mt-20 text-center sm:mt-16 sm:text-9xl 2xl:mt-">
        <span className="text-purple-600">we</span>
        <span className="font-bold text-fuchsia-400">Buy</span>
      </h1>
      <button className="mx-auto block p-4 bg-orange-200 text-orange-800 font-extrabold my-28 mb-10 shadow-xl text-lg shadow-orange-400 rounded-xl transition-all hover:font-bold hover:shadow-2xl hover:shadow-orange-400 sm:text-3xl 2xl:mt-30 md:mb-36">
        <Link href={"/products"}>Shop here &#8594;</Link>
      </button>
      <HomePageImages />
      <QandA />
    </>
  );
};

export default WelcomePage;
