import React from "react";
import Link from "next/link";

import { Rubik } from "next/font/google";
import { SiteFeature } from "./SiteFeature";

const rubikFont = Rubik({
  weight: "400",
  style: "normal",
  subsets: ["latin", "cyrillic"],
});
type SiteFeatures = {
  h2: string;
  description: string;
  src: string;
  alt: string;
}[];
const siteFeatures: SiteFeatures = [
  {
    h2: "Reliable delivery",
    description: `  Welcome to the Reliable Delivery Zone at Webuy! We take pride in
  ensuring a seamless and dependable delivery experience for our
  valued customers. With our commitment to prompt shipping and secure
  packaging, you can trust that your purchases will reach your
  doorstep safely and on time. Explore our range of shipping options,
  including express delivery for those eager to receive their orders
  promptly. We prioritize transparency, providing real-time tracking
  information so you can follow your package's journey from our
  warehouse to your location. At Webuy, we understand the importance
  of reliable delivery in enhancing your overall shopping
  satisfaction, and we're dedicated to exceeding your expectations
  every time you choose us for your online shopping needs.`,
    src: "/ui-images/walking-girl.gif",
    alt: "walking girl image",
  },

  {
    h2: " Products at affordable price.",
    description: `Discover Affordable Prices at Webuy! We believe that everyone
    deserves access to quality products without breaking the bank, and
    that's why we're committed to offering an extensive range of items
    at budget-friendly prices. At Webuy, affordability doesn't mean
    compromising on quality. Explore our diverse selection of products,
    from everyday essentials to trendy finds, all competitively priced
    to fit your budget. Our commitment to transparency means no hidden
    fees or unexpected costs; what you see is what you get. We regularly
    update our promotions and discounts, ensuring you get the best deals
    on the market. Shop with confidence, knowing that at Webuy,
    affordability meets excellence, making it easy for you to enjoy a
    satisfying and cost-effective shopping experience.`,
    src: "/ui-images/walking.gif",
    alt: "walking girl image",
  },
  {
    h2: " Many products from trusted brands",
    description: ` Discover Trusted Brands at Webuy! We understand the importance of
    quality and reliability when it comes to your purchases. That's why
    we've curated a selection of products from trusted brands that have
    earned a reputation for excellence. Whether you're looking for the
    latest tech gadgets, fashion essentials, or home goods, our platform
    showcases products from brands known for their commitment to
    innovation, durability, and customer satisfaction. Explore a wide
    array of options from household names you know and trust. We
    prioritize partnering with brands that share our dedication to
    delivering value to customers. At Webuy, you can shop with
    confidence, knowing that the products you choose are backed by the
    reliability and reputation of esteemed brands. Elevate your shopping
    experience and explore a world of quality with our curated
    collection of trusted brands.`,
    src: "/ui-images/trust.jpg",
    alt: "walking girl image",
  },
];
const WelcomePage = (): JSX.Element => {
  return (
    <>
      <h1 className="text-7xl lg:text-8xl mx-auto mt-20 text-center sm:mt-16 sm:text-9xl 2xl:mt-">
        <span className="text-purple-600">we</span>
        <span className="font-bold text-fuchsia-400">Buy</span>
      </h1>
      <button className="mx-auto block p-4 bg-orange-200 text-orange-800 font-extrabold my-28 mb-10 shadow-xl text-lg shadow-orange-400 rounded-xl transition-all hover:font-bold hover:shadow-2xl hover:shadow-orange-400 sm:text-3xl 2xl:mt-30 md:mb-36">
        <Link href={"/products"}>Shop here &#8594;</Link>
      </button>
      {siteFeatures.map((e, id) => {
        return <SiteFeature features={e} id={id} key={id} />;
      })}
    </>
  );
};

export default WelcomePage;
