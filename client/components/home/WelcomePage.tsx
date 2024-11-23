import React from "react";
import Link from "next/link";
import { SiteFeature } from "./SiteFeature";
import {
  BookCheckIcon,
  CreditCard,
  LockIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { bankBaseUrl } from "@/config";

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
    alt: "walking man image",
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
    alt: "payment image",
  },
];
const WelcomePage = (): JSX.Element => {
  return (
    <>
      <h1 className="text-7xl lg:text-8xl mx-auto mt-20 text-center sm:mt-16 sm:text-9xl 2xl:mt-">
        <span className="text-purple-600">we</span>
        <span className="font-bold text-fuchsia-400">Buy</span>
      </h1>
      <button className="mx-auto block p-4 bg-orange-200 text-orange-800 font-extrabold my-28 mb-10 shadow-xl text-lg shadow-orange-400 rounded-xl transition-all hover:font-bold hover:shadow-2xl hover:shadow-orange-400 sm:text-3xl 2xl:mt-30">
        <Link href={"/products"} className="flex items-center">
          Shop here <ShoppingCartIcon className="ml-4 animate-bounce" />
        </Link>
      </button>

      <section
        id="bank-advertise"
        className="p-3 mt-8 flex mx-auto flex-col items-center xs:p-6 md:p-16 md:pb-0 lg:flex-row xl:w-[1200px] "
      >
        <div className="bg-slate-100 rounded-md shadow-md mx-5 p-4 px-6 w-[370px] mb-4 sm:w-[500px] lg:h-[162px] hover:scale-105 transition-all">
          <LockIcon size={30} className="animate-pulse" />
          <p className="mt-4 text-xl">
            Your transactions are secure. So you can rest assuerd.
          </p>
        </div>
        <div className="bg-slate-100 rounded-md shadow-md mx-2 p-4 px-6 mb-4 w-[374px] sm:w-[500px] lg:h-[162px] hover:scale-105 transition-all">
          <CreditCard size={30} className="animate-pulse" />
          <p className="mt-4 text-xl">
            Easily pay with{" "}
            <Link
              href={bankBaseUrl}
              target="_blank"
              className="font-bold rounded-md text-green-600"
            >
              we bank
            </Link>
            . Get everything you want with click of a button.
          </p>
        </div>
        <div className="bg-slate-100 rounded-md shadow-md mx-2 p-4 px-6 mb-4 w-[374px] sm:w-[500px] lg:h-[162px] hover:scale-105 transition-all">
          <BookCheckIcon size={30} className="animate-pulse" />
          <p className="mt-4 text-xl">
            Trusted by millions of users. So you are in the right hands
          </p>
        </div>
      </section>
      {siteFeatures.map((e, id) => {
        return <SiteFeature features={e} id={id} key={id} />;
      })}
    </>
  );
};

export default WelcomePage;
