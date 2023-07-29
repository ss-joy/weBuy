import React from "react";

const Footer = () => {
  return (
    <section className="flex justify-around items-center px-20 bg-[#E6E5F4] flex-wrap">
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
  );
};

export default Footer;
