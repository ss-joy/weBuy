import React from "react";
import Link from "next/link";
const WelcomePage = () => {
  return (
    <>
      <h1 className="text-8xl text-center p-4 mt-40">
        <span className="text-purple-600">we</span>
        <span className="font-bold text-fuchsia-400">Buy</span>
      </h1>
      <button className="mx-auto block bg-orange-200 text-orange-800 p-5 my-28 shadow-xl text-xl shadow-orange-400 rounded-xl hover:text-white hover:font-bold hover:shadow-2xl hover:shadow-orange-400">
        <Link href={"/products"}>Shop here &#8594;</Link>
      </button>
      <section className="flex justify-around items-center px-20">
        <img
          src={"/ui-images/walking.gif"}
          className="block px-12"
          alt="walking gif"
        />
        <p className="px-12">
          <span className="bg-purple-400 font-bold text-white rounded p-4 inline-block">
            Welcome to weBuy
          </span>
          <br />
          Your ultimate destination for hassle-free shopping! At weBuy, we
          believe that finding and purchasing your desired items should be an
          enjoyable experience from start to finish. Whether you're searching
          for the latest fashion trends, cutting-edge gadgets, home essentials,
          or unique collectibles, we've got you covered. Our user-friendly
          platform offers a vast selection of high-quality products, handpicked
          for their exceptional value and unbeatable prices. With secure payment
          options, fast shipping, and a dedicated customer support team, we
          strive to make every step of your shopping journey seamless and
          delightful. Join the weBuy community today and discover a world of
          endless possibilities, where convenience meets satisfaction. Shop
          smarter, shop with confidence, shop at weBuy!
        </p>
      </section>
      <section className="flex justify-around items-center px-20 bg-[#E9E8F5] flex-wrap">
        <section className="flex-wrap">
          <p className="p-4 m-4 rounded-lg text-white text-lg font-bold bg-fuchsia-400 w-96">
            Quality Assurance
          </p>
          <p className="p-4 m-4 rounded-lg text-white text-lg font-bold bg-yellow-600 w-80">
            Wide Selection
          </p>
          <p className="p-4 m-4 rounded-lg text-white text-lg font-bold bg-orange-400 w-80">
            Unbeatable Prices
          </p>
          <p className="p-4 m-4 rounded-lg text-white text-lg font-bold bg-amber-300">
            Convenient Shopping
          </p>
        </section>
        <img
          src={"/ui-images/walking-girl.gif"}
          className="block px-12"
          alt="walking gif"
          width={700}
        />
      </section>
    </>
  );
};

export default WelcomePage;
