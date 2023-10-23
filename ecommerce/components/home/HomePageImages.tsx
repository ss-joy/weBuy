import React from "react";
const HomePageImages = (): JSX.Element => {
  return (
    <section className="flex flex-col">
      <img
        src={"/ui-images/walking.gif"}
        className="block px-1 w-4/5 2xl:w-[80%] mx-auto h-auto"
        alt="walking gif"
      />
      <img src={"/ui-images/walking-girl.gif"} className="block" alt="" />
    </section>
  );
};

export default HomePageImages;
