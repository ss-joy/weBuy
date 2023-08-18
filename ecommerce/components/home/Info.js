import React from "react";

const Info = () => {
  return (
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
        Your ultimate destination for hassle-free shopping! At weBuy, we believe
        that finding and purchasing your desired items should be an enjoyable
        experience from start to finish. Whether you're searching for the latest
        fashion trends, cutting-edge gadgets, home essentials, or unique
        collectibles, we've got you covered. Our user-friendly platform offers a
        vast selection of high-quality products, handpicked for their
        exceptional value and unbeatable prices. With secure payment options,
        fast shipping, and a dedicated customer support team, we strive to make
        every step of your shopping journey seamless and delightful. Join the
        weBuy community today and discover a world of endless possibilities,
        where convenience meets satisfaction. Shop smarter, shop with
        confidence, shop at weBuy!
      </p>
    </section>
  );
};

export default Info;
