import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QandA = (): JSX.Element => {
  return (
    <>
      <section>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-4 m-4 rounded-lg text-white text-lg font-bold bg-fuchsia-400 w-96 shadow-md shadow-slate-400">
              Quality Assurance
            </AccordionTrigger>
            <AccordionContent className="px-8 bg-slate-100 shadow-md shadow-slate-400 py-2 mx-5 rounded-md text-lg">
              At WeBuy, our Quality Assurance section is the bedrock of our
              commitment to providing the best online shopping experience for
              our customers. With unwavering dedication, our team of skilled
              professionals rigorously tests and evaluates every product and
              service we offer, ensuring that they meet our stringent quality
              standards. From the moment a product is sourced to the final
              delivery, our QA experts meticulously assess each aspect to
              guarantee excellence. Their meticulous work helps us maintain the
              trust and satisfaction of our valued customers, making WeBuy the
              go-to destination for quality, reliability, and exceptional
              customer service.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="p-4 m-4 rounded-lg text-white text-lg font-bold bg-yellow-600 w-80 shadow-md shadow-slate-400">
              Wide Selection
            </AccordionTrigger>
            <AccordionContent className="px-8 bg-slate-100 shadow-md shadow-slate-400 py-2 mx-5 rounded-md text-lg">
              At WeBuy, we pride ourselves on offering a wide selection of
              products and services to cater to our diverse customer base. Our
              commitment to variety means that customers can explore a vast
              array of options, from electronics to fashion, home decor, and
              more. We believe in providing choices that suit every taste and
              preference, ensuring that everyone can find exactly what they're
              looking for. Our dedication to offering a wide selection reaffirms
              our mission to be the one-stop destination for all your online
              shopping needs, making your experience with WeBuy truly
              comprehensive and convenient.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="p-4 m-4 rounded-lg text-white text-lg font-bold bg-orange-400 w-80 shadow-md shadow-slate-400">
              Unbeatable Prices
            </AccordionTrigger>
            <AccordionContent className="px-8 bg-slate-100 shadow-md shadow-slate-400 py-2 mx-5 rounded-md text-lg">
              At WeBuy, we are dedicated to providing unbeatable prices to our
              customers. Our commitment to affordability means that you can shop
              with confidence, knowing that you're getting the best value for
              your money. Whether it's through exclusive deals, competitive
              pricing, or special promotions, we strive to ensure that our
              customers enjoy cost-effective solutions without compromising on
              quality. We believe in making high-quality products and services
              accessible to everyone, and our unbeatable prices reflect this
              dedication to affordability, helping you make the most of your
              shopping experience at WeBuy.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="p-4 m-4 rounded-lg text-white text-lg font-bold bg-amber-300 shadow-md shadow-slate-400">
              Convenient Shopping
            </AccordionTrigger>
            <AccordionContent className="px-8 bg-slate-100 shadow-md shadow-slate-400 py-2 mx-5 rounded-md text-lg">
              We understand the importance of convenient shopping at WeBuy. Our
              user-friendly website and streamlined mobile app are designed to
              make your online shopping experience as effortless as possible.
              With easy navigation, secure payment options, and efficient search
              functions, we prioritize convenience at every step of your
              journey. You can shop from the comfort of your home, office, or on
              the go, ensuring that your experience with WeBuy is always
              convenient and hassle-free. We value your time and aim to provide
              a seamless shopping experience, so you can focus on finding the
              perfect products while we handle the rest.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
};

export default QandA;
