import React from "react";
import MainNavBar from "./MainNavBar";
const MainHeader = () => {
  return (
    <header className="flex justify-between p-8 px-20 ">
      {/* <img
        className="w-12 h-12 rounded-lg"
        src="https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=85,format=auto/uploads/2022/04/E-commerce-App-JPG-File-scaled.jpg"
        alt="main header logo"
      /> */}
      <span className="text-2xl font-semibold">weBuy</span>
      <MainNavBar />
    </header>
  );
};

export default MainHeader;
