import Image from "next/image";
import React from "react";

function GetUserProfile() {
  return (
    <div className="mt-24 mx-auto border-2 border-red-700">
      <Image
        className="rounded-full w-40 lg:w-56 transition-all hover:shadow-md hover:shadow-slate-500 block mx-auto"
        src={"/ui-images/dummy-user.jpg"}
        width={300}
        height={300}
        alt="profile image of user"
      />
      <div
        id="info-container"
        className="w-5/6 mx-auto border-2 border-red-700 p-2 lg:w-2/5"
      >
        <p className="text-slate-500 mb-8">
          You can change your name, email ,profile image anytime..
        </p>
        <p className="text-gray-700 font-bold mb-4">
          <span className="mr-2 ">name:</span>asdsad asd
        </p>
        <p className="text-gray-700 font-bold">
          <span className="mr-2 text-gray-700">email:</span>asdsad asd
        </p>
      </div>
    </div>
  );
}

export default GetUserProfile;
