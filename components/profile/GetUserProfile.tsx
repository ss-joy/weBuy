import { makeGetRequest } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import ErrorMsg from "../ui/ErrorMsg";
import Loading from "../ui/Loading";
import { FingerprintIcon, MailIcon, UserCircleIcon } from "lucide-react";
type GetUserProfileProps = {
  userId: string | null;
};
function GetUserProfile({ userId }: GetUserProfileProps) {
  const { error, isLoading, data } = useQuery({
    queryKey: ["get-single-user-profile", userId],
    queryFn: () => makeGetRequest(`/api/user/profile/${userId}`),
    enabled: userId ? true : false,
  });

  if (error) {
    console.log(error);
    return <ErrorMsg />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-24 mx-auto border-2 p-4">
      <Image
        className="rounded-full w-40 lg:w-56 transition-all hover:shadow-md hover:shadow-slate-500 block mx-auto"
        src={
          data?.data.user.profilePicture
            ? data?.data.user.profilePicture
            : "/ui-images/dummy-user.jpg"
        }
        width={300}
        height={300}
        alt="profile image of user"
      />

      <div id="info-container" className="w-5/6 mx-auto p-2 lg:w-2/5">
        <p className="text-slate-500 mb-8">
          You can change your name, email ,profile image anytime..
        </p>
        <p className="text-gray-600 font-bold mb-4 break-words flex items-center justify-start flex-wrap">
          <UserCircleIcon className="mr-3" />
          {isLoading ? "Loading..." : data?.data.user.name}
        </p>
        <p className="text-gray-600 font-bold mb-4 break-words flex items-center justify-start flex-wrap">
          <MailIcon className="mr-3" />
          {isLoading ? "loading..." : data?.data.user.email}
        </p>
        <p className="text-gray-600 font-bold mb-4 break-words flex items-center justify-start flex-wrap">
          <span className="mr-2 break-words">Id:</span>
          <FingerprintIcon className="mr-3" />
          {isLoading ? "Loading..." : data?.data.user._id}
        </p>
      </div>
    </div>
  );
}

export default GetUserProfile;
